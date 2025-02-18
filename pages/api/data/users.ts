import type { NextApiRequest, NextApiResponse } from "next";
import UserData from "@/Backend_Data/Users.json";
import redis from "@/lib/redis";

// Define User Type
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// Define Response Type
interface ApiResponse {
  data: User[];
  totalLength: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

// Cache expiration time (in seconds)
const CACHE_EXPIRATION = 300; // 5 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse | { error: string }>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { page = "1", limit = "10", sort = "id", order = "asc", ...filters } = req.query;

    // Convert pagination parameters
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ error: "Page and limit must be positive integers" });
    }

    // Create a unique cache key based on the query parameters
    const cacheKey = `users:page=${pageNum}&limit=${limitNum}&sort=${sort}&order=${order}&filters=${JSON.stringify(filters)}`;

    // Check Redis for cached data
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Serving from cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Filter users
    let filteredUsers = UserData.filter((user) =>
      Object.keys(filters).every((key) => {
        if (!(key in user)) return false;
        const filterValue = String(filters[key]);
        const regex = new RegExp(filterValue, "i");
        return regex.test(String(user[key as keyof User]));
      })
    );

    // Sorting
    const validSortFields: (keyof User)[] = ["id", "firstName", "lastName", "email", "role"];
    const sortField = validSortFields.includes(sort as keyof User) ? (sort as keyof User) : "id";

    filteredUsers.sort((a, b) => {
      const fieldA = String(a[sortField]).toLowerCase();
      const fieldB = String(b[sortField]).toLowerCase();
      return order === "desc" ? fieldB.localeCompare(fieldA) : fieldA.localeCompare(fieldB);
    });

    const totalLength = filteredUsers.length;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = filteredUsers.slice(startIndex, startIndex + limitNum);

    const response: ApiResponse = {
      data: paginatedData,
      totalLength,
      currentPage: pageNum,
      totalPages: Math.ceil(totalLength / limitNum),
      perPage: limitNum,
    };

    // Store response in Redis cache
    await redis.set(cacheKey, JSON.stringify(response), "EX", CACHE_EXPIRATION);

    res.status(200).json(response);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

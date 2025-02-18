// pages/api/data/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import UserData from "@/Backend_Data/Users.json";

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

// API Handler
export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse | { error: string }>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { page = "1", limit = "10", sort = "id", order = "asc", ...filters } = req.query;

    // Convert pagination parameters
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    // Validate pagination values
    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ error: "Page and limit must be positive integers" });
    }

    // Filter users based on query parameters
    let filteredUsers = UserData.filter((user) =>
      Object.keys(filters).every((key) => {
        if (!(key in user)) return false; // Skip unknown fields
        const filterValue = String(filters[key]); // Ensure value is string
        const regex = new RegExp(filterValue, "i"); // Case-insensitive search
        return regex.test(String(user[key as keyof User]));
      })
    );

    // Sorting logic
    const validSortFields: (keyof User)[] = ["id", "firstName", "lastName", "email", "role"];
    const sortField = validSortFields.includes(sort as keyof User) ? (sort as keyof User) : "id";

    filteredUsers.sort((a, b) => {
      const fieldA = String(a[sortField]).toLowerCase();
      const fieldB = String(b[sortField]).toLowerCase();
      return order === "desc" ? fieldB.localeCompare(fieldA) : fieldA.localeCompare(fieldB);
    });

    const totalLength = filteredUsers.length;

    // Pagination logic
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = filteredUsers.slice(startIndex, startIndex + limitNum);

    res.status(200).json({
      data: paginatedData,
      totalLength,
      currentPage: pageNum,
      totalPages: Math.ceil(totalLength / limitNum),
      perPage: limitNum,
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

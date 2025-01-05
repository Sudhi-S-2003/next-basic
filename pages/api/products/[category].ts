// pages/api/products/[category].ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getProductsByCategory } from "@/Backend-controller/ProductController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  if (req.method === "GET") {
    if (!category || typeof category !== "string") {
      return res.status(400).json({ message: "Category is required and must be a string" });
    }

    const filteredProducts = getProductsByCategory(category);

    if (filteredProducts.length > 0) {
      res.status(200).json(filteredProducts);
    } else {
      res.status(404).json({ message: "No products found in this category" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

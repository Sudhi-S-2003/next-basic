// pages/api/product/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "@/Backend-controller/ProductController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const productId = parseInt(id as string, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = getProductById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

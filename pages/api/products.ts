// pages/api/products.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getAllProducts } from "@/Backend-controller/ProductController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const products = getAllProducts();
    res.status(200).json(products);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

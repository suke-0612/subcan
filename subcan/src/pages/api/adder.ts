import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { a, b } = req.body;

    if (typeof a === "number" && typeof b === "number") {
      const sum = a + b;
      res.status(200).json({ sum });
    } else {
      res
        .status(400)
        .json({ error: "Invalid input. Please provide two numbers." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed. Use POST." });
  }
}

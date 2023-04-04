import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {

  const { method } = req

  if (method === "GET") {
     res.status(200).json("getting Tasks")
  } else if (method === "POST") {
    res.status(200).json("creating Tasks");
  } else {
    res.json("invalid Tasks");
  }
}


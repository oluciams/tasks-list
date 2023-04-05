import type { NextApiRequest, NextApiResponse } from "next";


// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {

  const { method, body } = req

  switch (method) {
    case "GET":
      return res.status(200).json("getting Tasks")
    case "POST":
      const { title, description } = body;
      return res.status(200).json("creating Tasks")
    default:
      return res.status(400).json("invalid Tasks")
  }
}


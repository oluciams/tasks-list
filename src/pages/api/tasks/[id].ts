import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  
  const { method } = req
  switch (method) {
    case "GET":
      return res.json("getting a Task");
    case "PUT":
      return res.json("updating a Task");
    case "DELETE":
      return res.json("deleting a Task");
    default:
      return res.status(400).json("method not allowed");
  }
};

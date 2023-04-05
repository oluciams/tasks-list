import { conn } from "../../utils/database"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  message: string;
  time: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const response = await conn.query("SELECT NOW()")
  return res.json({ message: "pong", time: response.rows[0].now})
}

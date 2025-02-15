// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  console.log(dbConnect);
  res.status(200).json({ message: "database connected" });
}

import getUsers from "@/lib/getUsers";
import logger from "@/services/logger";
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const users = await getUsers()

    return NextResponse.json(users)
  } catch (error) {
    logger.error('Error in GET /api/users:', error)
    return NextResponse.error(error)
  }
}
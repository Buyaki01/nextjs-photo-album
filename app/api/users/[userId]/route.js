import getUser from "@/lib/getUser"
import getUserAlbums from "@/lib/getUserAlbums"
import logger from "@/services/logger"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
  try {
    const { userId } = params
    
    const user = await getUser(userId)

    if (!user) {
      logger.warn(`User not found for userId: ${userId}`)
      return NextResponse.error('User not found', { status: 404 })
    }

    const albums = await getUserAlbums(userId)

    if (!albums || albums.length === 0) {
      logger.warn(`No albums found for userId: ${userId}`)
      return NextResponse.error('No albums found', { status: 404 })
    }

    return NextResponse.json({user, albums})
  } catch (error) {
    logger.error('Error in GET /api/users/userId:', error)
    return NextResponse.error(error)
  }
}
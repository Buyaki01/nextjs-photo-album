import getAlbums from "@/lib/getAlbums"
import logger from "@/services/logger"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const albums = await getAlbums()

    return NextResponse.json(albums)
  } catch (error) {
    logger.error('Error in GET /api/albums:', error)
    return NextResponse.error(error)
  }
}
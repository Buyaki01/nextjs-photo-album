import getAlbum from "@/lib/getAlbum"
import getAlbumPhotos from "@/lib/getAlbumPhotos"
import logger from "@/services/logger"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
  try {
    const { albumId } = params
    
    const album = await getAlbum(albumId)

    if (!album) {
      logger.warn(`Album not found for albumId: ${albumId}`)
      return NextResponse.error('Album not found', { status: 404 })
    }

    const photos = await getAlbumPhotos(albumId)

    if (!photos || photos.length === 0) {
      logger.warn(`No photos found for albumId: ${albumId}`)
      return NextResponse.error('No photos found for the album', { status: 404 })
    }

    return NextResponse.json({album, photos})
  } catch (error) {
    logger.error('Error in GET /api/albums/albumId:', error)
    return NextResponse.error(error)
  }
}
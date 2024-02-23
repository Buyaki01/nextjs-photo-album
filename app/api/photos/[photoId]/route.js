import getPhoto from "@/lib/getPhoto"
import updatePhotoTitle from "@/lib/updatePhotoTitle"
import logger from "@/services/logger"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
  try {
    const { photoId } = params
    
    const photo = await getPhoto(photoId)

    if (!photo) {
      logger.warn(`Photo not found for photoId: ${photoId}`)
      return NextResponse.error('Photo not found', { status: 404 })
    }

    return NextResponse.json(photo)
  } catch (error) {
    logger.error('Error in GET /api/photos/photoId:', error)
    return NextResponse.error(error)
  }
}

export const PATCH = async (req, { params }) => {
  const { editedTitle } = await req.json()
  const { photoId } = params

  try {
    await updatePhotoTitle(photoId, editedTitle)

    return NextResponse.json({ message: "Photo title updated successfully", status: 200 })
  } catch (error) {
    logger.error('Error in PATCH /api/photos/photoId:', error)
    return NextResponse.error(error)
  }
}

const getAlbumPhotos = async (albumId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    const photosData = await response.json()
    return photosData
  } catch (error) {
    console.error('Error fetching album photos:', error)
    throw error
  }
}

export default getAlbumPhotos
const getAlbumPhotos = async (albumId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch album photos. Status: ${response.status}`)
    }

    const photosData = await response.json()

    return photosData
     
  } catch (error) {
    console.error('Error fetching album photos:', error)
    throw error
  }
}

export default getAlbumPhotos
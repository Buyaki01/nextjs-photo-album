const getAlbum = async (albumId) => { 
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch album. Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching album:', error)
    throw error
  }
}

export default getAlbum
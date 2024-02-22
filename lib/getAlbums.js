const getAlbums = async () => { 
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums')

    if (!response.ok) {
      throw new Error(`Failed to fetch albums. Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching albums:', error)
    throw error
  }
}

export default getAlbums
 
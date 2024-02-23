const getUserAlbums = async (userId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch user albums. Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching user albums:', error)
    throw error
  }
}

export default getUserAlbums
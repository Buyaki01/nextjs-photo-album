const getPhoto = async (photoId) => { 
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch photo. Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching photo:', error)
    throw error
  }
}

export default getPhoto
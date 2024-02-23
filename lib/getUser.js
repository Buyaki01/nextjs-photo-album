const getUser = async (userId) => { 
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch user. Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

export default getUser
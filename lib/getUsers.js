const getUsers = async () => { 
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export default getUsers
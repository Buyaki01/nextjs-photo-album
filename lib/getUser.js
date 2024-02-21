const getUser = async (userId) => { 
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)

  return response.json()
}

export default getUser
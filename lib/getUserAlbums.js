const getUserAlbums = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
  return response.json()
}

export default getUserAlbums
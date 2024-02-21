const getAlbums = async () => { 
  const response = await fetch('https://jsonplaceholder.typicode.com/albums')

  return response.json()
}

export default getAlbums
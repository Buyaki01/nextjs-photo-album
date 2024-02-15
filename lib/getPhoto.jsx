const getPhoto = async (photoId) => { 
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)

  return response.json()
}

export default getPhoto
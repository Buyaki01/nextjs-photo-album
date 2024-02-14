const updatePhotoTitle = async (photoId, newTitle) => { 
  const url = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
  
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update photo title')
    }

    return response.json()
  } catch (error) {
    console.error('Error updating photo title:', error)
    throw error
  }
}

export default updatePhotoTitle
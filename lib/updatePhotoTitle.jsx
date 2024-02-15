const updatePhotoTitle = async (photoId, editedTitle) => { 
  const url = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editedTitle,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to update photo title')
    }

    return true
  } catch (error) {
    console.error('Error updating photo title:', error)
    const errorMessage = await error.response.text()
    console.error('Server response:', errorMessage)
    throw error
  }
}

export default updatePhotoTitle
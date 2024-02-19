const SignoutModal = ({ isOpen, title, description, confirmText, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"> 
      <div className="bg-white p-6 rounded-md w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-red-500">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignoutModal
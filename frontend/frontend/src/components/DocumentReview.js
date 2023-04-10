import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DocumentReview () {
  const [documentContent, setDocumentContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDocumentContent = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get('<your-api-fetch-endpoint>')
        setDocumentContent(response.data.content)
      } catch (error) {
        setError('An error occurred while fetching the document content.')
      }

      setLoading(false)
    }

    fetchDocumentContent()
  }, [])

  const handleSaveChanges = async () => {
    setLoading(true)
    setError(null)

    try {
      await axios.post('<your-api-save-endpoint>', {
        content: documentContent
      })
    } catch (error) {
      setError('An error occurred while saving the document content.')
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>Document Review</h1>
      {loading
        ? (
          <p>Loading...</p>
          )
        : error
          ? (
            <p>{error}</p>
            )
          : (
            <>
              <textarea
                value={documentContent}
                onChange={(e) => setDocumentContent(e.target.value)}
                rows={20}
                cols={80}
              />
              <button onClick={handleSaveChanges}>Save Changes</button>
            </>
            )}
    </div>
  )
}

export default DocumentReview

import React, { useState } from 'react'
import axios from 'axios'

function Download () {
  const [documentUrl, setDocumentUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDownload = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get('<your-api-endpoint>')
      setDocumentUrl(response.data.url)
    } catch (error) {
      setError('An error occurred while fetching the document.')
    }

    setLoading(false)
  }

  const renderDownloadButton = () => {
    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p>{error}</p>
    }

    if (documentUrl) {
      return (
        <a href={documentUrl} download>
          <button>Download</button>
        </a>
      )
    }

    return <button onClick={handleDownload}>Get Document</button>
  }

  return (
    <div>
      <h1>Download Documents</h1>
      {renderDownloadButton()}
    </div>
  )
}

export default Download

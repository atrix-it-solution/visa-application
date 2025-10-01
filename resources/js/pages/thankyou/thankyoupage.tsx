import React from 'react'
import { router } from '@inertiajs/react'

const ThankYouPage = () => {
  const goHome = () => {
    router.visit('/') // redirect to your homepage route
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your application has been submitted successfully. 
          We’ll review it and get back to you shortly.
        </p>

        <button
          onClick={goHome}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default ThankYouPage

import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

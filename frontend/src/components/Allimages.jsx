import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllImages = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/image", {
          withCredentials: true,
        });

        console.log(response.data, "Full API response");
        console.log(response.data.images, "Extracted images");

        if (Array.isArray(response.data.images)) {
          setImages(response.data.images);
        } else {
          console.error("Invalid API response format:", response.data);
          setError("Unexpected API response format.");
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err.response?.data?.message || "Failed to fetch images.");
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="text-gray-200 px-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.base64}
              alt={`Generated ${index}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          ))}
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default AllImages;

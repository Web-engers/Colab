import React, { useState } from 'react';

const CloudinaryUploadWidget = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'canvas');
    formData.append('folder','CanvasImage')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgy49rzwv/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url); 
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default CloudinaryUploadWidget;

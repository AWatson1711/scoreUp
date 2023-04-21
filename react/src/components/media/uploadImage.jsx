import React, { useState } from "react";
import { getItem } from "../../utils/storage.utils";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const token = getItem("token");

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await fetch("http://localhost:3003/medias/upload", {
      method: "POST",
      body: formData,
      headers: { Authorization: token },
    });

    if (response.ok) {
      const image = await response.json();
      console.log("Image uploaded:", image);
      // faire quelque chose avec l'image téléchargée
    } else {
      console.error("Error uploading image:", response.statusText);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;

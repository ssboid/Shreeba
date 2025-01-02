import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { getImages, postImage } from "../services/testApi";
import { uploadImageToCloudinary } from "../config/uploadImageToCloudinary";
const Help = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Fetch existing images on mount
    const fetchImages = async () => {
      const fetchedImages = await getImages();
      setImages(fetchedImages);
    };
    fetchImages();
  }, []);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploading(true);
      const uploadedUrl = await uploadImageToCloudinary(file);
      setUploading(false);

      if (uploadedUrl) {
        const newImage = await postImage(uploadedUrl);
        if (newImage) {
          setImages((prev) => [...prev, newImage]);
        }
      } else {
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h2>Image Uploader</h2>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {uploading ? <p>Uploading...</p> : <p>Drag & drop an image or click to upload</p>}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Uploaded Images</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt="Uploaded"
              style={{ width: "150px", height: "100px", objectFit: "cover" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;

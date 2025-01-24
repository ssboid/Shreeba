import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { getImages, postImage } from "../services/testApi";
import { uploadImageToCloudinary } from "../config/uploadImageToCloudinary";

const Uploader = ({ onImageUpload }) => {
  const [latestImage, setLatestImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Fetch the latest image on mount
    const fetchLatestImage = async () => {
      const fetchedImages = await getImages();
      if (fetchedImages.length > 0) {
        const lastImage = fetchedImages[fetchedImages.length - 1];
        setLatestImage(lastImage);
        // Pass the image URL to parent component
        onImageUpload(lastImage.url);
      }
    };
    fetchLatestImage();
  }, [onImageUpload]);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploading(true);
      try {
        const uploadedUrl = await uploadImageToCloudinary(file);
        if (uploadedUrl) {
          const newImage = await postImage(uploadedUrl);
          if (newImage) {
            setLatestImage(newImage);
            // Pass the new image URL to parent component
            onImageUpload(newImage.url);
          }
        } else {
          alert("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Upload your Image*</h2>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-500 transition-colors"
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-gray-600">Uploading...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600">Drag & drop an image or click to upload</p>
            <p className="text-sm text-gray-400">Maximum file size: 5MB</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-md font-medium text-gray-700 mb-2">Preview Image</h3>
        {latestImage ? (
          <div className="relative">
            <img
              src={latestImage.url}
              alt="Latest Uploaded"
              className="w-full h-48 object-cover rounded-lg shadow-sm"
            />
            <p className="mt-2 text-sm text-gray-500 truncate">
              {latestImage.url}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Uploader;
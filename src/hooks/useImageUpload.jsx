import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (imageFile) => {
    const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
    
    if (!imgbbKey) {
      toast.error('Image upload configuration missing!');
      return null;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );
      setUploading(false);
      return response.data.data.display_url;
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
      setUploading(false);
      return null;
    }
  };

  return { uploadImage, uploading };
};

export default useImageUpload;
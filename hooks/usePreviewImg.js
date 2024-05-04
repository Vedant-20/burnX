import { useState } from "react";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);

  const handleImageChange = async (imgFile) => {
    const file = await imgFile;
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      await reader.readAsDataURL(file);
    } else {
      setImgUrl(null);
    }
  };
  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;

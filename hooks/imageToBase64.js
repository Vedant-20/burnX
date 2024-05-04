import { readAsStringAsync, EncodingType } from "expo-file-system";

const imageToBase64 = async (imageUri) => {
  try {
    const base64 = await readAsStringAsync(imageUri, {
      encoding: EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
};

export { imageToBase64 };

const encodedLogo = async (logo) => {
  const encodeImgToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const encodedImg = await encodeImgToBase64(logo);
  return encodedImg.split(",").pop();
};

export default encodedLogo;

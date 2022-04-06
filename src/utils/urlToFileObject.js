const convertUrlToFileObject = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const file = new File([blob], "logo.png", { type: blob.type });
  return file;
};

export default convertUrlToFileObject;

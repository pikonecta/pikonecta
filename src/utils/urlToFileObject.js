const convertUrlToFileObject = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const file = new File([blob], "logo.png", { type: "image/png" });
  return file;
};

export default convertUrlToFileObject;

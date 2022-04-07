import ErrorMessage from "../ErrorMessage";

function UploadImgToForm({
  content,
  name,
  message,
  setters,
  register,
  errors,
}) {
  const handleSubmitImg = (e) => {
    setters.setLogo(e.target.files[0]);
    setters.setLogoSrc(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="space-y-1 text-center h-full flex flex-col  cursor-default">
      <svg
        className="mx-auto min-h-12 h-2/4 w-24 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex text-sm text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          {content}
          <input
            {...register(name, {
              required: true,
              validate: {
                lessThan10MB: (files) =>
                  files[0]?.size < 10000000 || "Max 10MB",
                acceptedFormats: (files) =>
                  ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                  "solo son permitidos los siguientes formatos: PNG y JPEG",
              },
            })}
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept="image/png, image/jpeg"
            onChange={handleSubmitImg}
          />
        </label>
        <p className="pl-1">o arrastra y suelta</p>
      </div>
      <p className="text-xs text-gray-500">PNG, JPG</p>
      {errors[name]?.type === "required" && (
        <ErrorMessage message={`${message} es necesario `} />
      )}
    </div>
  );
}

export default UploadImgToForm;

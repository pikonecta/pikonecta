function Toast({ type = "success", message, canSee = true }) {
  const TYPES = {
    error: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {canSee && (
        <div className="flex space-x-2 justify-center absolute top-10 right-10">
          <div
            className={`shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block ${TYPES[type]}`}
            id="static-example"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-mdb-autohide="false"
          >
            <div className="p-5 rounded-b-lg break-words text-gray-700">
              {message}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Toast;

import { useState } from "react";

function Carousel({ images }) {
  const imgLength = images?.length || 0;

  const [currentImg, setCurrentImg] = useState(0);

  const handleImageChange = (goBack) => {
    if (goBack) {
      if (currentImg === 0) {
        setCurrentImg(imgLength - 1);
      } else {
        setCurrentImg(currentImg - 1);
      }
    }
    if (!goBack) {
      if (currentImg === imgLength - 1) {
        setCurrentImg(0);
      } else {
        setCurrentImg(currentImg + 1);
      }
    }
  };
  return (
    <div className="items-start">
      <div className="relative w-full select-none">
        <img src={images[currentImg]} alt="" />
        {imgLength > 1 && (
          <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
            <button
              type="button"
              className="text-5xl text-gray-300 rounded-full hover:bg-slate-100"
              onClick={() => handleImageChange(true)}
            >
              {"<"}
            </button>
            <button
              type="button"
              className="text-5xl text-gray-300 rounded-full hover:bg-slate-100"
              onClick={() => handleImageChange(false)}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carousel;

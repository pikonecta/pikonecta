import { useState } from "react";
import cn from "classnames";

const FIRST_PAGE = 1;

function Pagination({ size, itemsPerPage = 2 }) {
  const pages = Math.ceil(10 / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(5);
  function goToPage(page) {
    return setCurrentPage(page);
  }

  return (
    <div className="flex flex-row text-xl justify-between p-5 text-gray-500">
      <span className="">{size} Empresas </span>
      <div>
        <button
          type="button"
          className="px-2 py-2"
          onClick={() => {
            goToPage(FIRST_PAGE);
          }}
        >
          {`<<`}
        </button>

        <button
          type="button"
          className={cn("px-2 py-2 text-gray-500", {
            "text-indigo-500": currentPage === FIRST_PAGE,
          })}
          onClick={() => {
            goToPage(currentPage - 1);
          }}
          disabled={currentPage === FIRST_PAGE}
        >
          {`<`}
        </button>

        {currentPage - 2 > 0 && (
          <button
            type="button"
            className="px-2 py-2 border"
            onClick={() => {
              goToPage(currentPage - 2);
            }}
          >
            {currentPage - 2}
          </button>
        )}

        {currentPage - 1 > 0 && (
          <button
            type="button"
            className="px-2 py-2 border"
            onClick={() => {
              goToPage(currentPage - 1);
            }}
          >
            {currentPage - 1}
          </button>
        )}
        <button type="button" className="px-2 py-2 border border-indigo-500 ">
          {currentPage}
        </button>
        {currentPage + 1 <= pages && (
          <button
            type="button"
            className="px-2 py-2 border "
            onClick={() => {
              goToPage(currentPage + 1);
            }}
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage + 2 <= pages && (
          <button
            type="button"
            className="px-2 py-2 border "
            onClick={() => {
              goToPage(currentPage + 2);
            }}
          >
            {currentPage + 2}
          </button>
        )}

        <button
          type="button"
          className={cn("px-2 py-2 text-gray-500", {
            "text-indigo-500": currentPage === pages,
          })}
          onClick={() => {
            goToPage(currentPage + 1);
          }}
          disabled={currentPage === pages}
        >
          {`>`}
        </button>
        <button
          type="button"
          className="px-2 py-2"
          onClick={() => {
            goToPage(pages);
          }}
        >
          {`>>`}
        </button>
      </div>
    </div>
  );
}

export default Pagination;

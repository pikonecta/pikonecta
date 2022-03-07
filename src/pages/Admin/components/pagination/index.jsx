import { useEffect, useState } from "react";
import cn from "classnames";

export const DEFAULT_ITEMS_PER_PAGE = 8;
const FIRST_PAGE = 1;
const DEFAULT_BUTTON_STYLE =
  "flex justify-center items-center h-8 w-8 sm:mx-1 text-gray-500 rounded-full border hover:border-gray-500";
const BUTTON_STYLE = cn(DEFAULT_BUTTON_STYLE, "border-transparent");

function Pagination({
  size,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  onPageChanged,
}) {
  const pages = Math.ceil(size / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    setCurrentPage(page);
    onPageChanged(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="flex flex-row text-sm justify-center md:justify-between p-5 text-gray-500 flex-wrap items-center">
      <span className="p-2">{size} resultados </span>
      <div className="flex flex-row">
        <button
          type="button"
          className={cn("material-icons-outlined text-xs ", BUTTON_STYLE, {
            "text-gray-300": currentPage === FIRST_PAGE,
          })}
          onClick={() => {
            goToPage(FIRST_PAGE);
          }}
          disabled={currentPage === FIRST_PAGE}
        >
          keyboard_double_arrow_left
        </button>

        <button
          type="button"
          className={cn("material-icons-outlined text-xs ", BUTTON_STYLE, {
            "text-gray-300": currentPage === FIRST_PAGE,
          })}
          onClick={() => {
            goToPage(currentPage - 1);
          }}
          disabled={currentPage === FIRST_PAGE}
        >
          keyboard_arrow_left
        </button>

        {currentPage - 2 > 0 && (
          <button
            type="button"
            className={BUTTON_STYLE}
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
            className={BUTTON_STYLE}
            onClick={() => {
              goToPage(currentPage - 1);
            }}
          >
            {currentPage - 1}
          </button>
        )}
        <button
          type="button"
          className={cn("border-gray-300", DEFAULT_BUTTON_STYLE)}
        >
          {currentPage}
        </button>
        {currentPage + 1 <= pages && (
          <button
            type="button"
            className={BUTTON_STYLE}
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
            className={BUTTON_STYLE}
            onClick={() => {
              goToPage(currentPage + 2);
            }}
          >
            {currentPage + 2}
          </button>
        )}

        <button
          type="button"
          className={cn("material-icons-outlined text-xs", BUTTON_STYLE, {
            "text-gray-300": currentPage === pages,
          })}
          onClick={() => {
            goToPage(currentPage + 1);
          }}
          disabled={currentPage === pages}
        >
          keyboard_arrow_right
        </button>
        <button
          type="button"
          className={cn("material-icons-outlined text-xs", BUTTON_STYLE, {
            "text-gray-300": currentPage === pages,
          })}
          onClick={() => {
            goToPage(pages);
          }}
          disabled={currentPage === pages}
        >
          keyboard_double_arrow_right
        </button>
      </div>
    </div>
  );
}

export default Pagination;

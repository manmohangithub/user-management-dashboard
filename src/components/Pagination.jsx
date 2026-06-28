import {
  PAGE_SIZE_OPTIONS,
} from "../utils/constants";

function Pagination({
  pagination,
  onPageChange,
  onPageSizeChange,
}) {
  const {
    currentPage,
    totalPages,
    pageSize,
    totalRecords,
  } = pagination;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <section className="pagination">

      <div className="pagination__left">
        <span>
          {totalRecords} Users
        </span>

        <select
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(
              event.target.value
            )
          }
        >
          {PAGE_SIZE_OPTIONS.map(
            (size) => (
              <option
                key={size}
                value={size}
              >
                {size}
              </option>
            )
          )}
        </select>
      </div>

      <div className="pagination__right">

        <button
          className="secondary-button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
        >
          Previous
        </button>

        <div className="pagination__pages">

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={
                currentPage === page
                  ? "page-button page-button--active"
                  : "page-button"
              }
              onClick={() =>
                onPageChange(page)
              }
            >
              {page}
            </button>
          ))}

        </div>

        <button
          className="secondary-button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1
            )
          }
        >
          Next
        </button>

      </div>

    </section>
  );
}

export default Pagination;
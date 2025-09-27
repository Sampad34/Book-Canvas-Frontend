import { useFilter } from "../../../context";

export const FilterBar = ({ setShow }) => {
  const { state, dispatch } = useFilter();

  return (
    <section>
      <div
        className="fixed z-40 top-0 left-0 h-screen w-72 sm:w-80 md:w-96 p-5 overflow-y-auto bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 scale-100 sm:scale-100 md:scale-100"
        tabIndex="-1"
        aria-labelledby="drawer-label"
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h5
            id="drawer-label"
            className="text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
          >
            Filters
          </h5>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 p-1.5 rounded transition"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close Filters</span>
          </button>
        </div>

        <hr className="border-gray-200 dark:border-gray-600 mb-4" />

        {/* Filters */}
        <div className="space-y-6">
          {/* Sort By */}
          <div>
            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Sort By</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm">
                <input
                  type="radio"
                  name="price-sort"
                  checked={state.sortBy === "lowtohigh" || false}
                  onChange={() =>
                    dispatch({ type: "SORT_BY", payload: { sortBy: "lowtohigh" } })
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
                Price - Low to High
              </label>
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm">
                <input
                  type="radio"
                  name="price-sort"
                  checked={state.sortBy === "hightolow" || false}
                  onChange={() =>
                    dispatch({ type: "SORT_BY", payload: { sortBy: "hightolow" } })
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
                Price - High to Low
              </label>
            </div>
          </div>

          {/* Ratings */}
          <div>
            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Rating</p>
            <div className="flex flex-col gap-2">
              {["4STARABOVE", "3STARABOVE", "2STARABOVE", "1STARABOVE"].map((rate, i) => (
                <label
                  key={rate}
                  className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm"
                >
                  <input
                    type="radio"
                    name="rating-sort"
                    checked={state.ratings === rate || false}
                    onChange={() => dispatch({ type: "RATINGS", payload: { ratings: rate } })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {`${i + 1} Stars & Above`}
                </label>
              ))}
            </div>
          </div>

          {/* Other Filters */}
          <div>
            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Other Filters</p>
            <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm">
              <input
                type="checkbox"
                checked={state.bestSellerOnly || false}
                onChange={() =>
                  dispatch({ type: "BEST_SELLER_ONLY", payload: { bestSellerOnly: !state.bestSellerOnly } })
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              />
              Best Seller Only
            </label>
            <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm">
              <input
                type="checkbox"
                checked={state.onlyInStock || false}
                onChange={() =>
                  dispatch({ type: "ONLY_IN_STOCK", payload: { onlyInStock: !state.onlyInStock } })
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              />
              In Stock Only
            </label>
          </div>

          {/* Clear Filter Button */}
          <div className="pt-4">
            <button
              onClick={() => dispatch({ type: "CLEAR_FILTER" })}
              className="w-full text-gray-900 bg-white border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg py-2.5 font-medium transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useFilter } from "../../../context";

export const FilterBar = ({ setShow }) => {
  const { state, dispatch } = useFilter();

  const handleClearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  return (
    <div className="h-full w-80 sm:w-96 bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto transition-transform transform">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-lg font-semibold uppercase text-gray-500 dark:text-gray-400">
            Filters
          </h5>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Close filters"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <hr className="border-gray-200 dark:border-gray-600 mb-6" />

        {/* Filters */}
        <div className="space-y-8">
          {/* Sort By */}
          <div>
            <p className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Sort By
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm">
                <input
                  type="radio"
                  name="price-sort"
                  checked={state.sortBy === "lowtohigh"}
                  onChange={() =>
                    dispatch({
                      type: "SORT_BY",
                      payload: { sortBy: "lowtohigh" },
                    })
                  }
                  className="w-4 h-4 text-blue-600"
                />
                Price - Low to High
              </label>
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm">
                <input
                  type="radio"
                  name="price-sort"
                  checked={state.sortBy === "hightolow"}
                  onChange={() =>
                    dispatch({
                      type: "SORT_BY",
                      payload: { sortBy: "hightolow" },
                    })
                  }
                  className="w-4 h-4 text-blue-600"
                />
                Price - High to Low
              </label>
            </div>
          </div>

          {/* Ratings */}
          <div>
            <p className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Rating
            </p>
            <div className="space-y-2">
              {["4STARABOVE", "3STARABOVE", "2STARABOVE", "1STARABOVE"].map(
                (rate, i) => (
                  <label
                    key={rate}
                    className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm"
                  >
                    <input
                      type="radio"
                      name="rating-sort"
                      checked={state.ratings === rate}
                      onChange={() =>
                        dispatch({
                          type: "RATINGS",
                          payload: { ratings: rate },
                        })
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    {`${i + 1} Star${i === 0 ? "" : "s"} & Above`}
                  </label>
                ),
              )}
            </div>
          </div>

          {/* Other Filters */}
          <div>
            <p className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Other Filters
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm">
                <input
                  type="checkbox"
                  checked={state.bestSellerOnly}
                  onChange={() =>
                    dispatch({
                      type: "BEST_SELLER_ONLY",
                      payload: { bestSellerOnly: !state.bestSellerOnly },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded"
                />
                Best Seller Only
              </label>
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-200 text-sm">
                <input
                  type="checkbox"
                  checked={state.onlyInStock}
                  onChange={() =>
                    dispatch({
                      type: "ONLY_IN_STOCK",
                      payload: { onlyInStock: !state.onlyInStock },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded"
                />
                In Stock Only
              </label>
            </div>
          </div>

          {/* Clear Filter Button */}
          <div className="pt-4">
            <button
              onClick={handleClearFilter}
              className="w-full text-gray-900 bg-white border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl py-2.5 font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

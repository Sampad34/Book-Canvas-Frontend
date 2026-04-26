export const Ratings = ({ rating }) => {
  const ratingArray = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className="flex items-center space-x-0.5">
      {ratingArray.map((filled, index) => (
        <i
          key={index}
          className={`${
            filled ? "bi bi-star-fill text-yellow-400" : "bi bi-star text-yellow-400"
          } sm:text-base text-sm transition-colors`}
        ></i>
      ))}
      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({rating}/5)</span>
    </div>
  );
};
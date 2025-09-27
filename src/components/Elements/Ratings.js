export const Ratings = ({ rating }) => {
  const ratingArray = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className="flex items-center space-x-0.5">
      {ratingArray.map((filled, index) =>
        filled ? (
          <i
            key={index}
            className="bi bi-star-fill text-yellow-400 sm:text-base text-sm"
          ></i>
        ) : (
          <i
            key={index}
            className="bi bi-star text-yellow-400 sm:text-base text-sm"
          ></i>
        )
      )}
    </div>
  );
};

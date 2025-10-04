
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="text-yellow-500">&#9733;</span>); // Filled star
    } else {
      stars.push(<span key={i} className="text-gray-300">&#9733;</span>); // Empty star
    }
  }
  return <div>{stars}</div>;
};

export default StarRating;
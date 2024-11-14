import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);




      try {
        const response = await axios.get(
          "https://abdinreviewproviderapi-huhph4hbbafbgraz.northeurope-01.azurewebsites.net/api/Review/allreviews"
        );

        const productReviews = response.data
          .filter((review) => review.productID === productId && review.status === "Approved")
          .map((review) => ({
            reviewID: review.reviewID,
            rating: review.rating,
            comment: review.reviewDescription,
            author: `User ${review.userID}`,
            date: new Date().toLocaleDateString(),
          }));

        setReviews(productReviews);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!reviews.length) return <p>Be the first one to leave a review for this product!</p>;

  return (
    <div className="review-list space-y-4">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.reviewID} className="p-4 border rounded-md shadow-sm">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-gray-600">by {review.author}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

ReviewList.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ReviewList;

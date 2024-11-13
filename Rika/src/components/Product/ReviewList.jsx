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
            id: review.reviewId,
            rating: review.rating,
            comment: review.reviewDescription,
            author: review.user?.name || `User ${review.userID}`, 
            date: new Date(review.dateReviewed).toLocaleDateString(),
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
  if (error) return <p className="font-mont text-red-500">{error}</p>;
  if (!reviews.length) return <p className="font-mont">Be the first one to leave a review for this product!</p>;

  return (
    <div className="review-list space-y-4">
      <h2 className="text-xl font-mont font-semibold mb-4">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="review-card p-4 border rounded-md shadow-sm">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 font-mont text-gray-600">by {review.author}</span>
            <span className="ml-4 font-mont text-gray-400 text-sm">{review.date}</span>
          </div>
          <p className="font-mont text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

ReviewList.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ReviewList;

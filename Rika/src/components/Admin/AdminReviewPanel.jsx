// src/components/Admin/AdminReviewPanel.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem';
import ConfirmDialog from '../../common/ConfirmDialog';

const AdminReviewPanel = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchPendingReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://abdinreviewproviderapi-huhph4hbbafbgraz.northeurope-01.azurewebsites.net/api/Review/allreviews');
        const pendingReviews = response.data.filter((review) => review.status === "Pending");
        setReviews(pendingReviews);
      } catch (error) {
        console.log("Failed to load reviews.", error)
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchPendingReviews();
  }, []);

  const handleApprove = async (reviewID) => {
    try {
      await axios.post(`https://abdinreviewproviderapi-huhph4hbbafbgraz.northeurope-01.azurewebsites.net/api/Review/approved${reviewID}`);
      setReviews(reviews.filter((review) => review.reviewID !== reviewID));
    } catch (error) {
      console.error("Failed to approve review:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://abdinreviewproviderapi-huhph4hbbafbgraz.northeurope-01.azurewebsites.net/api/Review/allreviews${selectedReviewId}`);
      setReviews(reviews.filter((review) => review.reviewID !== selectedReviewId));
      setShowConfirm(false);
      setSelectedReviewId(null);
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const confirmDelete = (reviewID) => {
    setSelectedReviewId(reviewID);
    setShowConfirm(true);
  };

  if (loading) return <p>Loading pending reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (reviews.length === 0) return <p>No pending reviews to display.</p>;

  return (
    <div className="admin-review-panel space-y-4">
      <h2 className="text-xl font-semibold mb-4">Pending Reviews for Approval</h2>
      {reviews.map((review) => (
        <ReviewItem
          key={review.reviewID}
          review={review}
          onApprove={() => handleApprove(review.reviewID)}
          onDelete={() => confirmDelete(review.reviewID)}
        />
      ))}
      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this review?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default AdminReviewPanel;

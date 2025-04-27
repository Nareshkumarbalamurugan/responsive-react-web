
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { toast } from 'sonner';

const ProductReview = ({ productId, existingReviews = [], onReviewSubmit }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(existingReviews);
  
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("Please login to leave a review");
      return;
    }
    
    const newReview = {
      id: Date.now(),
      user: currentUser.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    
    if (onReviewSubmit) {
      onReviewSubmit(newReview);
    }
    
    setRating(5);
    setComment('');
    
    toast.success("Review submitted successfully!");
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Customer Reviews</h3>
          <span className="text-sm text-gray-500">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </span>
        </div>
        
        {/* Review Form */}
        {currentUser ? (
          <form onSubmit={handleSubmitReview} className="border-b pb-6 mb-6">
            <h4 className="text-md font-medium mb-4">Write a Review</h4>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium mb-2">Your Review</label>
              <textarea
                id="comment"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-brandGreen focus:border-brandGreen"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-brandGreen text-white px-4 py-2 rounded-md text-sm hover:opacity-90"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className="text-center border-b pb-6 mb-6">
            <p className="text-gray-600 mb-2">Please log in to leave a review</p>
            <a href="/login" className="text-brandBlue hover:underline">Login here</a>
          </div>
        )}
        
        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">{review.user}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? 'fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductReview;

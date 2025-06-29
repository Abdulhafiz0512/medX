import React, { useState } from 'react';
import { Star } from 'react-feather';

const ReviewList = ({ reviews, onReviewSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    title: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newReview.comment.trim()) {
      setError('Fikr yozing');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // In a real app, this would call an API
      const result = await onReviewSubmit(newReview);
      
      if (result && result.success) {
        setNewReview({
          rating: 5,
          comment: '',
          title: ''
        });
        setShowForm(false);
      } else {
        setError(result?.error || 'Failed to submit review');
      }
    } catch (err) {
      setError('An error occurred while submitting your review');
      console.error('Review submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate average rating
  const averageRating = reviews?.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Group reviews by rating
  const ratingCounts = Array(5).fill(0);
  reviews?.forEach(review => {
    ratingCounts[5 - review.rating]++;
  });

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {averageRating} out of 5
            </h2>
            <div className="flex items-center mt-1">
              {renderStars(parseInt(averageRating))}
              <span className="ml-2 text-sm text-gray-600">
                {reviews?.length || 0} {reviews?.length === 1 ? 'fikr' : 'fikrlar'}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {showForm ? 'Bekor qilish' : 'Fikr yozish'}
          </button>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[5 - rating] || 0;
            const percentage = reviews?.length ? (count / reviews.length) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center">
                <div className="w-10 text-sm font-medium text-gray-700">{rating} yulduz</div>
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full mx-2 overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-10 text-right text-sm text-gray-600">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Fikr yozish</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sizning bahosi
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    aria-hidden="true"
                    onMouseEnter={() => handleRatingChange(star)}
                    onMouseLeave={() => {}}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRatingChange(star);
                    }}
                  />
                    <span className="sr-only">{star} {star === 1 ? 'star' : 'stars'}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Sarlavha (optional)
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newReview.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Sizning tajribangizni qisqacha tushuntiring"
              />
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Sizning fikringiz *
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                value={newReview.comment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Sizning tajribangiz haqida batafsil ma'lumot..."
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Yuborilmoqda...' : 'Fikr yuborish'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-4">
                  {review.userName ? review.userName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {review.userName || 'Anonymous'}
                      </h4>
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                    {review.verified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2 sm:mt-0">
                        Tasdiqlangan bemor
                      </span>
                    )}
                  </div>
                  
                  {review.title && (
                    <h5 className="font-medium text-gray-900 mt-3">
                      {review.title}
                    </h5>
                  )}
                  
                  <p className="mt-2 text-gray-700">
                    {review.comment}
                  </p>
                  
                  {review.response && (
                    <div className="mt-4 pl-4 border-l-4 border-gray-200">
                      <div className="text-sm text-gray-500">Shifokorning javobi:</div>
                      <p className="mt-1 text-gray-700">{review.response}</p>
                      <div className="mt-1 text-xs text-gray-500">
                        {formatDate(review.responseDate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Fikrlar yo'q. Birinchi fikr yozing!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Review } from '../../interface/games';
import { useAuth0 } from '@auth0/auth0-react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const ReviewPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth0();
    const { gameId } = useParams<{ gameId: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://gamer-insights-server.vercel.app/games/reviews/${gameId}`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
                setLoading(false);

            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            });
    }, [gameId]);

    const handleReviewSubmit = () => {
        if (!isAuthenticated) {
            console.error('User not authenticated');
            toast.error('Please log in to leave a review.', {
                position: 'top-right',
                autoClose: 5000, // 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        fetch(`https://gamer-insights-server.vercel.app/games/${gameId}/reviews/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user && user.sub, review: newReview, gameId, createdAt: new Date(), userName: user && user.name }),
        })
            .then((response) => response.json())
            .then((data) => {
                setReviews((reviews) => [...reviews, data]);
                setNewReview('');
                console.log('Success:', data);
            })
            .catch((error) => console.error('Error posting review:', error));
    };

    return (
        <div>
            {loading ? (
                <p>Loading reviews...</p>
            ) : (
                <ul>
                    <div className='flex flex-col'>
                        <input
                            value={newReview}
                            className="flex-grow border mt-4 rounded-md px-4 py-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Write your review..."
                        />
                        <button onClick={handleReviewSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
                        >Submit Review</button>
                    </div>

                    <ToastContainer />

                    {reviews.map((review) => (
                        <li key={review._id}>
                            <a onClick={() => navigate(`/profile/${user && user.sub}`)} className='hover:cursor-pointer font-bold'>{review.userName}</a> : {review.review}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewPage;

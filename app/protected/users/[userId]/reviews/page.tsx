'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Rating, Button, Card, Stack, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Review {
  id: string;
  carId: string;
  rating: number;
  comment: string;
  createdAt: string;
  carName: string;
}

export default function UserReviews() {
  const { userId } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    fetchUserReviews();
  }, [userId]);

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/reviews`);
      const data = await response.json();
      setReviews(data.reviews);
      
      // Calculate average rating
      const avg = data.reviews.reduce((acc: number, review: Review) => 
        acc + review.rating, 0) / data.reviews.length;
      setAverageRating(avg || 0);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      fetchUserReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Reviews
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Review Statistics</Typography>
        <Typography>
          Average Rating: <Rating value={averageRating} precision={0.5} readOnly />
          ({averageRating.toFixed(1)})
        </Typography>
        <Typography>Total Reviews: {reviews.length}</Typography>
      </Box>

      <Stack spacing={2}>
        {reviews.map((review) => (
          <Card key={review.id} sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6">{review.carName}</Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body1">{review.comment}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  startIcon={<EditIcon />}
                  href={`/protected/users/${userId}/reviews/${review.id}/edit`}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

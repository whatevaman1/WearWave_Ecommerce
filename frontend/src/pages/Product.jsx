import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

// Import Material‑UI components
import { Tabs, Tab, Paper, Typography, Button, TextField, Rating, Divider } from '@mui/material';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  
  // States for reviews
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [activeTab, setActiveTab] = useState(0); // 0: Description, 1: Reviews

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  // Function to fetch reviews from backend
  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  // Function to handle review submission with optimistic update
  const handleReviewSubmit = async () => {
    if (newRating === 0 || newReview.trim() === '') return;
    
    // Create a temporary review object with a temporary ID
    const tempReview = {
      _id: `temp-${Date.now()}`,
      rating: newRating,
      comment: newReview,
    };
    
    // Optimistically update the reviews list
    setReviews(prevReviews => [tempReview, ...prevReviews]);
    setNewReview('');
    setNewRating(0);

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: tempReview.rating, comment: tempReview.comment })
      });
      if (response.ok) {
        // Optionally update the review with the saved version from backend
        const savedReview = await response.json();
        setReviews(prevReviews =>
          prevReviews.map(review =>
            review._id === tempReview._id ? savedReview : review
          )
        );
      } else {
        console.error("Failed to submit review");
        // Optionally, remove the optimistic review or notify the user
      }
    } catch (error) {
      console.error("Error submitting review", error);
      // Optionally, remove the optimistic review or notify the user
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Reviews Section using Material‑UI Tabs ------------- */}
      <div className='mt-20'>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Description" />
          <Tab label={`Reviews (${reviews.length})`} />
        </Tabs>
        {activeTab === 0 && (
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <Typography variant="body1">
            WearWave is a dynamic e-commerce platform designed to redefine your shopping experience. As a seamless online marketplace, WearWave connects you with the latest trends, exclusive deals, and a hassle-free shopping journey. Whether you're a business looking to showcase products or a customer seeking quality and convenience, WearWave brings the marketplace to your fingertips—anytime, anywhere!
            </Typography>
            <Typography variant="body1">
            At WearWave, we bring shopping to life with a seamless and immersive experience. Our platform showcases a wide range of products with detailed descriptions, high-quality images, competitive prices, and customizable options like sizes and colors. Each item has its own dedicated page, ensuring you have all the information needed to make the perfect choice. Discover the future of effortless shopping with WearWave!
            </Typography>
          </div>
        )}
        {activeTab === 1 && (
          <div className='mt-4'>
            <Typography variant="h6" gutterBottom>User Reviews</Typography>
            {reviews.length ? (
              reviews.map((review) => (
                <Paper key={review._id} style={{ padding: '16px', marginBottom: '8px' }}>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2">{review.comment}</Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2">No reviews yet. Be the first to review!</Typography>
            )}
            <Divider style={{ margin: '16px 0' }}/>
            <Typography variant="h6" gutterBottom>Add Your Review</Typography>
            <Rating
              name="new-review-rating"
              value={newRating}
              onChange={(event, newValue) => setNewRating(newValue)}
            />
            <TextField 
              label="Comment" 
              multiline 
              rows={4} 
              variant="outlined" 
              value={newReview} 
              onChange={(e) => setNewReview(e.target.value)}
              fullWidth
              style={{ marginTop: '16px', marginBottom: '16px' }}
            />
            <Button variant="contained" onClick={handleReviewSubmit}>
              Submit Review
            </Button>
          </div>
        )}
      </div>

      {/* --------- Display related products ---------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;

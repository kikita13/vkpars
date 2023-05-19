import React from 'react';
import { fetchPosts } from '@redux/slices/posts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const index = () => {
  const posts = useSelector(state => state.posts.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPosts())
  },[])
  return (
    <div className='container'>
    </div>
  );
};

export default index;
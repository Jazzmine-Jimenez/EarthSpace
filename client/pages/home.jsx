import React from 'react';
import Header from '../components/header';
// import PostForm from './post-form';
import UsersPosts from './users-posts';

export default function Home(props) {
  return (
    <>
      <Header />
      <UsersPosts />
    </>
  );
}

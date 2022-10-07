import React, { useEffect } from 'react';
import axiosClient from '~/axiosClient';

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosClient.get('/addresses');
      console.log(res);
    };

    return () => {
      fetchData();
    };
  }, []);

  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}

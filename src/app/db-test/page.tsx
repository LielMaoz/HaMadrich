'use client';

import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Fetch data from the API
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log('Fetched users:', data); // Log the raw JSON data in the console
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching users:', error.message);
        } else {
          console.error('An unknown error occurred');
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Check Database Connection</h1>
      <p>Open the console to view the raw JSON data from the database.</p>
    </div>
  );
};

export default Page;

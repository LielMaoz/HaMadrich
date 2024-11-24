// app/users/page.tsx

import { User } from '@/app/api/users/route'; // Optional: Create a User type for better type safety

// Define a type for the user data (customize fields as needed)
/*interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  permission: string;
}*/

// Function to fetch data from the API
async function fetchData(): Promise<User[]> {
  const response = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',  // Prevent caching for dynamic data
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export default async function UsersPage() {
  let data: User[];
  try {
    data = await fetchData();  // Fetch data on the server
  } catch (error) {
    console.error('Error fetching users:', error);
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

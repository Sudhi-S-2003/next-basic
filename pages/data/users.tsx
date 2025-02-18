import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import FilterInput from '@/components/data/FilterInput';

// Define interfaces for User and Response
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

interface UsersResponse {
  data: User[];
}

// Fetch function with dynamic query parameters
const fetchUsers = async (params: URLSearchParams): Promise<UsersResponse> => {
  const queryString = params.toString(); // Get the query string from the URLSearchParams
  const res = await fetch(`http://localhost:3000/api/data/users?${queryString}`);

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
};

// Component to display the users
const Users: React.FC = () => {
  const searchParams = useSearchParams();

  // Use react-query's useQuery to fetch the users
  const { data, error, isLoading } = useQuery<UsersResponse>({
    queryKey: ['users', searchParams.toString()], // Query key includes the entire query string as a dependency
    queryFn: () => fetchUsers(searchParams), // Fetch function with the entire URLSearchParams
    staleTime: 300000, // Cache data for 5 minutes
    cacheTime: 600000, // Cache data for 10 minutes
  });

  if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error instanceof Error) return <div className="text-center text-red-500">{`Error: ${error.message}`}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Users</h1>

      {/* Filter Input */}
      <FilterInput  name='firstName'/>

      {/* Users Table */}
      <div className="overflow-x-auto shadow-md border-b border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{user.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Users Found */}
      {data?.data.length === 0 && (
        <div className="mt-6 text-center text-gray-500">
          <p>No users found based on the applied filters.</p>
        </div>
      )}
    </div>
  );
};

export default Users;
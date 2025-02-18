import { useRouter } from 'next/router';
import { useState } from 'react';

interface FilterInputProps {
  name: string;  // Expecting name to be a string passed in as a prop
}

const FilterInput: React.FC<FilterInputProps> = ({ name }) => {
  const router = useRouter();
  const [filter, setFilter] = useState<string>('');  // Set an empty string as initial value

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const applyFilter = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [name]: filter },
    });
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by name or role..."
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button
        onClick={applyFilter}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default FilterInput;

import React, { useState, useEffect } from 'react';
import { getWholesalers } from '../services/wholesalersApi';
import { Table } from '@radix-ui/themes';
import { Grid, List } from 'lucide-react';
import WholesalerDialog from './components/WholesalerDialog';
import image from '../assets/brand/Cover.png';

const Wholesalers = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [wholesalerData, setWholesalerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial data
    const fetchWholesalers = async () => {
      try {
        setLoading(true);
        const data = await getWholesalers();
        setWholesalerData(data);
      } catch (err) {
        console.error('Error fetching wholesalers:', err);
        setError('Failed to load wholesalers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWholesalers();
  }, []);

  const handleAddWholesaler = (newWholesaler) => {
    // Add the new wholesaler to the current state
    setWholesalerData((prevData) => [...prevData, newWholesaler]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Wholesalers</h1>

        <button
          className="flex items-center gap-2 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => setIsGridView((prev) => !prev)}
        >
          {isGridView ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
          {isGridView ? 'Switch to List View' : 'Switch to Grid View'}
        </button>
      </div>

      {/* Add Dialog */}
      <WholesalerDialog onAddWholesaler={handleAddWholesaler} />

      {/* Conditional View */}
      {isGridView ? (
        <div className="grid md:grid-cols-3 gap-4">
          {wholesalerData.map((wholesaler, index) => (
            <div key={wholesaler.id} className="border rounded-md p-4 shadow">
              <img
                src={image} // Replace with a real image URL if available
                alt={wholesaler.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h2 className="font-semibold text-lg">{wholesaler.name}</h2>
              <p className="text-gray-500">Contact: {wholesaler.contact}</p>
              <p className="text-gray-500">Code: {wholesaler.code}</p>
            </div>
          ))}
        </div>
      ) : (
        <Table.Root variant="surface" className="w-full border border-gray-300 rounded-md shadow-md">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>S.N</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Contact</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {wholesalerData.map((wholesaler, index) => (
              <Table.Row key={wholesaler.id}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{wholesaler.name}</Table.Cell>
                <Table.Cell>{wholesaler.code}</Table.Cell>
                <Table.Cell>{wholesaler.contact}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export default Wholesalers;

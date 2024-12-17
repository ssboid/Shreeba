import React, { useState } from 'react';
import { Table } from '@radix-ui/themes';
import { Grid, List } from 'lucide-react';
import WholesalerDialog from './components/WholesalerDialog';
import image from '../assets/brand/Cover.png';

const Wholesalers = () => {
  const [isGridView, setIsGridView] = useState(false);

  const wholesalerData = [
    {
      sn: 1,
      name: 'ABC Wholesalers',
      code: 'WH-001',
      contact: '9876543210',
      address: 'Kathmandu, Nepal',
      image: image,
    },
    {
      sn: 2,
      name: 'XYZ Wholesalers',
      code: 'WH-002',
      contact: '9801234567',
      address: 'Lalitpur, Nepal',
      image: image,
    },
    // Add more sample wholesalers as needed
  ];

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
      <WholesalerDialog />

      {/* Conditional View */}
      {isGridView ? (
        <div className="grid md:grid-cols-3 gap-4">
          {wholesalerData.map((wholesaler) => (
            <div key={wholesaler.sn} className="border rounded-md p-4 shadow">
              <img
                src={wholesaler.image}
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
              <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {wholesalerData.map((wholesaler) => (
              <Table.Row key={wholesaler.sn}>
                <Table.RowHeaderCell>{wholesaler.sn}</Table.RowHeaderCell>
                <Table.Cell>{wholesaler.name}</Table.Cell>
                <Table.Cell>{wholesaler.code}</Table.Cell>
                <Table.Cell>{wholesaler.contact}</Table.Cell>
                <Table.Cell>{wholesaler.address}</Table.Cell>
                <Table.Cell>
                  <img
                    src={wholesaler.image}
                    alt="Wholesaler"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export default Wholesalers;

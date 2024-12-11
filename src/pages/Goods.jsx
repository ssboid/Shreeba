import React, { useState } from 'react';
import { Table } from '@radix-ui/themes';
import { Grid, List } from 'lucide-react';
import image from '../assets/brand/Cover.png';
import AddDialog from './components/AddDialog';

const Goods = () => {
  const [isGridView, setIsGridView] = useState(true);
  const sections = [
    {
      title: 'General Information',
      fields: [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter item name', required: true },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter description' },
      ],
    },
    {
      title: 'Wholesaler & Pricing',
      fields: [
        { name: 'costPrice', label: 'Cost Price', type: 'number', placeholder: 'Enter cost price', required: true },
        { name: 'markedPrice', label: 'Marked Price', type: 'number', placeholder: 'Enter marked price', required: true },
      ],
    },
    {
      title: 'Variants',
      fields: [
        { name: 'color', label: 'Color', type: 'text', placeholder: 'Enter color' },
        { name: 'size', label: 'Size', type: 'text', placeholder: 'Enter size' },
      ],
    },
  ];

  const itemCodeActions = {
    onGenerate: () => console.log('Code generated'),
    onSave: () => console.log('Code saved manually'),
  };
  const goodsData = [
    {
      sn: 1,
      piececode: 'qqfqf2081-08-06',
      piecetype: 'qqweqwe',
      purchasedate: '2081-08-06',
      costprice: 100,
      markedprice: 150,
      pieceavailable: true,
      pieceimage: image,
      wholesalercode: 'FA',
    },
    // Add more goods as needed
  ];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Goods Inventory</h1>

        <button
          className="flex items-center gap-2 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => setIsGridView((prev) => !prev)}
        >
          {isGridView ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
          {isGridView ? 'Switch to List View' : 'Switch to Grid View'}
        </button>

      </div>
      <AddDialog sections={sections} itemCodeActions={itemCodeActions} />


      {isGridView ? (
        <div className="grid md:grid-cols-3 gap-4">
          {goodsData.map((item) => (
            <div key={item.sn} className="border rounded-md p-4 shadow">
              <img
                src={item.pieceimage}
                alt={item.piecetype}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h2 className="font-semibold text-lg">{item.piececode}</h2>
              <p className="text-gray-500">Marked Price: ${item.markedprice}</p>
            </div>
          ))}
        </div>
      ) : (
        <Table.Root variant="surface" className="w-full border border-gray-300 rounded-md shadow-md">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>S.N</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Piece Code</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Piece Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Purchase Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Cost Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Marked Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Available</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Piece Image</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Wholesaler Code</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {goodsData.map((item) => (
              <Table.Row key={item.sn}>
                <Table.RowHeaderCell>{item.sn}</Table.RowHeaderCell>
                <Table.Cell>{item.piececode}</Table.Cell>
                <Table.Cell>{item.piecetype}</Table.Cell>
                <Table.Cell>{item.purchasedate}</Table.Cell>
                <Table.Cell>{item.costprice}</Table.Cell>
                <Table.Cell>{item.markedprice}</Table.Cell>
                <Table.Cell>{item.pieceavailable ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell>
                <img
                  src={image}
                  alt="Piece"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                </Table.Cell>
                <Table.Cell>{item.wholesalercode}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export default Goods;

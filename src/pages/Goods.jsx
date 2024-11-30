import React from 'react';
import { Table } from '@radix-ui/themes';
import AddDialog from './components/AddDialog';
import image from '../assets/brand/Cover.png';
const Goods = () => {
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
      pieceimage: '../assets/header-logo.png',
      wholesalercode: 'FA',
    },
  ];

  return (
    <div className="p-2">
      <h1 className="mb-4">Goods Inventory</h1>
      <AddDialog sections={sections} itemCodeActions={itemCodeActions} />
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
    </div>
  );
};

export default Goods;

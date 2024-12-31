import React, { useState, useEffect } from 'react';
import { Table } from '@radix-ui/themes';
import { Grid, List } from 'lucide-react';
import image from '../assets/brand/Cover.png';
import AddDialog from './components/AddDialog';
import { getGoods } from '../services/goodsApi';

const Goods = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [goodsData, setGoodsData] = useState([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await getGoods(); // Fetch goods data
        setGoodsData(data); // Update the state with the fetched data
        console.log("Goods fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };

    fetchGoods();
  }, []);

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

  // Function to generate wholesaler code from name
  const getWholesalerCode = (name) => {
    if (!name) return 'N/A'; // Return N/A if no name is provided
    const parts = name.split(' ');
    const initials = parts.map((part) => part.charAt(0).toUpperCase());
    return initials.slice(0, 2).join(''); // Get the first two initials
  };

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
          {goodsData.map((item, index) => (
            <div key={index} className="border rounded-md p-4 shadow">
              <img
                src={item.pieceimage || image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h1 className="font-semibold text-lg">{item.name}</h1>

              <h2 className="font-semibold text-md">{item.productcode}</h2>
              <p className="text-gray-500">Marked Price: ${item.markedprice}</p>
              <p className="text-gray-500">Wholesaler Code: {getWholesalerCode(item.wholesalername)}</p>
            </div>
          ))}
        </div>
      ) : (
        <Table.Root variant="surface" className="w-full border border-gray-300 rounded-md shadow-md">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>S.N</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Piece Code</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Piece Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Purchase Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Cost Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Marked Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Available</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Piece Image</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Wholesaler Code</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {goodsData.map((item, index) => (
              <Table.Row key={index}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{item.productcode}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.purchasedate}</Table.Cell>
                <Table.Cell>{item.costprice}</Table.Cell>
                <Table.Cell>{item.markedprice}</Table.Cell>
                <Table.Cell>{item.pieceavailable ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell>
                  <img
                    src={item.pieceimage || image}
                    alt="Piece"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </Table.Cell>
                <Table.Cell>{getWholesalerCode(item.wholesalername)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export default Goods;

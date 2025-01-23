import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGoodById } from '../../services/goodsApi';
import nlp from 'compromise'; // Import the NLP library
import { NepaliDatePicker } from 'nepali-datepicker-reactjs';
import 'nepali-datepicker-reactjs/dist/index.css';
import Cookies from 'js-cookie';
import { addSale } from '../../services/salesApi';
import { updateVar } from '../../services/goodsApi';
const UserProducts = () => {
  const [tags, setTags] = useState([]); // State for dynamically generated tags

  // Color mapping object
  const colorMappings = {
    'Crimson': 'bg-red-600',
    'Navy': 'bg-blue-900',
    'Forest': 'bg-green-800',
    'Purple': 'bg-purple-500',
    'Blue': 'bg-blue-500',
    'Green': 'bg-green-500',
    'Lime': 'bg-lime-500',
    'Pink': 'bg-pink-500',
    'Yellow': 'bg-yellow-500',
    'Orange': 'bg-orange-500',
    'Red': 'bg-red-500',
    'Black': 'bg-black',
    'White': 'bg-white'
  };

  // Size mapping object
  const sizeMappings = {
    'XS': 'Extra Small (XS)',
    'S': 'Small (S)',
    'M': 'Medium (M)',
    'L': 'Large (L)',
    'XL': 'Extra Large (XL)',
    'XXL': 'Double XL (XXL)',
    'XXXL': 'Triple XL (XXXL)'
  };

  const prod = {
    tags: [
      "Plazzo",
      "Kurta",
      "Two piece",
      "Blue",
      "FA",
      "2081",
      "4 units",
      "No shawl",
      "Minimal",
      "Above ankle",
      "Elbow length",
      "U neck",
      "No pattern",
    ],
  };

   // Generate tags from description using NLP
   const generateTags = (description) => {
    if (!description) return [];
    const doc = nlp(description);
    // Extract nouns and relevant terms as tags
    const extractedTags = doc.nouns().out('array');
    return extractedTags.length ? extractedTags.slice(0, 10) : ["General"];
  };

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [sellingPrice, setSellingPrice] = useState('');
  const [date, setDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const handleSubmit = async () => {
    if (!sellingPrice || !date) {
      alert('Selling Price and Date are required!');
      return;
    }
  
    try {
      // Retrieve the 'id' value from cookies
      const userId = Cookies.get('id');
  
      if (!userId) {
        alert('User ID not found in cookies.');
        return;
      }
  
      // Prepare sale data to add
      const saleData = {
        userId,          // Retrieved from cookies
        goodsId: id,     // Retrieved from the route
        sp: sellingPrice,
        date,
        remarks,
      };
  
      console.log('Sending Sale Data:', saleData);
  
      // Call the API to add the sale
      const response = await addSale(saleData);
      console.log('Sale added successfully:', response);
  
      alert('Sale added successfully!');
  
      // Update the numitems state immediately
      if (product && product.numitems > 0) {
        const updatedGood = {
          numitems: product.numitems - 1,  // Deduct 1 from numitems
        };
  
        console.log('Updating product inventory:', updatedGood);
  
        // Update in backend
        await updateVar(id, updatedGood);
  
        // Update state for instant UI feedback
        setProduct((prev) => ({
          ...prev,
          numitems: prev.numitems - 1,
        }));
  
        console.log(`Product ${id} inventory updated successfully!`);
      } else {
        alert('No items left in stock.');
      }
  
      setShowPopup(false); // Close the popup
    } catch (error) {
      console.error('Error submitting sale:', error);
      alert(error.message || 'Failed to add sale.');
    }
  };
  
  

  const FALLBACK_IMAGE = "https://www.devnaagri.com/cdn/shop/files/CelebWebsite2278.jpg?v=1709111593";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getGoodById(id);
        console.log(data);
        setProduct(data);

        // Generate tags from product description
        if (data.description) {
          const generatedTags = generateTags(data.description);
          setTags(generatedTags);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);


  // Function to map color names to Tailwind classes
  const getColorClass = (colorName) => {
    return colorMappings[colorName] || 'bg-gray-500'; // Fallback color if mapping not found
  };

  // Function to map size codes to display format
  const getSizeDisplay = (sizeCode) => {
    return sizeMappings[sizeCode] || sizeCode; // Fallback to original code if mapping not found
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="bg-secondary100 rounded-lg shadow-2xl p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full lg:w-[300px]">
          <img
            src={product.productimage || FALLBACK_IMAGE}
            alt={product.name}
            className="rounded-lg w-full"
            onError={(e) => {
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        {/* Product Details */}
        <div className="w-full text-left">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-sm text-gray-600">
            Description; {product.description} <br />
            Product code: {product.productcode} <br />
            Purchase date: {product.purchasedate}
          </p>
          <p className="text-sm mt-2">
            Wholesaler:{" "}
            <span className="text-primary font-medium">
              {product.wholesalername}
            </span>
          </p>

          {/* Pricing */}
          <div className="mt-4">
            <p>
              Cost Price: <strong>{product.costprice}</strong>
            </p>
            <p>
              Marked Price: <strong>{product.markedprice}</strong>
            </p>
                    <p>
              Variants: <strong>{product.numitems}</strong>
            </p>
          </div>

          {/* Variants */}
          <div className="mt-4">
            <h3 className="font-medium">Variants</h3>
            {product.colors && product.colors.length > 0 && (
              <div>
                <p>Colors:</p>
                <div className="flex gap-2 mt-1">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className={`w-6 h-6 rounded-full ${getColorClass(color)} border`}
                      title={color} // Show original color name on hover
                    ></span>
                  ))}
                </div>
              </div>
            )}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-2">
                <p>Sizes:</p>
                <div className="flex gap-2 mt-1">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      {getSizeDisplay(size)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-4">
            <h3 className="font-medium">Tags</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-sm rounded"
              >
                {tag}
              </span>
            ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4 justify-end">
      <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(true)}
        >
          Sold
        </button>
      </div>

            {/* Sold Pop-up */}
            {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Mark as Sold</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Selling Price (Required)
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border rounded"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date (Required)</label>
              <NepaliDatePicker
                className="w-full p-2 border rounded"
                value={date}
                onChange={(value) => setDate(value)}
                options={{
                  calenderLocale: 'en',
                  valueLocale: 'en',
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Remarks</label>
              <textarea
                className="w-full p-2 border rounded"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserProducts;
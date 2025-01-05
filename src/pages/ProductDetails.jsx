import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGoodById } from '../services/goodsApi';

const ProductDetails = () => {
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

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FALLBACK_IMAGE = "https://www.devnaagri.com/cdn/shop/files/CelebWebsite2278.jpg?v=1709111593";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getGoodById(id);
        setProduct(data);
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
            ID No. {product.id} <br />
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
              {prod.tags.map((tag, index) => (
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button className="bg-gray-300 px-4 py-2 rounded">Previous</button>
        <button className="bg-gray-300 px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default ProductDetails;
const ProductDetails = () => {
    const product = {
      id: 4324,
      name: "Blue Kurta with Plazzo",
      productCode: "2054-FA03214-1032/4324-4330",
      purchaseDate: "21 Shrawan, 2081 (4 August 2025)",
      wholesaler: { name: "Faarah Sharma", abbreviation: "FA" },
      costPrice: 2000,
      markedPrice: 2500,
      variants: {
        colors: [
            "bg-blue-500",   // Tailwind blue
            "bg-purple-500", // Tailwind purple
            "bg-green-500",  // Tailwind green
            "bg-lime-500",   // Tailwind lime
          ],        sizes: ["Small (S)", "Medium (M)", "Large (L)"],
      },
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
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 ml-80">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="w-[300px]">
            <img
              src="https://www.devnaagri.com/cdn/shop/files/CelebWebsite2278.jpg?v=1709111593" // Replace with actual image
              alt={product.name}
              className="rounded-lg"
            />
          </div>
  
          {/* Product Details */}
          <div className="w-1/2 text-left"> {/* Align all text to the left */}
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">
              ID No. {product.id} <br />
              Product code: {product.productCode} <br />
              Purchase date: {product.purchaseDate}
            </p>
            <p className="text-sm mt-2">
              Wholesaler:{" "}
              <span className="text-primary font-medium">
                {product.wholesaler.name} ({product.wholesaler.abbreviation})
              </span>
            </p>
  
            {/* Pricing */}
            <div className="mt-4">
              <p>
                Cost Price: <strong>{product.costPrice}</strong>
              </p>
              <p>
                Marked Price: <strong>{product.markedPrice}</strong>
              </p>
            </div>
  
            {/* Variants */}
            <div className="mt-4">
              <h3 className="font-medium">Variants</h3>
              <div>
                <p>Colors:</p>
                <div className="flex gap-2 mt-1">
                  {product.variants.colors.map((color, index) => (
                    <span
                      key={index}
                      className={`w-6 h-6 rounded-full ${
                        color.toLowerCase()
                      } border`}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <p>Sizes:</p>
                <div className="flex gap-2 mt-1">
                  {product.variants.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Tags */}
            <div className="mt-4">
              <h3 className="font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.tags.map((tag, index) => (
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
  
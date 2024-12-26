import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { Checkbox, Grid, Text, Select } from "@radix-ui/themes";
import CalendarSection from "./CalendarSection";
import { getWholesalers } from "../../services/wholesalersApi";

const DynamicForm = ({ sections, itemCodeActions }) => {
  const [purchaseDate, setPurchaseDate] = useState("");
  const [wholesalers, setWholesalers] = useState([]);

  const [formData, setFormData] = useState({
    description: "",
    productCode: "",
    wholesalerName: "", // Default value
    numberOfVariants: "",
    colors: [],
    sizes: [],
  });
  const sizes = ["S", "M", "L", "XL", "2XL"]; // Define the sizes array here
  const handleSizeChange = (size, isChecked) => {
    setFormData((prev) => {
      const updatedSizes = isChecked
        ? [...(prev.sizes || []), size] // Add size if checked
        : (prev.sizes || []).filter((s) => s !== size); // Remove size if unchecked
  
      const lastSelectedSize = updatedSizes.length > 0 ? updatedSizes[updatedSizes.length - 1] : ""; // Get the last selected size or empty
  
      console.log("Selected Sizes:", updatedSizes); // Log the updated sizes
  
      return {
        ...prev,
        size: lastSelectedSize, // Update the `size` field with the last selected size
      };
    });
  };
  
  
  const handleDateChange = (date) => {
    console.log("Received Date in DynamicForm:", date); // Log for debugging
    setPurchaseDate(date); // Save the date in state
  };
  
  
  
  useEffect(() => {
    const initialFormData = sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.name] = ""; // Initialize fields with an empty string or a default value
      });
      return acc;
    }, {});

    setFormData(initialFormData);
  }, [sections]); // Run whenever sections prop changes

  const bundleData = () => {
    const bundledData = {
      ...formData, // Spread the entire formData object
      purchaseDate, // Add additional state fields like purchaseDate
    };

    console.log("Bundled Data:", bundledData);
  };

  useEffect(() => {
    // Fetch wholesalers data from API
    const fetchWholesalers = async () => {
      try {
        const data = await getWholesalers();
        setWholesalers(data); // Store wholesalers in state
        console.log("Fetched wholesalers:", data); // Debugging log
      } catch (error) {
        console.error("Error fetching wholesalers:", error);
      }
    };

    fetchWholesalers();
  }, []);

  return (
    <Form.Root className="p-6 bg-white space-y-6">
      {/* Sticky Add Item Header */}
      <div
        className="flex justify-between shadow-sm items-center p-4 bg-white border-b border-gray-300 sticky top-0 z-10"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <h1 className="text-xl font-semibold text-gray-800">Add Item</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => {
              // Handle cancel logic here
              console.log("Cancel clicked");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* General Information Section */}
        <div className="p-4 border rounded-md shadow-sm bg-gray-50">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            General Information
          </h2>
          {sections[0].fields.map((field, index) => (
            <Form.Field key={index} className="mb-4" name={field.name}>
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-800">
                  {field.label}
                </Form.Label>
                {field.required && (
                  <Form.Message
                    className="text-[13px] text-red-500"
                    match="valueMissing"
                  >
                    {field.errorMessage || "This field is required"}
                  </Form.Message>
                )}
              </div>
              <Form.Control asChild>
                {field.type === "textarea" ? (
                  <textarea
                    className="w-full h-20 p-2 border rounded-lg text-gray-800"
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
                  />
                ) : (
                  <input
                    className="w-full h-10 p-2 border rounded-lg text-gray-800"
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
                  />
                )}
              </Form.Control>
              {field.name === "description" && (
                <p className="mt-1 text-sm text-left text-orange-500">
                  Tip: Write a description to generate filtering tags for your
                  product.
                </p>
              )}
            </Form.Field>
          ))}

          {/* Tags Section */}
          <div className="mt-4">
            <h3 className="text-[15px] font-medium leading-[35px] text-gray-800">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Example Static Tags - These will be dynamically generated later */}
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                Tag 1
              </span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                Tag 2
              </span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                Tag 3
              </span>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <CalendarSection
          purchaseDate={purchaseDate}
          handleDateChange={handleDateChange}
          
        />
      </div>

      {/* Wholesaler & Pricing Section */}
      <div className="p-4 border rounded-md shadow-sm bg-gray-50">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Wholesaler & Pricing
        </h2>
        {sections[1].fields.map((field, index) => (
          <Form.Field key={index} className="mb-4" name={field.name}>
            <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-800">
              {field.label}
            </Form.Label>
            <Form.Control asChild>
              <input
                className="w-full h-10 p-2 border rounded-lg text-gray-800"
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
              />
            </Form.Control>
          </Form.Field>
        ))}
        {/* Wholesaler Section */}
        <div className="p-4 border rounded-md shadow-sm bg-gray-50">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Wholesaler
          </h2>
          <Form.Field className="mb-4" name="wholesalerName">
            <Form.Label>Wholesaler Name</Form.Label>
            <Select.Root
              value={formData.wholesalerName}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, wholesalerName: value }))
              }
            >
              <Select.Trigger variant="surface" radius="full" />
              <Select.Content>
                {wholesalers.map((wholesaler) => (
                  <Select.Item key={wholesaler.id} value={wholesaler.name}>
                    {wholesaler.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Form.Field>
        </div>
      </div>

      {/* Variants Section */}
      <div className="p-4 border rounded-md shadow-sm bg-gray-50">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Variants: Colors, Sizes
        </h2>

        {/* Number of Variants Field */}
        <Form.Field className="mb-4" name="numberOfVariants">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-800">
            Number of Variants
          </Form.Label>
          <Form.Control asChild>
            <input
              className="w-full h-10 p-2 border rounded-lg text-gray-800"
              type="number"
              placeholder="Enter number of variants"
              value={formData.color || ""} // Bind to formData
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, color: e.target.value }))
              }
              
            />
          </Form.Control>
        </Form.Field>

        {/* Colors Section */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Colors</h3>
          <Grid columns="5" display="inline-grid" gap="2">
            <div className="flex items-center gap-2">
              <Checkbox color="indigo" />
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#5A67D8" }} // Indigo color
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="cyan" />
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#38B2AC" }} // Cyan color
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="orange" />
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#ED8936" }} // Orange color
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="crimson" />
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#E53E3E" }} // Crimson color
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox color="gray" />
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#A0AEC0" }} // Gray color
              ></div>
            </div>
          </Grid>
        </div>

       {/* Sizes Section */}
{/* Sizes Section */}
{/* Sizes Section */}
<div>
  <h3 className="text-md font-semibold mb-2">Sizes</h3>
  <Grid columns="5" display="inline-grid" gap="2">
    {sizes.map((size) => (
      <div key={size} className="flex items-center gap-2">
        <Checkbox
          checked={formData.sizes && formData.sizes.indexOf(size) > -1} // Safely access sizes
          onCheckedChange={(isChecked) => handleSizeChange(size, isChecked)} // Handle change
        />
        <Text>{size}</Text>
      </div>
    ))}
  </Grid>
</div>


      </div>

      {/* Item Code Section */}
      <div className="p-4 border rounded-md shadow-sm bg-gray-50">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Item Code</h2>
        <div className="flex items-center gap-4 mt-4">
          <Form.Field name="productCode" className="flex-grow">
            <Form.Control asChild>
              <input
                type="text"
                className="w-full p-2 border rounded-lg text-gray-800"
                placeholder="Code here..."
              />
            </Form.Control>
          </Form.Field>
          <button
            type="button"
            className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600"
            onClick={itemCodeActions.onGenerate}
          >
            Generate Code
          </button>
          <button
            type="button"
            className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            onClick={bundleData} // Call the function here
          >
            Save Manual
          </button>
        </div>
      </div>
    </Form.Root>
  );
};

export default DynamicForm;

import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { Checkbox, Grid, Text, Select } from "@radix-ui/themes";
import CalendarSection from "./CalendarSection";
import { getWholesalers } from "../../services/wholesalersApi";
import useGenerateItemCode from "../../hooks/useGenerateItemCode";
import { addGood } from "../../services/goodsApi";
const DynamicForm = ({ sections, itemCodeActions }) => {
  const [purchaseDate, setPurchaseDate] = useState("");
  const [wholesalers, setWholesalers] = useState([]);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const { generateCode } = useGenerateItemCode(); // Use the hook

  const [formData, setFormData] = useState({
    description: "",
    productCode: "",
    wholesalerName: "", // Default value
    numItems: "",
    sizes: [],
    colors: [],
  });
  const sizes = ["S", "M", "L", "XL", "2XL"]; // Define the sizes array here
  const handleSizeChange = (size, isChecked) => {
    setFormData((prev) => {
      const updatedSizes = isChecked
        ? [...(prev.sizes || []), size] // Add size if checked
        : (prev.sizes || []).filter((s) => s !== size); // Remove size if unchecked
  
      console.log("Selected Sizes:", updatedSizes); // Log the updated sizes
  
      return {
        ...prev,
        sizes: updatedSizes, // Update only the `sizes` field
      };
    });
  };
  

  const colors = [
    { name: "Indigo", colorCode: "#5A67D8" },
    { name: "Cyan", colorCode: "#38B2AC" },
    { name: "Orange", colorCode: "#ED8936" },
    { name: "Crimson", colorCode: "#E53E3E" },
    { name: "Gray", colorCode: "#A0AEC0" },
  ];
  
  const handleColorChange = (color, isChecked) => {
    setFormData((prev) => {
      const updatedColors = isChecked
        ? [...(prev.colors || []), color] // Add color if checked
        : (prev.colors || []).filter((c) => c !== color); // Remove color if unchecked
  
      console.log("Selected Colors:", updatedColors); // Log the updated colors
      return { ...prev, colors: updatedColors }; // Only update `colors`
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
    const { color, ...rest } = formData; // Exclude `color`

    const bundledData = {
      
      ...rest, // Spread the entire formData object
      purchaseDate, // Add additional state fields like purchaseDate
    };
    alert(`Bundled Data:\n${JSON.stringify(bundledData, null, 2)}`);

    console.log("Bundled Data:", bundledData);
    return bundledData; // Return bundled data for further use

  };


  const handleGenerateCode = () => {
    const bundledData = bundleData(); // Get the bundled data
    console.log("Bundled Data for Code Generation:", bundledData); // Log bundled data
    
    const productCode = generateCode(
      bundledData.wholesalerName,
      bundledData.purchaseDate,
      bundledData.costPrice,
      bundledData.markedPrice,
      bundledData.numItems
    ); // Generate the code
    
    if (productCode) {
      console.log("Successfully Generated Product Code:", productCode); // Log the product code
    } else {
      console.log("Failed to Generate Product Code. Check Input Data."); // Log failure
    }
    
    // Update the formData with the generated product code
    setFormData((prev) => ({ ...prev, productCode }));
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

  const handleSaveManualCode = () => {
    if (formData.productCode) {
      console.log("Manual Code Saved:", formData.productCode); // Log the updated code
      alert(`Manual Code Saved: ${formData.productCode}`); // Alert the user
    } else {
      console.log("Product code is empty. Nothing to save."); // Log empty case
      alert("Please enter a product code to save.");
    }
  };
  useEffect(() => {
    const submitData = async () => {
      if (!shouldSubmit) return;
  
      const bundledData = bundleData(); // Prepare the data to send
      console.log("Submitting data:", bundledData);
  
      try {
        const response = await addGood(bundledData); // Call the API
        console.log("Good added successfully:", response); // Log success
        alert("Good added successfully!");
      } catch (error) {
        console.error("Error adding good:", error); // Log error
        alert("An error occurred while adding the good.");
      } finally {
        setShouldSubmit(false); // Reset submission trigger
      }
    };
  
    submitData();
  }, [shouldSubmit]); // Trigger when `shouldSubmit` changes

 
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
  onClick={() => setShouldSubmit(true)} // Trigger submission
  className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
>
  Click
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
        <Form.Field className="mb-4" name="numItems">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-800">
            Number of Variants
          </Form.Label>
          <Form.Control asChild>
            <input
              className="w-full h-10 p-2 border rounded-lg text-gray-800"
              type="number"
              placeholder="Enter number of variants"
              value={formData.numItems || ""} // Bind to formData
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, numItems: e.target.value }))
              }
              
            />
          </Form.Control>
        </Form.Field>

       {/* Colors Section */}
<div className="mb-6">
  <h3 className="text-md font-semibold mb-2">Colors</h3>
  <Grid columns="5" display="inline-grid" gap="2">
    {colors.map(({ name, colorCode }) => (
      <div key={name} className="flex items-center gap-2">
        <Checkbox
          checked={formData.colors && formData.colors.includes(name)} // Check if the color is already selected
          onCheckedChange={(isChecked) => handleColorChange(name, isChecked)} // Handle change
        />
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colorCode }}
        ></div>
      </div>
    ))}
  </Grid>
</div>

{/* Sizes Section */}
<div>
  <h3 className="text-md font-semibold mb-2">Sizes</h3>
  <Grid columns="5" display="inline-grid" gap="2">
    {sizes.map((size) => (
      <div key={size} className="flex items-center gap-2">
        <Checkbox
          checked={formData.sizes?.includes(size)} // Safely check if the size is selected
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
          value={formData.productCode || ""} // Bind to formData
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, productCode: e.target.value }))
          } // Allow manual editing
        />
      </Form.Control>
    </Form.Field>
    <button
      type="button"
      className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600"
      onClick={handleGenerateCode} // Trigger code generation
    >
      Generate Code
    </button>
    <button
      type="button"
      className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      onClick={handleSaveManualCode} // Trigger manual save
    >
      Save Manual
    </button>
  </div>
</div>


    </Form.Root>
  );
};

export default DynamicForm;

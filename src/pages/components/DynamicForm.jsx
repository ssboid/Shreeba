import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { Checkbox, Grid, Text, Select } from "@radix-ui/themes";
import CalendarSection from "./CalendarSection";
import { getWholesalers } from "../../services/wholesalersApi";
import useGenerateItemCode from "../../hooks/useGenerateItemCode";
import { addGood } from "../../services/goodsApi";
import Uploader from "../Uploader";
import * as z from "zod";
// Zod Schema for Form Validation
const FormSchema = z.object({
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  wholesalerName: z.string().min(1, { message: "Wholesaler name is required" }),
  costPrice: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Cost price must be a number",
    }),
  markedPrice: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Marked price must be a number",
    }),
  numItems: z
    .string()
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
      message: "Number of variants must be a positive number",
    }),
  purchaseDate: z.string().min(1, { message: "Purchase date is required" }),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
});

const DynamicForm = ({ sections, itemCodeActions }) => {
  const [purchaseDate, setPurchaseDate] = useState("");
  const [wholesalers, setWholesalers] = useState([]);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [errors, setErrors] = useState({});
  const [shouldGenerateCode, setShouldGenerateCode] = useState(false);
  const [codeError, setCodeError] = useState(""); // State to store the error message

  const { generateCode } = useGenerateItemCode(); // Use the hook
  const handleImageUpload = (imageUrl) => {
    setProductImage(imageUrl);
  };
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
    const { color, ...rest } = formData;

    const bundledData = {
      ...rest,
      purchaseDate,
      productImage, // Add the product image URL
    };

    console.log("Bundled Data:", bundledData);
    return bundledData;
  };

  const handleGenerateCode = () => {
    const bundledData = bundleData(); // Get the bundled data
    console.log("Bundled Data for Code Generation:", bundledData); // Log bundled data
    setCodeError(""); // Clear any existing errors

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
      setCodeError(
        "Failed to generate product code. Please check your inputs."
      );
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

  useEffect(() => {
    const submitData = async () => {
      if (!shouldSubmit) return;
      console.log("Preparing to submit data...");
      const bundledData = bundleData(); // Prepare the data to send
      console.log("Submitting data:", bundledData);

      try {
        const response = await addGood(bundledData); // Call the API
        console.log("Good added successfully:", response);
        // Optionally reset the form or show a success message
      } catch (error) {
        console.error("Error adding good:", error);
        alert("An error occurred while adding the good.");
      } finally {
        setShouldSubmit(false); // Reset submission trigger
      }
    };

    submitData();
  }, [shouldSubmit]);

  return (
    <Form.Root className="p-6 bg-white space-y-6">
      {/* Sticky Add Item Header */}
      <div className="flex justify-between shadow-sm w-full items-center p-4 bg-white border-b border-gray-300 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">Add Item</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => {
              // Handle cancel logic here
              console.log("Cancel clicked");
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => setShouldSubmit(true)} // Trigger submission
            className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* General Information Section */}
        <div className="p-4 lg:w-1/2 border rounded-md shadow-sm bg-gray-50">
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
        </div>

        {/* Calendar and Image Section */}
        <div className="grid lg:w-1/2 grid-cols-1 gap-4">
          {/* Calendar Section */}
          <CalendarSection
            purchaseDate={purchaseDate}
            handleDateChange={handleDateChange}
          />

          {/* Uploader Section */}
          <div className="p-4 border rounded-md shadow-sm bg-gray-50">
            <Uploader onImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col lg:flex-nowrap gap-6 mt-6 items-stretch">
        {/* Wholesaler & Pricing Section */}
        <div className="flex-1 min-w-0 p-4 border rounded-md shadow-sm bg-gray-50 max-w-[600px]">
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
                  min="0" // Prevent negative values
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
            <Form.Field className="mb-4 space-x-4" name="wholesalerName">
              <Form.Label>Wholesaler Name</Form.Label>
              <Select.Root
                value={formData.wholesalerName}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, wholesalerName: value }))
                }
              >
                <Select.Trigger variant="surface" radius="full" />
                <Select.Content className="width-32">
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
        <div className="flex-1 min-w-0 p-4 border rounded-md shadow-sm bg-gray-50 max-w-[600px]">
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
              required

                className="w-full h-10 p-2 border rounded-lg text-gray-800"
                type="number"
                placeholder="Enter number of variants"
                value={formData.numItems || ""} // Bind to formData
                min="0" // Prevent negative values
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, numItems: e.target.value }))
                }
              />
            </Form.Control>
          </Form.Field>

          {/* Colors Section */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Colors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {colors.map(({ name, colorCode }) => (
                <div key={name} className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.colors && formData.colors.includes(name)} // Check if the color is already selected
                    onCheckedChange={(isChecked) =>
                      handleColorChange(name, isChecked)
                    } // Handle change
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colorCode }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes Section */}
          <div>
            <h3 className="text-md font-semibold mb-2">Sizes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.sizes?.includes(size)} // Safely check if the size is selected
                    onCheckedChange={(isChecked) =>
                      handleSizeChange(size, isChecked)
                    } // Handle change
                  />
                  <span>{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Item Code Section */}
      <div className="p-4 border rounded-md shadow-sm bg-gray-50">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Item Code</h2>
        <div className="flex flex-col lg:flex-row items-center gap-4 mt-4">
          <Form.Field name="productCode" className="flex-grow">
            <Form.Control asChild>
              <div className="w-full p-2 border rounded-lg text-gray-800 bg-gray-100">
                {formData.productCode || "No code available"}
              </div>
            </Form.Control>
          </Form.Field>
          <div className="flex gap-2">
            {codeError && <p className="text-sm text-red-500">{codeError}</p>}{" "}
            {/* Display error here */}
            <button
              type="button"
              className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600"
              onClick={handleGenerateCode} // Trigger code generation
            >
              Generate Code
            </button>
          </div>
        </div>
      </div>
    </Form.Root>
  );
};

export default DynamicForm;

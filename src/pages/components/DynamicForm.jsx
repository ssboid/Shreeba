import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { Checkbox, Grid, Text, Select } from "@radix-ui/themes";
import CalendarSection from "./CalendarSection";
import { getWholesalers } from "../../services/wholesalersApi";
import useGenerateItemCode from "../../hooks/useGenerateItemCode";
const DynamicForm = ({ sections, itemCodeActions }) => {
  const [purchaseDate, setPurchaseDate] = useState("");
  const [wholesalers, setWholesalers] = useState([]);

  const [formData, setFormData] = useState({
    description: "",
    productCode: "",
    wholesalerName: "1", // Default value from the select dropdown
    numberOfVariants: "",
    colors: [],
    sizes: []
  });

  useEffect(() => {
    // Fetch wholesalers data from API
    const fetchWholesalers = async () => {
      try {
        const data = await getWholesalers();
        setWholesalers(data); // Store wholesalers in state
      } catch (error) {
        console.error("Error fetching wholesalers:", error);
      }
    };

    fetchWholesalers();
  }, []);

  const handleDateChange = (date) => {
    setPurchaseDate(date);
    console.log("Selected Date:", date);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox selection for colors and sizes
  const handleCheckboxChange = (checked, type, value) => {
    setFormData((prevData) => {
      const updatedArray = checked
        ? [...prevData[type], value]
        : prevData[type].filter((item) => item !== value);
      return {
        ...prevData,
        [type]: updatedArray,
      };
    });
  };
  const productCode = useGenerateItemCode(
    formData.wholesalerName,
    purchaseDate,
    formData.costPrice,
    formData.markedPrice,
    formData.numberOfVariants
  );

  useEffect(() => {
    setFormData((prev) => ({ ...prev, productCode }));
  }, [productCode]);

  // Submit handler to display the form data
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Data Submitted: " + JSON.stringify(formData, null, 2));
  };

  return (
    <Form.Root className="p-6 bg-white space-y-6" onSubmit={handleSubmit}>
      <div
        className="flex justify-between shadow-sm items-center p-4 bg-white border-b border-gray-300 sticky top-0 z-10"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <h1 className="text-xl font-semibold text-gray-800">Add Item</h1>
        <div>
          <button
            type="button"
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
          >
            Save Item
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
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    className="w-full h-10 p-2 border rounded-lg text-gray-800"
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                  />
                )}
              </Form.Control>
            </Form.Field>
          ))}
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
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        ))}
        {/* New Wholesaler Name Dropdown */}
        <Form.Field className="mb-4" name="wholesalerName">
          <Form.Label className="text-[15px] font-medium mr-4 leading-[35px] text-gray-800">
            Wholesaler Name
          </Form.Label>
          <Select.Root
            value={formData.wholesalerName}
            onValueChange={(value) =>
              setFormData({ ...formData, wholesalerName: value })
            }
          >
            <Select.Trigger variant="surface" radius="full" />
            <Select.Content>
              {wholesalers.map((wholesaler) => (
                <Select.Item key={wholesaler.id} value={wholesaler.id}>
                  {wholesaler.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Form.Field>
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
              value={formData.numberOfVariants || ""}
              onChange={handleInputChange}
            />
          </Form.Control>
        </Form.Field>

        {/* Colors Section */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Colors</h3>
          <Grid columns="5" display="inline-grid" gap="2">
            {["indigo", "cyan", "orange", "crimson", "gray"].map((color) => (
              <div className="flex items-center gap-2" key={color}>
                <Checkbox
                  checked={formData.colors.includes(color)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "colors", color)
                  }
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            ))}
          </Grid>
        </div>

        {/* Sizes Section */}
        <div>
          <h3 className="text-md font-semibold mb-2">Sizes</h3>
          <Grid columns="5" display="inline-grid" gap="2">
            {["S", "M", "L", "XL", "2XL"].map((size) => (
              <div className="flex items-center gap-2" key={size}>
                <Checkbox
                  checked={formData.sizes.includes(size)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "sizes", size)
                  }
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
                value={formData.productCode || ""}
                onChange={handleInputChange}
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
            onClick={itemCodeActions.onSave}
          >
            Save Manual
          </button>
        </div>
      </div>
    </Form.Root>
  );
};

export default DynamicForm;

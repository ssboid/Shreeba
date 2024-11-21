import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import CalendarSection from "./CalendarSection";

const DynamicForm = ({ sections, itemCodeActions }) => {
  const [purchaseDate, setPurchaseDate] = useState("");

  const handleDateChange = (date) => {
    setPurchaseDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <Form.Root className="p-6 bg-white rounded shadow-md space-y-6">
      {/* Add Item Header */}
      <div className="flex justify-between items-center mb-6">
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

      <div className="grid grid-cols-2 gap-6">
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
                  />
                ) : (
                  <input
                    className="w-full h-10 p-2 border rounded-lg text-gray-800"
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
              </Form.Control>
              {field.name === "description" && (
                <p className="mt-1 text-sm text-left text-orange-500">
                  Tip: Write a description to generate filtering tags for your product.
                </p>
              )}
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
              />
            </Form.Control>
          </Form.Field>
        ))}
      </div>

      {/* Variants Section */}
      <div className="p-4 border rounded-md shadow-sm bg-gray-50">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Variants: Colors, Sizes
        </h2>
        {sections[2].fields.map((field, index) => (
          <Form.Field key={index} className="mb-4" name={field.name}>
            <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-800">
              {field.label}
            </Form.Label>
            <Form.Control asChild>
              <input
                className="w-full h-10 p-2 border rounded-lg text-gray-800"
                type={field.type}
                placeholder={field.placeholder}
              />
            </Form.Control>
          </Form.Field>
        ))}
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

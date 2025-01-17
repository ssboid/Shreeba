import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { Checkbox, Grid, Text, Select } from "@radix-ui/themes";
import CalendarSection from "./CalendarSection";
import { getGoodById, updateGood } from "../../services/goodsApi";
import { getWholesalers } from "../../services/wholesalersApi";
import Uploader from "../Uploader";
import { showToast } from "../../utils/toastUtils";
import { useParams, useNavigate } from "react-router-dom";

const EditGoodForm = ({ sections }) => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [purchaseDate, setPurchaseDate] = useState("");
  const [productImage, setProductImage] = useState("");
  const [wholesalers, setWholesalers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchGoodData = async () => {
      try {
        const good = await getGoodById(id); // Fetch the good by ID
        setFormData(good);
        setPurchaseDate(good.purchaseDate || "");
        setProductImage(good.productImage || "");
      } catch (error) {
        console.error("Error fetching good data:", error);
        showToast("Failed to fetch item details.", "error");
        navigate(-1); // Navigate back on error
      } finally {
        setLoading(false);
      }
    };

    const fetchWholesalers = async () => {
      try {
        const data = await getWholesalers();
        setWholesalers(data); // Fetch wholesalers for dropdown
      } catch (error) {
        console.error("Error fetching wholesalers:", error);
      }
    };

    fetchGoodData();
    fetchWholesalers();
  }, [id, navigate]);

  const handleSubmit = async () => {
    const updatedData = {
      ...formData,
      purchaseDate,
      productImage,
    };

    try {
      await updateGood(id, updatedData); // Update the good
      showToast("Item updated successfully!", "success");
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error("Error updating good:", error);
      showToast("Failed to update item.", "error");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form.Root className="p-6 bg-white space-y-6">
      <div className="flex justify-between shadow-sm w-full items-center p-4 bg-white border-b border-gray-300 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">Edit Item</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => navigate(-1)} // Cancel and go back
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600"
            onClick={handleSubmit} // Submit updated data
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* General Information Section */}
        <div className="p-4 w-full border rounded-md shadow-sm bg-gray-50">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            General Information
          </h2>
          {sections[0].fields.map((field, index) => (
            <Form.Field key={index} className="mb-4" name={field.name}>
              <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-800">
                {field.label}
              </Form.Label>
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
            </Form.Field>
          ))}
        </div>

        {/* Calendar and Image Section */}
        <div className="grid w-full grid-cols-1 gap-4">
          <CalendarSection
            purchaseDate={purchaseDate}
            handleDateChange={setPurchaseDate}
          />
          <Uploader onImageUpload={setProductImage} />
        </div>
      </div>

      {/* Wholesaler & Pricing Section */}
      <div className="p-4 border rounded-md shadow-sm bg-gray-50">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Wholesaler & Pricing
        </h2>
        {sections[1].fields.map((field, index) => (
          <Form.Field key={index} className="mb-4" name={field.name}>
            <Form.Label className="text-[15px] font-medium leading-[35px] text-gray-800">{field.label}</Form.Label>
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
        {/* Wholesaler Dropdown */}
        <Form.Field className="mb-4" name="wholesalerName">
          <Form.Label>Wholesaler Name</Form.Label>
          <Select.Root
            value={formData.wholesalerName || ""}
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

      {/* Variants Section */}
      {/* <div className="p-4 border rounded-md shadow-sm bg-gray-50">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Variants</h2>
        Additional Fields as Needed
      </div> */}
    </Form.Root>
  );
};

export default EditGoodForm;

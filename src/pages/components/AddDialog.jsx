import React from "react";
import { Dialog, Button } from "@radix-ui/themes";
import DynamicForm from "./DynamicForm"; // Assuming DynamicForm is in the same folder

const AddDialog = ({ sections, itemCodeActions }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="border border-primaryOrange text-primaryOrange hover:bg-primaryOrange hover:text-white font-medium rounded-full px-4 py-2 transition-colors duration-150">
          Add Goods
        </button>
      </Dialog.Trigger>

      <Dialog.Content
        maxWidth="1200px"
        style={{
          padding: "20px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <DynamicForm sections={sections} itemCodeActions={itemCodeActions} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddDialog;

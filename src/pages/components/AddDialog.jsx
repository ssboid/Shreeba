import React from 'react';
import { Dialog, Button } from '@radix-ui/themes';
import DynamicForm from './DynamicForm'; // Assuming DynamicForm is in the same folder

const AddDialog = ({ sections, itemCodeActions }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger >
        <Button radius="full"  variant="outline" className="mb-4 border-orange-500 pointer"
         style={{
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          Add
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        maxWidth="700px"
        style={{
          padding: '20px',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <DynamicForm sections={sections} itemCodeActions={itemCodeActions} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddDialog;

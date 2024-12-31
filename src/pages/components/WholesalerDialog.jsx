import React from 'react';
import { Dialog, Button } from '@radix-ui/themes';
import WholesalerForm from './WholesalerForm'; // Import the WholesalerForm component

const WholesalerDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          radius="full"
          variant="outline"
          className="mb-4 border-orange-500 pointer"
          style={{
            marginBottom: '20px',
            cursor: 'pointer',
          }}
        >
          Add Wholesaler
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
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Wholesaler Form</h2>
        <WholesalerForm />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default WholesalerDialog;

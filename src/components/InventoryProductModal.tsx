import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, Input } from '@chakra-ui/react';
import { Product } from '../components/InventoryProductTable/InventoryProductTableTypes';

interface InventoryProductModalProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onClose: () => void;
}

const InventoryProductModal: React.FC<InventoryProductModalProps> = ({ product, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalBody>
          <Input name="name" value={editedProduct.name} onChange={handleChange} placeholder="Name" mb={2} />
          <Input name="category" value={editedProduct.category} onChange={handleChange} placeholder="Category" mb={2} />
          <Input name="price" value={editedProduct.price} onChange={handleChange} placeholder="Price" mb={2} />
          <Input name="quantity" value={editedProduct.quantity} onChange={handleChange} placeholder="Quantity" mb={2} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={() => onSave(editedProduct)}>Save</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InventoryProductModal;

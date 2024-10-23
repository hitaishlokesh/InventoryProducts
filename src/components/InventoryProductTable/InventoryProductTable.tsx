import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Product } from '../InventoryProductTable/InventoryProductTableTypes';

interface InventoryProductTableProps {
  products: Product[];
  isAdmin: boolean;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onDisable: (index: number) => void;
}

const InventoryProductTable: React.FC<InventoryProductTableProps> = ({ products, isAdmin, onEdit, onDelete, onDisable }) => (
  <React.Fragment>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Category</Th>
          <Th>Price</Th>
          <Th>Quantity</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product, index) => (
          <Tr key={index} opacity={product.disabled ? 0.5 : 1}>
            <Td>{product.name}</Td>
            <Td>{product.category}</Td>
            <Td>{product.price}</Td>
            <Td>{product.quantity}</Td>
            <Td>
              {isAdmin ? (
                <>
                  <IconButton
                    aria-label="Edit Product"
                    icon={<FaEdit />}
                    onClick={() => onEdit(index)}
                    isDisabled={product.disabled}
                  />
                  <IconButton
                    aria-label="Delete Product"
                    icon={<FaTrash />}
                    onClick={() => onDelete(index)}
                  />
                  <IconButton
                    aria-label="Disable Product"
                    icon={<FaEye />}
                    onClick={() => onDisable(index)}
                  />
                </>
              ) : (
                <IconButton aria-label="View Product" icon={<FaEye />} isDisabled />
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </React.Fragment>
);

export default InventoryProductTable;

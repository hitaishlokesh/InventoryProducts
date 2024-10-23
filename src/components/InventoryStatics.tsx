import React from 'react';
import { SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

interface InventoryStatisticsProps {
  totalProducts: number;
  totalStoreValue: number;
  outOfStock: number;
  categories: number;
}

const InventoryStatistics: React.FC<InventoryStatisticsProps> = ({ totalProducts, totalStoreValue, outOfStock, categories }) => (
  <SimpleGrid columns={4} spacing={10} mb={5}>
    <Stat>
      <StatLabel>Total Products</StatLabel>
      <StatNumber>{totalProducts}</StatNumber>
    </Stat>
    <Stat>
      <StatLabel>Total Store Value</StatLabel>
      <StatNumber>${totalStoreValue}</StatNumber>
    </Stat>
    <Stat>
      <StatLabel>Out of Stock</StatLabel>
      <StatNumber>{outOfStock}</StatNumber>
    </Stat>
    <Stat>
      <StatLabel>Categories</StatLabel>
      <StatNumber>{categories}</StatNumber>
    </Stat>
  </SimpleGrid>
);

export default InventoryStatistics;

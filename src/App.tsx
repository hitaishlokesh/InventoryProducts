import React, { useEffect, useMemo, useState } from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import InventoryProductTable from './components/InventoryProductTable/InventoryProductTable';
import EditProductModal from './components/InventoryProductModal';
import InventoryStatics from './components/InventoryStatics';
import Navbar from './components/NavBar';
import { Product } from './components/InventoryProductTable/InventoryProductTableTypes';
import axios from 'axios';

const initialProducts: Product[] = [
  { name: "Bluetooth", category: "Electronic", price: "$150", quantity: 5, value: "$30" },
  { name: "Edifier M43560", category: "Electronic", price: "$0", quantity: 0, value: "$0" },
  { name: "Sony 4k ultra 55 inch TV", category: "Electronic", price: "$1190", quantity: 17, value: "$70" },
  { name: "Samsumg 55 inch TV", category: "Electronic", price: "$600", quantity: 50, value: "$12" },
  { name: "Samsung S34 Ultra", category: "phone", price: "$0", quantity: 0, value: "$0" }
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const totalProducts = useMemo(() => products.length, [products]);
  const totalStoreValue = useMemo(
    () => products.reduce((acc, product) => acc + parseFloat(product.value.replace('$', '')), 0),
    [products]
  );
  const outOfStock = useMemo(() => products.filter(p => p.quantity === 0).length, [products]);
  const categories = useMemo(() => new Set(products.map(product => product.category)).size, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory'); //Data was not loading a few times
        setProducts(response.data);
      } catch (err) {
        console.error('Data wasnt available')
      }
    };

    fetchProducts();
  }, []);


  const handleEdit = (index: number) => setEditingProduct({ ...products[index], index });

  const handleSaveEdit = (updatedProduct: Product) => {
    const newProducts = [...products];
    newProducts[updatedProduct?.index] = updatedProduct;
    setProducts(newProducts);
    setEditingProduct(null);
  };

  const handleDelete = (index: number) => setProducts(products.filter((_, i) => i !== index));

  const handleDisable = (index: number) => {
    const newProducts = [...products];
    newProducts[index].disabled = !newProducts[index].disabled;
    setProducts(newProducts);
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

        <Heading mb={4}>Inventory Management</Heading>

        <InventoryStatics
          totalProducts={totalProducts}
          totalStoreValue={totalStoreValue}
          outOfStock={outOfStock}
          categories={categories}
        />

        <InventoryProductTable
          products={products}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDisable={handleDisable}
        />

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onSave={handleSaveEdit}
            onClose={() => setEditingProduct(null)}
          />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;

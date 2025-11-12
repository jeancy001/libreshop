import React, { useEffect, useState } from 'react';
import { Product } from '../constants/Product';
import ProductList from '../components/ProductsList';
import axios from 'axios';
import { API_URL } from '../constants/API_URL';
import BannerPage from '../components/BannerPage';
import { Pubs } from '../constants/Pub';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pubs, setPubs] = useState<Pubs[]>([]);
  const [search, setSearch] = useState<string>(''); // 🔍 search state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and pubs
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/`);
        setProducts(response.data.products);
      } catch (err: unknown) {
        console.log(err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    const getAllPubs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/pub/`);
        setPubs(response.data.pub);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch Pubs');
      }
    };

    fetchProducts();
    getAllPubs();
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Check if no products match the search
  const noResults = search && filteredProducts.length === 0;

  // Loading and error handling
if (loading)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <SearchBar search={search} setSearch={setSearch} /> {/* Pass state */}
      <BannerPage pub={pubs} />

      {noResults ? (
        <div className=" text-center text-gray-600 p-8">
          No products found for "{search}"
        </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default Home;

import { useEffect, useState } from 'react';
import CardComponents from '@/components/Product/CardComponents';

function Index() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);  
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
      {products.map((product) => (
        <CardComponents key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Index;

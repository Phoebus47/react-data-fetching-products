import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('กำลังดึงข้อมูลสินค้า...');
      const response = await axios.get('http://localhost:4001/products');
      console.log('ข้อมูลสินค้าที่ได้รับ:', response.data);
      
      const productsData = Array.isArray(response.data) ? response.data : 
                          (response.data.data ? response.data.data : []);
      
      console.log('ข้อมูลสินค้าที่จะใช้:', productsData);
      setProducts(productsData);
    } catch (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
      setError('Fetching Error...');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      console.log('กำลังลบสินค้า ID:', productId);
      await axios.delete(`http://localhost:4001/products/${productId}`);
      console.log('ลบสินค้าสำเร็จ');
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (err) {
      console.error('เกิดข้อผิดพลาดในการลบสินค้า:', err);
      setError('Fetching Error...');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <h1>รายการสินค้า</h1>
      {!Array.isArray(products) || products.length === 0 ? (
        <div className="no-products">ไม่พบสินค้า</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <button 
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                x
              </button>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p className="price">ราคา: {product.price} บาท</p>
              <p className="description">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 
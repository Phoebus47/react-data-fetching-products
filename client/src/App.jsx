import "./App.css";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]); // เปลี่ยนค่าเริ่มต้นเป็นอาร์เรย์

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products"); // ใช้ await
      console.log(result.data);
      setProducts(result.data.data); // ตั้งค่าข้อมูลที่ดึงมา
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`); // ใช้ await
      getProducts(); // เรียกใช้ getProducts เพื่อดึงข้อมูลใหม่
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }; 
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((item) => ( // ใช้ .map เพื่อวนลูปแสดงสินค้า
          <div className="product" key={item.id}>
            <div className="product-preview">
              <img
                src={item.image || "https://via.placeholder.com/350/350"} // ใช้รูปจาก API หรือ placeholder
                alt={item.name}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>{item.name}</h1>
              <h2>Product price: {item.price} Baht</h2>
              <p>Product description: {item.description}</p>
            </div>

            <button className="delete-button" onClick={() => deleteProduct(item.id)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

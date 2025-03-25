import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [productData, setProductData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(null);

  const getProductData = async () => {
    try {
      setLoadingStatus("loading");
      const response = await axios.get("http://localhost:4001/products");
      setProductData(response.data.data);
      setLoadingStatus("complete");
    } catch (error) {
      setLoadingStatus("failed");
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const newResponse = productData.filter((product) => product.id !== id);
    setProductData(newResponse);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {loadingStatus === "loading" && <h1>Loading...</h1>}
      {loadingStatus === "failed" && <h1>Fetching Error...</h1>}
      {loadingStatus === "complete" &&
        productData.map((product) => {
          return (
            <div className="product-list">
              <div className="product">
                <div className="product-preview">
                  <img
                    src={product.image}
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>

                <div className="product-detail">
                  <h1>Product name: {product.name}</h1>
                  <h2>Product price: {product.price} Baht</h2>
                  <p>Product description: {product.description}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product.id)}
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;

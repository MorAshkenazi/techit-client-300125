import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getAllProducts } from "../services/productsService";
import Product from "../interfaces/Product";
import { getUserById } from "../services/usersService";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  useEffect(() => {
    getUserById()
      .then((res) => {
        setIsAdmin(res.data.isAdmin);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h4 className="display-4 text-center">PRODUCTS</h4>
        {isAdmin && (
          <button
            className="btn btn-success mb-3"
            onClick={() => setShowAdd(true)}
          >
            <i className="fa-solid fa-plus"></i> Add product
          </button>
        )}
        <div className="row">
          {products.length ? (
            products.map((product: Product) => (
              <div
                className="card col-md-3"
                key={product.id}
                style={{ width: "18rem" }}
              >
                <div className="card-header">{product.category}</div>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text text-success">{product.price}₪</p>
                  {!product.quantity && (
                    <p className="text-center text-danger">Out of stock!</p>
                  )}
                  <button
                    className="btn btn-primary"
                    disabled={!product.quantity}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                  </button>
                  {isAdmin && (
                    <>
                      <button className="btn btn-warning mx-1 px-2">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button className="btn btn-danger px-2">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No products</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;

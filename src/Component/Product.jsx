import React, { useEffect, useState } from "react";
import "./Product.css";
import Reciept from "./Reciept/Reciept";
import Overlay from "./overlay-modal/OverlayModal";

const Product = () => {
const [products, setProducts] = useState([])
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [vatTax, setVatTax] = useState(null); 
  const [discount, setDiscount] = useState(null);
  const [isSubTotalChange, setIsSubTotalChange] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("Data/data.json");
    const data = await res.json();
    console.log(data);
    setProducts(data.products)
  }
  useEffect(() => {
    fetchProducts()
  },[]);

  useEffect(() => {
    calculateTotals();
  }, [isSubTotalChange, cart.length]);

  const toggleReceipt = () => {
    setShowReceipt(!showReceipt);
  };

  // Add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += 1;
      setCart([...cart]);
    } else {
      product.quantity = 1;
      setCart([...cart, product]);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.name !== product.name);
    setCart(updatedCart);
  };

  // Increase the quantity of a product in the cart
  const increaseQuantity = (product) => {
    product.quantity += 1;
    setCart([...cart]);
    calculateTotals();
   
  };

  // Decrease the quantity of a product in the cart
  
  const decreaseQuantity = (product) => {
    
    if (product.quantity > 1) {
      product.quantity -= 1;
      setCart([...cart]);
      calculateTotals();

    } else if (product.quantity === 1) {
      const updatedCart = cart.filter((item) => item.name !== product.name);
      setCart(updatedCart);
      calculateTotals();
    }
  };

  // Calculate Sub Total, VAT Tax, Discount, and Total
  const calculateTotals = () => {
    const subTotal = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const totalDiscount = subTotal * (discount / 100);
    const total = subTotal + vatTax / 100 + totalDiscount;
    setSubTotal(total);
    
  };

  // Reset the cart and totals
  const resetCart = () => {
    setCart([]);
    setSubTotal(0);
    setDiscount(0);
    setVatTax(0);
  };

  // Render product cards
  const renderProductList = () => {
    return products.map((product) => {
      return (
        <div
          data-testid={"product_list"}
          onClick={() => {
            calculateTotals();
            addToCart(product);
            setIsSubTotalChange((prev) => !prev);
          }}
          key={product.name}
          className="product-card"
        >
          <img
            className="product_image"
            src={product.image}
            alt={product.name}
          />
          
          <div className="middle">
            <div className="text">${product.price}</div>
            <div className="text">${product.description}</div>
          </div>
         
        </div>
      );
    });
  };

  // Render items in the cart
  const renderCart = () => {
    return cart.map((product) => (
      <div key={product.name} className="cart-item">
        <button className="remove_cart" onClick={() => removeFromCart(product)}>
          X
        </button>
        <img src={product.image} alt={product.name} />
        <div>{product.name}</div>
        <div>${product.price}</div>
        <div>
          <button onClick={() => decreaseQuantity(product)}>-</button>
          {product.quantity}
          <button onClick={() => increaseQuantity(product)}>+</button>
        </div>
        <div>${(product.price * product.quantity).toFixed(2)}</div>
       
        {console.log("====== showRe", showReceipt)}
      </div>
    ));
  };

  // Validation for not exceed the data
  const validateForNotExceed = (value, setValue) => {
    console.log("======= value from test", value, value < 0);
    if (value > 100) {
      alert("not exceed 100%");
      return;
    } else if (value < 0) {
      alert("not be less than 0%");
      return;
    } else {
      setValue(parseFloat(+value));
    }
  };

  return (
    <div className="app-container">
    {showReceipt && <Overlay />}
    {showReceipt && (
            <Reciept
              subTotal={subTotal}
              vatTax={vatTax}
              discount={discount}
              cart={cart}
              toggleReceipt={toggleReceipt}
              showReceipt={showReceipt}
            />
          )}
      <div className="cart">
        <nav>
          <h5>PRODUCTS</h5>
          <h5>PRICE</h5>
          <h5>QUANTITY</h5>
          <h5>TOTAL</h5>
        </nav>
        {cart.length === 0 && (
          <div className="tagline">THERE ARE NO PRODUCTS</div>
        )}
        {renderCart()}
        <div className="sidebar_section_menu">
        <div className="totals">
          <div>
            <input value={"Sub Total"} disabled />
            <input className="template_input" value={subTotal.toFixed(2)} />
          </div>
          <div></div>

          <div>
            <input value={"VAT Tax:"} disabled />
            <input
            className="template_input"
              data-testid={"vat-input"}
              type="number"
              value={vatTax}
              placeholder="%"
              onChange={(e) => validateForNotExceed(e.target.value, setVatTax)}
            />
            <span className="cart_reciept"> ${vatTax ? (subTotal * (vatTax / 100)).toFixed(2) : 0} </span>
          </div>
          <div>
            <input value={"Discount:"} disabled />
            <input
            className="template_input"
              data-testid={"discount-input"}
              type="number"
              value={discount}
              placeholder="%"
              onChange={(e) =>
                validateForNotExceed(e.target.value, setDiscount)
              }
            />
            <span className="cart_reciept">${discount ? (subTotal * (discount / 100)).toFixed(2) : 0} </span>
          </div>
          <div>
            
            <input value={"Total:"} disabled />
            <input
            className="template_input"
              value={
                vatTax
                  ? (
                      subTotal +
                      subTotal * (vatTax / 100) -
                      subTotal * (discount / 100)
                    ).toFixed(2)
                  : subTotal
              }
            />
          </div>
        </div>
        <div className="cart-buttons">
          <button className="red_btn" onClick={() => resetCart()}>
            CANCEL SALE
          </button>
          <button className="green_btn" onClick={() => toggleReceipt()}>
            PROCESS SALE
          </button>
        </div>
        </div>
        <div>
        </div>
      </div>
      <div data-testid={"dataTestId"} className="product-list">
        {renderProductList()}
      </div>
    </div>
  );
};

export default Product;

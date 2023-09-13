import "./receipt.css";

const Reciept = ({
  subTotal,
  vatTax,
  discount,
  cart,
  toggleReceipt,
}) => {
  const totalQty = (cart) => {
    let qty = 0;
    cart?.forEach((element) => {
      qty += element.quantity;
    });
    return qty
  };
  return (
    <div className="receipt-modal">
      {/* {showReceipt && <Overlay />} */}
      <div className="receipt-content reciept">
        <h3 className="reciept_header">Receipt</h3>
        <div className="">Sale No: 00102 </div>
        <div className="reciept_tags">
          <h5>#</h5>
          <h5>Products</h5>
          <h5>Quantity</h5>
          <h5>Total</h5>
        </div>

        {/* Display receipt details here */}
        {cart.map((product) => (
          <div className="product_main" key={product.name}>
            <p>
              {product.name} * {product.quantity} - $
              {product.price * product.quantity?.toFixed(2)}
            </p>
            {/* <hr></hr> */}
          </div>
        ))}

        {/* <p>Sub Total: ${subTotal.toFixed(2)}</p> */}
        <div className="main_reciept_tag">
          <p className="total_reciept">
            Total Items: {totalQty(cart)} $
            {(
              subTotal +
              subTotal * (vatTax / 100) -
              subTotal * (discount / 100)
            ).toFixed(2)}
          </p>

          <p className="disc_reciept">
            Discount: ${(subTotal * (discount / 100)).toFixed(2)}
          </p>
          <p className="vat_reciept">
            VAT Tax: ${(subTotal * (vatTax / 100)).toFixed(2)}
          </p>
        </div>

        {/* Loop through cart items and display details */}

        <button className="close_btn" onClick={() => toggleReceipt()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Reciept;

import {Fragment} from "react";
import {useSelector} from "react-redux";
import Metadata from "../components/metadata";


export default ({history}) => {

  const {cartitems,shippinginfo} = useSelector(state=>state.cart);

  const handleconfirm = (e) => {
    e.preventDefault();


    history.push("/payment");
  }

  const data = {
    address:shippinginfo.address,
    city:shippinginfo.city,
    country:shippinginfo.country,
    postalcode:shippinginfo.postalcode,
    amount:cartitems.reduce((accumulator,item) => (accumulator + item.price*item.quantity ),0).toFixed(2)
  }

  sessionStorage.setItem('billinginfo',JSON.stringify(data));





  return (
    <Fragment>
      <Metadata title="order details" />
      <div className="container container-fluid mt-5">
      <div className="row">
        <div className="col-md-8">
        <div className="card">
          <div className="card-header">
          <strong><p style={{color:"orange"}}>Order Details</p></strong>
          </div>
          <div className="card-title">
          <h4 className="confirm-order-title">Address details</h4>
          <p>{shippinginfo.address}</p>
          <p>{shippinginfo.city}</p>
          <p>{shippinginfo.country}</p>
          <p>{shippinginfo.phonenumber}</p>
          </div>
          <div className="card-body">
          <h4 className="confirm-order-title">Products</h4>
          {cartitems.map(item=>(
            <div className="row">
            <div className="col-md-3">
            <img src={item.image} className="cart-item-image"/>
            </div>
            <div className="col-md-3">
            <p>{item.name}</p>
            </div>
            <div className="col-md-3">
            <p>${item.price}</p>
            </div>
            <div className="col-md-3">
            <p>{item.quantity}</p>
            </div>
            </div>
          ))}
          </div>
          </div>
        </div>
        <div className="col-md-4 mt-5">
          <p><span>net payable: ${cartitems.reduce((accumulator,item) => (accumulator + item.price*item.quantity ),0).toFixed(2)}</span></p>
          <button onClick={handleconfirm} className="btn btn-primary btn-lg">Confirm Order</button>
        </div>
        </div>
        </div>
    </Fragment>
  )
}

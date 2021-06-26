import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {Fragment} from "react";

import {addtocart,deletefromcart} from "../action/cartaction";
import Metadata from "../components/metadata";
export default ({history}) => {

  const {cartitems} = useSelector(state=>state.cart);
  let start_price = 0;
  const items = [...cartitems];
  const dispatch = useDispatch();


  const decreasequantity = (id,quantity) => {
    if(quantity - 1<=0)
    {
      return;
    }

    quantity-=1;
    dispatch(addtocart(id,quantity));


  }

  const increasequantity = (id,quantity,stock) => {
      if(quantity + 1 > stock) return;

      quantity+=1;

      dispatch(addtocart(id,quantity));

  }

  const deleteitem = (id) => {

    dispatch(deletefromcart(id));
  }

  const checkout = () => {
    history.push("/shipping");
  }
  return (
    <Fragment>
    {cartitems.length===0?<h1>Your cart is empty</h1>:
      <Fragment>
      <Metadata title="cart" />
      <div className="container-fluid">
      <h1>Your cart has {cartitems.length} items</h1>
      <div className="row">
      <div className="col-md-8 mt-5">

      {cartitems.map(item=>(
        <div className="row">
        <div className="col-md-3"><img src={item.image} className="cart-item-image"/></div>
        <div className="col-md-3"><Link to={`/product/${item.product}`} className="link" style={{textDecoration: "none"}}><h4>{item.name}</h4></Link></div>
        <div className="col-md-3"><p>${item.price}</p></div>
        <div className="col-md-3"><button onClick={() => decreasequantity(item.product,item.quantity)} className="btn btn-primary btn-sm add_button">-</button>
        <input type="number" value={item.quantity} className="cart-quantity"/>
        <button onClick={() => increasequantity(item.product,item.quantity,item.stock)} className="btn btn-primary btn-sm add_button">+</button><span onClick={() => deleteitem(item.product)} className="delete_item fas fa-trash-alt"></span></div>


        {item.product!==cartitems[cartitems.length-1].product?<hr />:<></>}
        </div>
      ))}
      </div>
      <div className="col-md-4">
      <div className="cart-amount">
        <h3>Order Summary</h3>
        <br />
        <h5>Subtotal:{cartitems.reduce((accumulator,item)=>(accumulator+item.quantity),0)} units</h5>
        <h5>Amount to be paid:<span>${cartitems.reduce((accumulator,item) => (accumulator + item.price*item.quantity ),0).toFixed(2)}</span></h5>

        <button onClick={checkout} className="btn btn-primary btn-lg" style={{backgroundColor:"orange",borderWidth:"0px"}}>proceed to Checkout</button>
      </div>
      </div>
      </div>
      </div>


      </Fragment>
    }
    </Fragment>
  )
}

import {Fragment} from "react";
import {useSelector} from "react-redux";

export default () => {

  const {orders} = useSelector(state=>state.order);

  return(
    <Fragment>

    <div className="conatiner-fluid mt-5">
    <h1>Orders</h1>
    {orders.map((order) => (
      <div className="card">

      <div className="card-header">
          <h3>${order.totalPrice}</h3>
          <p>{order.orderStatus}</p>
      </div>

        <div className="card-body">

          {order.orderItems.map((item)=>(
            <div className="row">
            <div className="col-md-3">
              <img src={item.image} className="cart-item-image" />
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
    ))}

    </div>


    </Fragment>
  )
}

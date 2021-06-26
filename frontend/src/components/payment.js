
import {Fragment,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {useStripe,useElements,CardNumberElement,CardExpiryElement,CardCvcElement} from "@stripe/react-stripe-js"
import axios from "axios"
import store from "../store";
import lookup from "country-code-lookup"
import {clearcart} from "../action/cartaction";
import Metadata from "../components/metadata";
import {createneworder} from "../action/orderaction";
const options = {
  style :{
    base:{
      fontSize: "16px"
    },
    invalid:{
      color:"red"
    }

  }
}
export default ({history}) => {
  const {cartitems,shippinginfo} = useSelector(state=>state.cart);
  const {user,loading} = useSelector(state=>state.user);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const submithandler = async (e) => {
    e.preventDefault();

    const data = JSON.parse(sessionStorage.getItem('billinginfo'));



    const paymentdata = {
      amount:Math.round(data.amount*100),

    }



    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post("/api/v1/payment/process",paymentdata,config);

    const client_secret = res.data.client_secret

    if(!stripe || !elements)
    {
      return;
    }



    const result = await stripe.confirmCardPayment(client_secret,{
      payment_method:{
        'card':elements.getElement(CardNumberElement),
        billing_details:{
          address:{
            city:data.city,
            country:lookup.byCountry(data.country).fips,
            postal_code:data.postalcode,
            line1:data.address
          },
          name:user.username,
          email:user.email,

        }
      }
    });

    if(result.error)
    {
        await alert(result.error.message);
    }
    else{
      if(result.paymentIntent.status==='succeeded')
      {
        await alert("success");

        const orderinfo = {
          shippingInfo:{
            address:shippinginfo.address,
            city:shippinginfo.city,
            country:shippinginfo.country,
            postalCode:shippinginfo.postalcode,
            phoneNo:shippinginfo.phonenumber
          },
          totalPrice:Math.round(data.amount),
          orderItems:cartitems,
          paymentInfo:{
            status:'success',
            id:client_secret
          }
        }
        const config = {
          headers:{
            'Content-Type': 'application/json',
          }
        }

        const {result} = await axios.post("api/v1/order/new",orderinfo,config);

        localStorage.removeItem('cartitems');
        dispatch(clearcart());


        history.push("/");
      }
      else{
        await alert("something gone wrong try again");
      }
    }



  }

  return (
    <Fragment>
    <Metadata title="Payment" />
      <div className="conatiner container-fluid mt-5  justify-content-center">
      <div className="card ">
          <div className="card-header">
            <p>card details</p>
          </div>
          <div className="card-body">
          <label for="cardnumber">Card Number</label>
          <CardNumberElement type="text" id="cardnumber" className="form-control" options={options} required/>
          <label for="card-expiry">Card Expiry</label>
          <CardExpiryElement type="text" className="form-control" id="card-expiry" options={options} required/>
          <label for="card-cvv">Cvv</label>
          <CardCvcElement type="text" className="form-control" id="card-cvv" options={options} required/>
          </div>

          <div className="card-footer">
            <button onClick={submithandler} className="btn btn-primary">pay ${cartitems.reduce((accumulator,item) => (accumulator + item.price*item.quantity ),0).toFixed(2)}</button>
          </div>
      </div>
      </div>
    </Fragment>
  )
}

import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Header from "./components/header"
import Footer from "./components/footer"
import Home from "./components/home"
import Details from "./components/details"
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import Order from "./components/orders";
import Updateprofile from "./components/update_profile";
import Updatepassword from "./components/update_password";
import Forgot_password from "./components/forgot_password";
import Resetpassword from "./components/resetpassword";
import Shipping from "./components/shipping";
import Cart from "./components/cart";
import ConfirmOrder from "./components/confirmorder";
import Payment from "./components/payment";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js';
import {loaduser} from "./action/useraction";
import {getorderuser} from "./action/orderaction";
import axios from "axios";
import {useEffect,useState} from "react"
import store from "./store";
function App() {
  const [stripeapi,setstripeapi] = useState('');
  useEffect(() => {
    store.dispatch(loaduser());
    store.dispatch(getorderuser());

    async function getstripeapi(){
      const {data} = await axios.get("/api/v1/stripeapi");
      setstripeapi(data.stripeApiKey);
      console.log(stripeapi);
    }

    getstripeapi();
  })

  return (
    <Router>
    <div className="App">
      <Header />
      <div className="container container-fluid">
      <Route path="/" component={Home} exact />
      <Route path="/products/:keyword" component={Home}/>
      <Route path="/product/:id" component={Details} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/profile" component={Profile} />
      <Route path="/edit/profile" component={Updateprofile} exact />
      <Route path="/updatepassword" component={Updatepassword} exact />
      <Route path="/forgotpassword" component={Forgot_password} exact />
      <Route path="/password/reset/:token" component={Resetpassword} exact />
      <Route path="/cart" component={Cart} exact/>
      <Route path="/shipping" component={Shipping} exact />
      <Route path="/order" component={Order} exact />
      <Route path="/confirmorder" component={ConfirmOrder} exact />
      {stripeapi && <Elements stripe={loadStripe(stripeapi)}>
        <Route path="/payment" component={Payment} exact />
        </Elements>
      }
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;

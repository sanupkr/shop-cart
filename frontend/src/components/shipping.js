import {useState,Fragment} from "react";
import {useDispatch,useSelector} from "react-redux";
import {countries} from "countries-list"
import {addshippinginfo} from "../action/cartaction";
export default ({history}) => {


  const countrieslist = Object.values(countries);
  const dispatch = useDispatch();
  const {shippinginfo} = useSelector(state=>state.cart);

  const [address,setaddress] = useState(shippinginfo.address);
  const [city,setcity] = useState(shippinginfo.city);
  const [phonenumber,setphonenumber] = useState(shippinginfo.phonenumber);
   const [country,setcountry] = useState(shippinginfo.country);
   const [postalcode,setpostalcode] = useState(shippinginfo.postalcode);
  const submithandler = (e) => {
    e.preventDefault();

    dispatch(addshippinginfo({address,city,phonenumber,country,postalcode}));

    history.push("/confirmorder");
  }

  return (
    <Fragment>
      <div className="container-fluid mt-5 d-flex justify-content-center">
        <div className="card">
          <div className="card-header">
            <p>Shipping Info</p>
          </div>
          <div className="card-body">
          <form onSubmit={submithandler}>
          <label for="shipping_address">Shipping Address</label>
          <input type="text" className="form-control" value={address} id="shipping_address" required onChange={(e)=>setaddress(e.target.value)} placeholder="Enter shipping address" />
          <label for="city">city</label>
          <input type="text" className="form-control" value={city} required onChange={(e)=>setcity(e.target.value)} id="city" placeholder="Enter the city" />
          <label for="postalCode">Postal Code</label>
          <input type="text" className="form-control" id="postalCode" placeholder="Enter postal code" value={postalcode} onChange={(e)=>setpostalcode(e.target.value)} />
          <label htmlFor="country_field">Country</label>
          <select id="country_field" className="form-control" value={country} onChange={(e) => setcountry(e.target.value)} required>
                                {countrieslist.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>

          <label for="phonenumber">Phone Number</label>
          <input type="Number" required className="form-control" value={phonenumber} onChange={(e)=>setphonenumber(e.target.value)} id="phonenumber" placeholder="Enter your contact Number" />
          <br />
          <button type="submit" className="btn btn-primary btn-lg">Continue</button>
          </form>
          </div>
        </div>
        </div>


    </Fragment>
  )
}

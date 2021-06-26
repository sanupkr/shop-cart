import React,{Fragment,useState} from "react";
import Search from "../components/search"
import {Route,Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import {logoutuser} from "../action/useraction";



export default () => {
  const {user,loading} = useSelector(state=>state.user);
  const {cartitems} = useSelector(state=>state.cart);
  const dispatch = useDispatch();

  const handlelogout = () => {

    dispatch(logoutuser());

  }


  return (
    <Fragment>
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <i className="fab fa-opencart" style={{color:"orange"}}></i>
          <span className="brand-text">Shop-<span className="cart-text">Cart</span></span>
        </Link>
            <Route render={({history})=> <Search history={history}/> }/>
            {user ? <div className="header-options">

                    <div class="dropdown">
                    <Link to="/cart" style={{textDecoration: "none"}} className="header-options-login">cart  <span className="orange-color">{cartitems.length}</span></Link>

                    <img src={loading?``:user.avatar && user.avatar[0].url} className="avatar" />
                      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      {user.username}
                      </a>

                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><Link to={"/profile"} class="dropdown-item">profile</Link></li>
                        <li><Link to={"/order"} class="dropdown-item">orders</Link></li>
                        {user.role ==='admin' && <li><a class="dropdown-item" href="#">Dashboard</a></li>}
                        <li><Link to={"/"} class="dropdown-item" onClick={handlelogout}>logout</Link></li>

                      </ul>
                    </div>
                  </div>:!loading && <div className="header-options">
                    <Link to="/register" className="header-options-login">Sign up</Link>
                    <Link to='/login' className="header-options-login">
                  Log in
                    </Link>
                  </div> }




      </div>
      </nav>


    </Fragment>
  );
}

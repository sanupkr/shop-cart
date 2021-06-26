import {useState,Fragment,useEffect} from "react";
import {loginuser,clearerrors} from "../action/useraction";
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom";
import Metadata from "../components/metadata";
export default ({history}) => {
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const dispatch = useDispatch();

  const {isAuthenticated,loading,error} = useSelector(state =>state.user);


  useEffect(() => {
    if(isAuthenticated)
    {
      history.push("/")
    }

    if(error)
    {
      dispatch(clearerrors());
    }


  },[dispatch,isAuthenticated,history,error])

  const validatelogin = (e) => {

    e.preventDefault();

    dispatch(loginuser(email,password));

  }

  return(
    <Fragment>
    {loading?<div>loading...</div>:
      <Fragment>
      <Metadata title="Login" />
      <div className="card login_card">
      <form onSubmit={validatelogin}>
      <div>
      <label for="email_field">Email</label>
      <input onChange={(e)=>{setemail(e.target.value)}} className="form-control" id="email_field" type="email" placeholder="Enter your email address" />
      </div>
      <div>
      <label for="password_field">Password</label>
      <input onChange={(e)=>{setpassword(e.target.value)}} className="form-control" id="password_field" type="password" placeholder="Enter your password" />
      </div>
      <br />
      <br />
      <button type="submit" className="btn btn-primary btn-lg login_button">Submit</button>
    </form>

    <br />
    <br />
    <Link to={"/forgotpassword"} type="button" className="btn btn-primary">Forgot password?</Link>
    </div>
  </Fragment>}

    </Fragment>
  )
}

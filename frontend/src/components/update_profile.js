import {useSelector,useDispatch} from "react-redux";
import {Fragment,useState} from "react";
import {updateuser} from "../action/useraction";
import Metadata from "../components/metadata";
export default ({history}) => {
  const [username,setusername] = useState('');
  const [email,setemail] = useState('');
  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();

    dispatch(updateuser(username,email));

    history.push('/');
  }


  return (
    <Fragment>
    <Metadata title="update profile" />
    <div className="container-fluid d-flex mt-4 justify-content-center">
    <div className="card">
    <div className="card-body">
    <form onSubmit={handlesubmit}>
    <label for="username">Username</label>
    <input type="text" onChange={(e)=>{setusername(e.target.value)}} className="form-control" id="username" placeholder="Enter the username"/>
    <label for="email_id">Email</label>
    <input type="email" onChange={(e)=>{setemail(e.target.value)}} className="form-control" id="email_id" placeholder="Enter your email" />
    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
    </form>
    </div>
    </div>
    </div>
    </Fragment>
  )
}

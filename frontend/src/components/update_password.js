import {useSelector,useDispatch} from "react-redux";
import {Fragment,useState} from "react";
import {updatepassword} from "../action/useraction";
import Metadata from "../components/metadata";
export default ({history}) => {
  const [oldpassword,setoldpassword] = useState('');
  const [newpassword,setnewpassword] = useState('');
  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();

    dispatch(updatepassword(oldpassword,newpassword));

    history.push('/');
  }


  return (
    <Fragment>
    <Metadata title="update password" />
    <div className="container d-flex mt-4 justify-content-center">
    <div className="card">
    <div className="card-body">
    <form onSubmit={handlesubmit}>
    <label for="oldpassword">old password</label>
    <input type="password" onChange={(e)=>{setoldpassword(e.target.value)}} className="form-control" id="oldpassword" placeholder="Enter the oldpassword"/>
    <label for="newpassword">new password</label>
    <input type="password" onChange={(e)=>{setnewpassword(e.target.value)}} className="form-control" id="newpassword" placeholder="Enter your newpassword" />
    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
    </form>
    </div>
    </div>
    </div>
    </Fragment>
  )
}

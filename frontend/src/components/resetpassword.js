import {useSelector,useDispatch} from "react-redux";
import {Fragment,useState,useEffect} from "react";
import {resetpassword_util} from "../action/useraction";
import Metadata from "../components/metadata";
export default ({history,match}) => {
  const [resetpassword,setresetpassword] = useState('');
  const [confirmresetpassword,setconfirmresetpassword] = useState('');
  const dispatch = useDispatch();
  const token = match.params.token;

  const {loading,error,success} = useSelector(state =>state.resetpassword);

  useEffect(() => {
    if(error)
    {
      alert(error);
    }

    if(success)
    {
      alert("successfully updated");
    }

  },[loading,dispatch,error,success]);


  const handlesubmit = (e) => {
    e.preventDefault();

    dispatch(resetpassword_util(resetpassword,confirmresetpassword,token));

    history.push('/login');
  }


  return (
    <Fragment>
    <Metadata title="Reset password" />
    <div className="container d-flex mt-4 justify-content-center">
    <form onSubmit={handlesubmit}>
    <label for="newpassword">new password</label>
    <input type="password" onChange={(e)=>{setresetpassword(e.target.value)}} className="form-control" id="newpassword" placeholder="Enter the new password"/>
    <label for="confirmpassword">confirm password</label>
    <input type="password" onChange={(e)=>{setconfirmresetpassword(e.target.value)}} className="form-control" id="confirmpassword" placeholder="Enter your confirm password" />
    <button type="submit" disabled={loading?true:false} className="btn btn-primary btn-lg">Submit</button>
    </form>
    </div>
    </Fragment>
  )
}

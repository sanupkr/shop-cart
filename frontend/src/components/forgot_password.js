import {Fragment,useState,useEffect} from "react"
import Metadata from "../components/metadata";
import {useDispatch,useSelector} from "react-redux";
import {clearerrors,forgotpassword} from "../action/useraction";
export default () => {
  const dispatch = useDispatch();

  const [email,setemail]  = useState('');

  const {error,message,loading} = useSelector(state => state.forgotpassword);

  useEffect(() => {
    if(message)
    {
      alert(message);
    }

    if(error)
    {

      dispatch(clearerrors());
    }

  },[dispatch,message,error]);

  const submithandler = (e) => {
    e.preventDefault();

    dispatch(forgotpassword(email));

  }

  return (
    <Fragment>
    <Metadata title="Forgot Password" />
      <div className="conatiner-fluid d-flex mt-4 justify-content-center">
      <div className="card">
        <div className="card-body">
          <div className="card-content">
            <form onSubmit={submithandler}>
              <label for="email_id">Email</label>
              <br />
              <input type="email" className="form-control" id="email_id" onChange={(e)=>{setemail(e.target.value)}} />
              <br />
              <br />

              <button type="submit" disabled={loading?true:false} className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    
      </div>
    </Fragment>
  )
}

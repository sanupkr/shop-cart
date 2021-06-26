import {useState,Fragment,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {registeruser,clearerrors} from "../action/useraction";
import Metadata from "../components/metadata";

export default ({history}) => {
  const dispatch = useDispatch();
  const [username,setusername] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [avatar,setavatar] = useState('');
  const [avatarpreview,setavatarpreview] = useState('');

  const {loading,isAuthenticated,error} = useSelector(state=>state.user);

  useEffect(() => {
    if(isAuthenticated)
    {
      history.push("/");
    }

    if(error)
    {
        dispatch(clearerrors());
    }
  },[dispatch,isAuthenticated,loading,error,history]);

  const registerhandler = (e) => {
      e.preventDefault();
      const userdata = new FormData();
        userdata.set('username', username);
        userdata.set('email', email);
        userdata.set('password', password);
        userdata.set('avatar', avatar);
      dispatch(registeruser(userdata));

  }

  const handleavatar = (e) => {

    const reader = new FileReader();

    reader.onload = () =>
    {
      if(reader.readyState === 2)
      {
        setavatar(reader.result);
        setavatarpreview(reader.result);
      }
    }

    reader.readAsDataURL(e.target.files[0]);

  }



  return(
    <Fragment>
    {loading?<div><h1>loading...</h1></div>:
      <Fragment className="auth_background">
      <Metadata title="Register"/>
      <div className="card login_card">
      <form onSubmit={registerhandler} encType='multipart/form-data'>
      <div>
      <label for="username_field">Username</label>
      <input onChange={(e)=>{setusername(e.target.value)}} className="form-control" type="text" id="username_field" placeholder="Enter username" />
      </div>
      <div>
      <label for="email_field">Email</label>
      <input onChange={(e)=>{setemail(e.target.value)}} className="form-control" id="email_field" type="email" placeholder="Enter your email address" />
      </div>
      <div>
      <label for="password_field">Password</label>
      <input onChange={(e)=>{setpassword(e.target.value)}} className="form-control" id="password_field" type="password" placeholder="Enter your password" />
      </div>
      <div>
      <figure>
      <img src={avatarpreview} className="avatar" alt="" />
      <label for="avatar_field">Avatar</label>
      </figure>

      <input type='file' className="form-control" id="avatar_field" accept="images/*" onChange = {handleavatar} />
      </div>
      <br />
      <br />
      <button type="submit" className="btn btn-primary btn-lg">Submit</button>
    </form>
    </div>
  </Fragment>}
  </Fragment>
  )
}

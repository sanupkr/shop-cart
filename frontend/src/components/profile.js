import {useSelector} from "react-redux";
import React from "react";
import {Link} from "react-router-dom";
import {Fragment} from "react"
import Metadata from "../components/metadata";
export default () => {
  const {user,loading} = useSelector(state=>state.user);


  return (
    <Fragment>
    {loading?<div>loading...</div>:
      <Fragment>
      <Metadata title={`profile-${user.username}`} />
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-6  profile_box">
        <h1>My Profile</h1>
        <img src={user.avatar[0].url} />
        <br />
        <br />
        <Link to={"/edit/profile"} className="btn btn-primary edit_profile_btn">Edit Profile</Link>
        </div>
        <div className="col-md-6 profile_box profile_desc">
        <h1>FULL NAME</h1>
        <span><p>{user.username}</p></span>
        <br />
        <hr />
        <h1>EMAIL:</h1>
        <span><p>{user.email}</p></span>
        <br />
        <hr/>
        <h3>Joined On</h3>
        <p>{user.createdAt.substring(0,10)}</p>
        <br />
        <br />
        <Link to={"/updatepassword"} className="btn btn-primary btn-lg">Change Password</Link>
        </div>
      </div>
      </div>
    </Fragment>}
    </Fragment>
  )
}

import React from "react";


const footer = () => {

  const today= new Date().getFullYear();

  return (
    <div className="footer">
      <p>copyright@ {today}-{today+1}</p>
    </div>
  );
}


export default footer

import {useState} from "react"

export default ({history}) => {
  const [keyword,setkeyword] = useState('');

  function handlesearch(e) {
    e.preventDefault();

    if(keyword.trim())
    {
      history.push(`/products/${keyword}`);
    }
    else{
      history.push(`/`);
    }

  }

  return (
    <div>
    <form onSubmit={handlesearch}>
      <input onChange={(e)=>{setkeyword(e.target.value)}} type="text" className="search-box" placeholder="search" autocomplete="off" />
      <button type="submit" className="btn btn-lg search-button-css">Search</button>
    </form>
    </div>
  )
}

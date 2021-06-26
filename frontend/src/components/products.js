import {Link} from "react-router-dom";
export default (props) => {
  const product = props.product;
  return (
    <div className="col-md-3">
    <Link to={`/product/${product._id}`} style={{textDecoration: "none"}} className="link" >
    <div className="card">
    <img  src={product.images[0].url} className="card-img" style={{width:"200px",height:"200px"}} />
    <h3 className="card-title">{product.name}</h3>
    <div className="card-body">
    <span className="far fa-star" />
    <span className="far fa-star" />
    <span className="far fa-star" />
    <span className="far fa-star" />
    <span className="far fa-star" />
    <p className="card-text">${product.price}</p>
    <a className="btn btn-primary btn-lg cart-button" href="#">view details</a>
    </div>
    </div>
    </Link>
    </div>
  )
}

import {useEffect,Fragment,useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {getsingleproduct,removeselectedproduct} from "../action/productsaction";
import axios from "axios";
import {Carousel} from "react-bootstrap"
import Metadata from "../components/metadata";
import {addtocart} from "../action/cartaction";
export default () => {
  const {id} = useParams();

  const dispatch = useDispatch();

  const fetch_single_product = async () => {
    const response = await axios.get(`/api/v1/products/${id}`).catch((err) => {
      console.log(err);
    });
    console.log(response);
      dispatch(getsingleproduct(response.data.product));
  }


  useEffect(() => {
    fetch_single_product();
    return () => {
      dispatch(removeselectedproduct());
    }
  },[]);
  const product = useSelector(state=>state.product);
  const {name,price,images} = product;

  const [quantity,setquantity] = useState(1);

  const decreasequantity = () => {
    if(quantity<=1)
    {
      return;
    }

    setquantity(quantity-1);

  }

  const handleaddtocart = () => {

    dispatch(addtocart(product._id,quantity));
  }

  const increasequantity = () => {
    if(quantity>=product.stock)
    {
      return;
    }

    setquantity(quantity+1);
  }



  return (
    <Fragment>
    {Object.keys(product).length===0?(<div>...loading</div>):
        (<Fragment>
          <Metadata title={name}/>
          <div className="product_details container-fluid">
          <div className="row">
          <div className="col-md-6">
          <Carousel pause="hover">
          {images && images.map(image=> (
            <Carousel.Item key={image.public_id}>
              <img src={image.url} />
            </Carousel.Item>
          ))}
          </Carousel>
          </div>
          <div className="col-md-6">
            <h2>{name}</h2>
            <br />
            <h3>${price}</h3>
            <br />
            <button onClick={decreasequantity} className="btn btn-primary btn-sm add_button">-</button>
            <input type="number" value={quantity} className="count"/>
            <button onClick={increasequantity} className="btn btn-primary btn-sm add_button">+</button>
            {product.stock>0?<p><span className="green-color">In stock</span></p>:<p><span className="red-color">out of stock</span></p>}
            <hr />
            <p>{product.description}</p>
            <br />
            {product.stock>0?<button onClick={handleaddtocart} className="btn btn-primary btn-lg">Add to cart</button>:
            <button submit="disabled" className="btn btn-primary btn-lg disabled-btn">Add to cart</button>}

          </div>
          </div>
      </div>
    </Fragment>)}
    </Fragment>
  )
}

import {Fragment,useEffect,useState} from "react"
import Metadata from "../components/metadata"
import {useDispatch,useSelector} from "react-redux"
import {getproducts} from "../action/productsaction";
import Product from "../components/products";
import Pagination from "react-js-pagination";

export default ({match}) => {

  const [currentpage,setcurrentpage] = useState(1);

  const dispatch = useDispatch();

  const keyword = match.params.keyword;

  const {products,error,loading,resperpage,productcount} = useSelector(state=> state.products);

  console.log(resperpage,productcount);
  useEffect(() => {
    dispatch(getproducts(keyword,currentpage));
  },[dispatch,keyword,currentpage]);

  function setpageno(pagenumber){
    setcurrentpage(pagenumber);
  }



  return(
    <Fragment>
    {loading?<h1>loading...</h1>:<Fragment>
    {keyword===''?<Metadata title="Best place to buy products online" />:<Metadata title={keyword} />}


    <h1>Latest Products</h1>
    <div className="row">

    {products.map(product=> (
      <Product product={product} key={product._id} />
    ))}

    </div>

    <div className="d-flex mt-5 justify-content-center">
    <Pagination
          activePage={currentpage}
          itemsCountPerPage={resperpage}
          totalItemsCount={productcount}
          firstPageText={'First'}
          lastPageText={'Last'}
          nextPageText={'Next'}
          prevPageText={'Prev'}
          onChange={setpageno}
          itemClass="page-item"
          linkClass="page-link"
      />
    </div>
    </Fragment>}
    </Fragment>

  )
}

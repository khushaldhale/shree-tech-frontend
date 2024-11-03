import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../redux/slices/productSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    return state.product.products;
  });

  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProducts()).then((data) => {
      console.log("all products are fetched succesfully ", data);
    });
  }, [dispatch]);

  // same we have to render trhe image in the product too
  return (
    <div className="container product-container">
      <h1> Our Products </h1>
      <div className="products container ">
        {products.length > 0 ? (
          products.map((element) => {
            return (
              <div
                class="product border d-flex justify-content-between align-items-center"
                key={element._id}
              >
                {/* <img src="" alt="" />  */}
                <div className="">
                  <h4 class="">{element.product_name}</h4>
                  <p class="">{element.product_desc}</p>
                  {accessToken && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        dispatch(deleteProduct({ _id: element._id, navigate }));
                      }}
                    >
                      Delete Product
                    </button>
                  )}
                </div>
                <div className="product-img">
                  <img
                    className="rounded-circle"
                    src={element.image_url}
                    alt=""
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p> No products created yet</p>
        )}
      </div>
    </div>
  );
};

export default Products;

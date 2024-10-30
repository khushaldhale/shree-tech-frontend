import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../redux/slices/productSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    return state.product.products;
  });
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProducts()).then((data) => {
      console.log("all products are fetched succesfully ", data);
    });
  }, [dispatch]);
  return (
    <div className="container product-container">
      <h2> Our Products </h2>
      <div className="products container border">
        {products.length > 0 ? (
          products.map((element) => {
            return (
              <div class="product border" key={element._id}>
                {/* <img src="" alt="" />  */}
                <div class="">
                  <h4 class="">{element.product_name}</h4>
                  <p class="">{element.product_desc}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(deleteProduct({ _id: element._id, navigate }));
                    }}
                  >
                    Delete Product
                  </button>
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

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/slices/productSlice";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_desc: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    formData.navigate = navigate;
    dispatch(addProduct(formData)).then((data) => {
      console.log(" poduct added succesfully : ", data);
      navigate("/products");
    });
  }

  return (
    <div>
      <p> Add product here </p>
      <form onSubmit={submitHandler}>
        <input type="text" name="product_name" onChange={changeHandler} />
        <input type="text" name="product_desc" onChange={changeHandler} />
        <button type="submit"> Add product</button>
      </form>
    </div>
  );
};

export default AddProduct;

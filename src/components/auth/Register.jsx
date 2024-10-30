import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    accountType: "admin",
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

    dispatch(register(formData)).then((data) => {
      console.log(data);
      if (data.success) {
        navigate("/login");
      }
    });
  }
  return (
    <div>
      <p>This is a Register </p>
      <form onSubmit={submitHandler}>
        <input type="text" name="fname" onChange={changeHandler} />
        <input type="text" name="lname" onChange={changeHandler} />
        <input type="email" name="email" onChange={changeHandler} />
        <input type="password" name="password" onChange={changeHandler} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    console.log(formData);
    dispatch(login(formData)).then((data) => {
      console.log(" login is succesfull");
      navigate("/services/add");
    });
  }
  return (
    <div>
      <p>This is a login compo</p>
      <form onSubmit={submitHandler}>
        <input type="email" name="email" onChange={changeHandler} />
        <input type="password" name="password" onChange={changeHandler} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

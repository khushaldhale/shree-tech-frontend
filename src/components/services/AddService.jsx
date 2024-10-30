import { useState } from "react";
import { useDispatch } from "react-redux";
import { addService } from "../../redux/slices/ServiceSlice";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    service_desc: "",
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
    dispatch(addService(formData)).then((data) => {
      console.log("talking from dispatch", data);
      navigate("/service");
    });
  }
  return (
    <div>
      <p> Thi is to add service </p>
      <form onSubmit={submitHandler}>
        <input type="text" name="service_name" onChange={changeHandler} />{" "}
        <br />
        <textarea
          name="service_desc"
          cols={55}
          rows={13}
          onChange={changeHandler}
        ></textarea>
        <br />
        <button type="submit">create service</button>
      </form>
    </div>
  );
};

export default AddService;

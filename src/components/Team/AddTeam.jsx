import { useDispatch } from "react-redux";

const { useState } = require("react");

const { addTeamMember } = require("../../redux/slices/TeamSlice");
const { useNavigate } = require("react-router-dom");

const AddTeam = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    position: "",
    experience: "",
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
    dispatch(addTeamMember(formData)).then((data) => {
      console.log("Team is added succefully");
      navigate("/team");
    });
  }
  return (
    <div>
      <p> This is to add Team </p>
      <form onSubmit={submitHandler}>
        <input type="text" name="fname" onChange={changeHandler} />
        <input type="text" name="lname" onChange={changeHandler} />
        <input type="text" name="position" onChange={changeHandler} />
        <input type="text" name="experience" onChange={changeHandler} />

        <button type="submit"> Add Team Member</button>
        {/*  image url is remained  */}
      </form>
    </div>
  );
};

export default AddTeam;

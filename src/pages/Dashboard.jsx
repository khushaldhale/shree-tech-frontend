import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dashboard } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("dashboard rerendered ");
    dispatch(dashboard(navigate)).then((data) => {
      console.log("dashboard is fullfilled ");
    });
  }, []);

  return (
    <div>
      <p> This is a dashboard</p>
    </div>
  );
};

export default Dashboard;

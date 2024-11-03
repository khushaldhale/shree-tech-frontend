import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, getService } from "../../redux/slices/ServiceSlice";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const services = useSelector((state) => {
    return state.service.services;
  });

  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });
  const isLoading = useSelector((state) => {
    return state.service.isLoading;
  });

  const navigate = useNavigate();
  console.log(services);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);
  return (
    <div className="service-container  container">
      {isLoading && <p> Loading.......</p>}

      <div className="">
        <h1>What We Do ?</h1>
      </div>

      <div className="services container">
        {services.length > 0 ? (
          services.map((element) => {
            return (
              <div className="service border" key={element._id}>
                <h3>{element.service_name}</h3>
                <p>{element.service_desc}</p>

                {accessToken && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(deleteService({ _id: element._id, navigate }));
                    }}
                  >
                    Delete Service
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p>No service is created yet </p>
        )}
      </div>
    </div>
  );
};

export default Service;

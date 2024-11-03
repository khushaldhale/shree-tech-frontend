import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeamMember, getTeamMembers } from "../../redux/slices/TeamSlice";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const teamMembers = useSelector((state) => {
    return state.team.teamMember;
  });

  const accessToken = useSelector((state) => {
    return state.auth.accessToken;
  });

  console.log("here pro", teamMembers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeamMembers()).then((data) => {
      console.log(" we got data  here", data);
    });
  }, [dispatch]);

  return (
    <div className="container team-parent">
      <h1>Our Team</h1>
      <div className="teams  container">
        {teamMembers.length > 0 ? (
          teamMembers.map((element) => {
            console.log("team dat ", element);
            return (
              <div
                class="team border d-flex justify-content-between align-items-center"
                key={element._id}
              >
                <div className="">
                  <h4 class="">{element.fname}</h4>
                  <h4 class="">{element.lname}</h4>
                  <p>{element.position}</p>
                  <p>{element.experience}</p>
                  {accessToken && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        dispatch(
                          deleteTeamMember({ _id: element._id, navigate })
                        ).then((data) => {
                          console.log("team member deleted succesfully ", data);
                        });
                      }}
                    >
                      {" "}
                      Delete Team Member
                    </button>
                  )}
                </div>

                <div className="team-img">
                  <img
                    className="rounded-circle "
                    src={element.image_url}
                    alt=""
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p> No team member allocated </p>
        )}
      </div>
    </div>
  );
};

export default Team;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeamMember, getTeamMembers } from "../../redux/slices/TeamSlice";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const teamMembers = useSelector((state) => {
    return state.team.teamMember;
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
      <h2>Our Team</h2>
      <div className="teams  container">
        {teamMembers.length > 0 ? (
          teamMembers.map((element) => {
            return (
              <div class="team border" key={element._id}>
                {/*  we want image in  circular way  */}
                {/* <img src="" alt="" /> */}
                <div class="">
                  <h4 class="">{element.fname}</h4>
                  <h4 class="">{element.lname}</h4>
                  <p>{element.position}</p>
                  <p>{element.experience}</p>

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

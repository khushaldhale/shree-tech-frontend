// import { useState } from "react";

// const Touch = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     number: "",
//     message: "",
//   });

//   function changeHandler(event) {
//     const { name, value } = event.target;

//     setFormData((prevData) => {
//       return {
//         ...prevData,
//         [name]: value,
//       };
//     });
//   }

//   function submitHandler(event) {
//     event.preventDefault();
//     console.log(formData);
//   }
//   return (
//     <div className="touch">
//       <h1>Get in Touch</h1>
//       <p>
//         Have a project in mind or a question for our team? We’d love to hear
//         from you! Whether you’re looking for guidance, collaboration, or have
//         specific requirements, please fill out the form below. Our team will get
//         back to you as soon as possible to discuss how we can work together to
//         bring your ideas to life.
//       </p>

//       <form onSubmit={submitHandler}>
//         <input type="text" name="fullName" onChange={changeHandler} /> <br />
//         <input type="email" name="email" onChange={changeHandler} /> <br />
//         <input type="number" name="number" onChange={changeHandler} /> <br />
//         <textarea
//           name="message"
//           id=""
//           onChange={changeHandler}
//           cols={50}
//           rows={14}
//         ></textarea>{" "}
//         <br />
//         <button type="submit">Get In Touch</button>
//       </form>

//       <p>
//         Once you submit the form, our team will review your message and reach
//         out to you within 1-2 business days. We look forward to connecting with
//         you and exploring how Shree Tech can be a part of your journey
//       </p>
//     </div>
//   );
// };

// export default Touch;

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Touch = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    message: "",
  });

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
  }

  return (
    <div className="container mt-5 text-center touch">
      <h2 className="mb-4">Get in Touch</h2>
      <p className="">
        Have a project in mind or a question for our team? We’d love to hear
        from you! Whether you’re looking for guidance, collaboration, or have
        specific requirements, please fill out the form below. Our team will get
        back to you as soon as possible to discuss how we can work together to
        bring your ideas to life.
      </p>

      <form
        onSubmit={submitHandler}
        className="mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="form-control"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="number"
            placeholder="Phone Number"
            className="form-control"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="message"
            placeholder="Your Message"
            className="form-control"
            onChange={changeHandler}
            cols={50}
            rows={6}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Get In Touch
        </button>
      </form>

      <p className="mt-4">
        Once you submit the form, our team will review your message and reach
        out to you within 1-2 business days. We look forward to connecting with
        you and exploring how Shree Tech can be a part of your journey.
      </p>
    </div>
  );
};

export default Touch;

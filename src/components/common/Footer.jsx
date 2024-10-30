const Footer = () => {
  return (
    <div>
      <div className="footer border container-fluid my-4 p-4">
        <div className="about-us">
          <p>
            {" "}
            "Shree Tech is your trusted partner for innovative tech solutions in
            web development, Android apps, machine learning, and .NET
            applications."
          </p>
          <p>
            “Our mission is to transform ideas into reliable, scalable solutions
            that drive growth and impact.”
          </p>
        </div>

        <div className="quick-links d-flex justify-content-center gap-4 ">
          <a href="" className="text-decoration-none text-dark">
            Home
          </a>
          <a href="" className="text-decoration-none text-dark">
            About Us
          </a>
          <a href="" className="text-decoration-none text-dark">
            Services
          </a>
          <a href="" className="text-decoration-none text-dark">
            Contact Us
          </a>
        </div>

        <div className="services">
          <p> Web Development</p>
          <p>Android Development</p>
          <p>Machine Learning</p>
          <p> .NET Development</p>
        </div>
        <div className="copyright text-center">
          Copyright text: "© 2024 Shree Tech. All rights reserved."
        </div>
      </div>
    </div>
  );
};

export default Footer;

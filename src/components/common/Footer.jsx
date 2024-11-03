const Footer = () => {
  return (
    <div className="footer container-fluid my-4 p-4">
      {/* About Us Section */}
      <div className="about-us text-center mb-4">
        <p className="footer-description">
          "Shree Tech is your trusted partner for innovative tech solutions in
          web development, Android apps, machine learning, and .NET
          applications."
        </p>
        <p className="footer-mission">
          "Our mission is to transform ideas into reliable, scalable solutions
          that drive growth and impact."
        </p>
      </div>

      {/* Quick Links Section */}
      <div className="quick-links d-flex justify-content-center gap-4 mb-4">
        <a href="#home" className="footer-link">
          Home
        </a>
        <a href="#about" className="footer-link">
          About Us
        </a>
        <a href="#services" className="footer-link">
          Services
        </a>
        <a href="#contact" className="footer-link">
          Contact Us
        </a>
      </div>

      {/* Services Section */}
      <div className="services d-flex justify-content-center gap-4 mb-4">
        <p className="footer-service">Web Development</p>
        <p className="footer-service">Android Development</p>
        <p className="footer-service">Machine Learning</p>
        <p className="footer-service">.NET Development</p>
      </div>

      {/* Copyright Section */}
      <div className="copyright text-center">
        © 2024 Shree Tech. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

const Header = () => {
  return (
    <div className="container-fluid header d-flex justify-content-between align-items-center">
      <div className="logo">
        <img src="./shree_tech_logo.jpg" alt="" />
      </div>
      <div className="nav-links d-flex gap-4">
        <a href="#about" className="text-dark">
          About Us
        </a>
        <a href="#services" className="text-dark">
          Services
        </a>
        <a href="#products" className="text-dark">
          Products
        </a>
        <a href="#contact" className="text-dark">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Header;

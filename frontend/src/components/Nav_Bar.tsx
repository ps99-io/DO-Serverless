import React from "react";
import logo from "../assets/Blog.png";
import BlogPenIcon from "../assets/BlogPenIcon";

export interface NavProp {
  toggleModal: () => void;
}

const Nav_Bar: React.FC<NavProp> = ({ toggleModal }) => {
  return (
    <nav className="navbar">
      <div className="container-fluid px-5">
        <span className="navbar-brand mb-0 fs-3 text-light fw-bold">
          <img src={logo} alt="Ocean_Blog" width={100} height="100" />
        </span>
        <button
          id="btn_override"
          type="button"
          className="btn btn-outline-info btn-lg "
          onClick={toggleModal}
        >
          Write a Blog
          <span className="ms-3">
            <BlogPenIcon />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Nav_Bar;

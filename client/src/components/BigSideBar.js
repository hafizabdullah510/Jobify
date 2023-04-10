import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useGlobalContext } from "../context/AppContext";
import Logo from "./Logo";
import Navlinks from "./Navlinks";
const BigSideBar = () => {
  const { showSideBar } = useGlobalContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;

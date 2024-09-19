import React, { useState } from "react";
import "./TopNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import istudio from "../../assets/istudio.png";
import ibuilder from "../../assets/ibuilder.png";
import { RiArrowDownWideLine } from "react-icons/ri";
import { Tooltip } from "antd"; // Import Tooltip from antd
import { LogoutOutlined } from "@ant-design/icons"; // Import Logout icon from antd
import { useAuthenticator } from "@aws-amplify/ui-react";

const TopNavBar = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuthenticator((context) => [context.user]);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleMenuClick = (url, showIframe, newTab) => {
    if (newTab) {
      window.open(url, "_blank");
    } else if (showIframe) {
      navigate("/data-modelling", { state: { iframeUrl: url } });
    } else {
      navigate(url);
    }
  };

  const menuItems = [
    {
      label: <img src={istudio} alt="iStudio" className="menu-icon istudio" />,
      url: "https://manage.app.preset.io/app/",
      newTab: true,
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={ibuilder} alt="iBuilder" className="menu-icon ibuilder" />
          <RiArrowDownWideLine
            style={{ marginLeft: "10px", fontSize: "20px" }}
          />
        </div>
      ),
      children: [
        {
          label: "Semantic Layer",
          url: "https://cogss.cubecloud.dev/",
          newTab: true,
        },
        {
          label: "Model Builder",
          url: "https://dm.inceptivebi.com/",
          newTab: true,
        },
      ],
    },
  ];

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src={logo}
              alt="InceptiveBI Logo"
              className="logo-image"
              style={{ width: "150px" }}
            />
          </Link>
        </div>
        <div className="left-menu">
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onMouseEnter={item.children ? handleMouseEnter : null}
                onMouseLeave={item.children ? handleMouseLeave : null}
              >
                <button
                  className="nav-button"
                  onClick={() =>
                    !item.children &&
                    handleMenuClick(item.url, item.showIframe, item.newTab)
                  }
                >
                  {item.label}
                </button>
                {item.children && showDropdown && (
                  <div className="dropdown">
                    {item.children.map((child, idx) => (
                      <button
                        key={idx}
                        className="dropdown-button"
                        onClick={() =>
                          handleMenuClick(
                            child.url,
                            child.showIframe,
                            child.newTab
                          )
                        }
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Tooltip title="Sign Out">
              <LogoutOutlined
                onClick={signOut}
                style={{ fontSize: "24px", marginLeft: "20px" }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default TopNavBar;

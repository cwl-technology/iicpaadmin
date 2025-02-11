"use client";
import { useState } from "react";

export default function Header({handleToggle, mobile}) {
  const [isOpen, setIsOpen] = useState(false);
  // const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <div className="app-header header-shadow">
        <div className="app-header__logo">
          <div className="ozark-logo">
            {/* <img src="/assets/images/logo1.png" alt="error" /> */}
            <img src="/assets/logo_2.jpg" alt="error" />
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
          <button
              type="button"
              className={`hamburger hamburger--elastic mobile-toggle-nav ${mobile ? "is-active" : ""}`}
              onClick={handleToggle}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6"></i>
              </span>
            </button>
          </span>
        </div>
        <div className="app-header__content">
          
          <div className="app-header-right">
            <div className="header-btn-lg pr-0">
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="btn-group">
                      <a
                        onClick={toggleDropdown}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        className="p-0 btn"
                      >
                        <img
                          width="42"
                          className="rounded-circle"
                          src="/assets/images/admin_image.png"
                    
                        />
                        <i className="fa fa-angle-down ml-2 opacity-8"></i>
                      </a>

                        <div
                          role="menu"
                          className={`dropdown-menu dropdown-menu-right ${isOpen ? 'show' : ''}`}
                        >
                          <button type="button" className="dropdown-item">
                            Logout
                          </button>
                         
                        </div>
                      
                    </div>
                  </div>
                  <div className="widget-content-left  ml-3 header-user-info">
                    <div className="widget-heading">Admin</div>
                    <div className="widget-subheading">IICPA Institute</div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

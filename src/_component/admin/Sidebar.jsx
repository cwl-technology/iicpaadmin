"use client";
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname()

  const [activeId, setActiveId] = useState(null);
  const [activeNestedId, setActiveNestedId] = useState(null);
  const [menuData, setMenuData] = useState();

  const handleMenu = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };


  const getMenuData = async () => {
    try {
      const res = await axios.get("/api/menu/getMenuData");

      if (res.data.status == 1) {
        setMenuData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMenuData();
  }, [])

  return (
    <>
      <div className="app-sidebar sidebar-shadow">
        <div className="app-header__logo">
          <div className="logo-src"></div>
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"

              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"

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
        <div className="scrollbar-sidebar ps--active-y pt-3">
          <div className="app-sidebar__inner">
            <ul className="vertical-nav-menu mt-4">
              {/* <li className="app-sidebar__heading">Dashboards</li> */}
              <li>
                <Link href="/admin"
                  className={pathname === '/admin' ? 'sidebar-active' : ''}
                >
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Dashboard
                </Link>
              </li>

              {/* {
                menuData?.map((ele, ind) =>
                  <li className='' key={ind}>
                    <a href="#" onClick={() => handleMenu(ind)} >
                      <i className="metismenu-icon pe-7s-diamond"></i>
                      {ele.menuName}
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                    </a>
                    <ul className={activeId === ind ? 'mm-collapse mm-show' : 'mm-collapse'}>
                      <li>
                        <Link href="/admin/role/create" className={pathname === '/admin/role/create' ? 'sidebar-active' : ''}>
                          <i className="metismenu-icon"></i>
                          Create
                        </Link>
                      </li>
                      <li>
                        <Link href="/admin/role/view" className={pathname === '/admin/role/view' ? 'sidebar-active' : ''}>
                          <i className="metismenu-icon"></i>
                          View
                        </Link>
                      </li>
                    </ul>
                  </li>)
              } */}

              <li className=''>
                <a href="#" onClick={() => handleMenu(2)} >
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Courses Category
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 2 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/course-category/create" className={pathname === '/admin/course-category/create' ? 'sidebar-active' : ''}>
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/course-category/view" className={pathname === '/admin/course-category/view' ? 'sidebar-active' : ''}>
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>

              <li className=''>
                <a href="#" onClick={() => handleMenu(3)} >
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Courses
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 3 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/course/create" className={pathname === '/admin/course/create' ? 'sidebar-active' : ''}>
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/course/view" className={pathname === '/admin/course/view' ? 'sidebar-active' : ''}>
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>

              <li className='' >
                <a href="#" onClick={() => handleMenu(4)} >
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Live sessions
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 4 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/live-sessions/create" className={pathname === '/admin/live-sessions/create' ? 'sidebar-active' : ''}>
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/live-sessions/view" className={pathname === '/admin/live-sessions/view' ? 'sidebar-active' : ''}>
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>

              <li className='' >
                <a href="#" onClick={() => handleMenu(1)} >
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Manage Roles
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 1 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/role/create" className={pathname === '/admin/role/create' ? 'sidebar-active' : ''}>
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/role/view" className={pathname === '/admin/role/view' ? 'sidebar-active' : ''}>
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>
  
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
"use client";

import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  if (pathname === "/login") {
    return (<></>);
  }

  const toggleNavbar = () => {
    setIsActive(!isActive);
  }

  const closeNavbar = () => {
    setIsActive(false);
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
          <Image src="/logo192.png" alt="" width={32} height={32}/>

        <a role="button" onClick={toggleNavbar} aria-label="menu" aria-expanded="false"
           className={`navbar-burger burger is-color-primary ${isActive ? "is-active" : ""}`}
           data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link href="/" onClick={closeNavbar} className="navbar-item">
            Home
          </Link>

          <Link href="/jobs" onClick={closeNavbar} className="navbar-item">
            Jobs History
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link is-arrowless">
              Profile
            </div>

            <div className="navbar-dropdown is-right is-boxed">
              <div className="navbar-item">
                s.secure.one
              </div>
              <hr className="navbar-divider"/>
              <Link href="/login" onClick={closeNavbar} className="navbar-item">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { useRouter } from "next/router";
import React from "react";
import styles from './Navbar.module.css';

const SmartLink = ({ children, href }) => {
  const router = useRouter();
  
  function clickHandler(e) {
    e.preventDefault();
    router.push(href);
  }

  return <a 
    href={href}
    onClick={clickHandler}
    className={router.asPath === href ? styles.activeNavlink : styles.navlink}
    >
      {children}
    </a>;
};
const Navbar = () => {
  return (
    <nav className="flex justify-center items-center mb-10">
      <SmartLink href="/" >
        Home
      </SmartLink>

      <SmartLink href="/cart">
        Cart
      </SmartLink>
    </nav>
  );
};

export default Navbar;

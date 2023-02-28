import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex gap-5">
      <Link href="/" className="rounded-md px-8 py-2 bg-gray-100">Home</Link>

      <Link href="/cart" className="rounded-md px-8 py-2 bg-gray-100">Cart</Link>
    </nav>
  );
};

export default Navbar;

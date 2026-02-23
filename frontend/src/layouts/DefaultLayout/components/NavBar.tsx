import { Link } from "react-router";

import logo from "../../../assets/logo.svg";
import { ProfileIcon } from "../../../components/profile-icon";
import NavItems from "./NavItems";

export default function Navbar() {
  return (
    <nav className="w-full px-8 lg:px-12 py-4 bg-white border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center relative">
        <Link to="/">
          <img src={logo} alt="Logo Financy" className="w-25 h-6" />
        </Link>

        <NavItems />

        <ProfileIcon />
      </div>
    </nav>
  );
}

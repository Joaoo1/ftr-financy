import { Link, useLocation } from "react-router";

import { Button } from "../../../components/button";

export default function NavItems() {
  const location = useLocation().pathname;

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Transações", path: "/transacoes" },
    { label: "Categorias", path: "/categorias" },
  ];

  return (
    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-5">
      {navItems.map((item) => (
        <Link to={item.path} key={item.path}>
          <Button
            variant="ghost"
            key={item.path}
            className={`text-sm font-['Inter'] transition-colors ${
              location === item.path
                ? "text-brand-base font-semibold"
                : "text-gray-600 font-normal hover:text-gray-900"
            }`}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}

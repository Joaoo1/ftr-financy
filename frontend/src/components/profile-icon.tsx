import { Link } from "react-router";
import { useAuth } from "../hooks/context/useAuth";
import { getInitials } from "../utils/string";

export function ProfileIcon() {
  const { user } = useAuth();

  const initials = user?.name ? getInitials(user.name) : "??";

  return (
    <Link to="/perfil">
      <div className="flex items-center justify-center rounded-full bg-gray-300 h-8 w-8">
        <p className="text-gray-800 text-sm font-medium leading-5">
          {initials}
        </p>
      </div>
    </Link>
  );
}

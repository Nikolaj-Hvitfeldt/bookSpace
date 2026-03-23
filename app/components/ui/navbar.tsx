import { NavLink } from "react-router";

type NavItem = {
  navigationPath: string;
  label: string;
  isActive: string;
  isInactive: string;
};

const navItems: NavItem[] = [
  {
    navigationPath: "/",
    label: "Home",
    isActive: "/navbar/home-filled.avif",
    isInactive: "/navbar/home-empty.avif",
  },
  {
    navigationPath: "/chat",
    label: "Chat",
    isActive: "/navbar/chat-filled.avif",
    isInactive: "/navbar/chat-empty.avif",
  },
  {
    navigationPath: "/stats",
    label: "Stats",
    isActive: "/navbar/statistics-filled.avif",
    isInactive: "/navbar/statistics-empty.avif",
  },
  {
    navigationPath: "/profile",
    label: "Profile",
    isActive: "/navbar/profile-filled.avif",
    isInactive: "/navbar/profile-empty.avif",
  },
];

export default function Navbar() {
  return (
    <nav className="w-full h-[60px] fixed bottom-2 mx-auto bg-secondary-eggshell border-t border-black/10 px-6 py-3">
      <ul className="grid h-full grid-cols-4 items-center">
        {navItems.map((item) => (
          <li key={item.navigationPath} className="flex justify-center">
            <NavLink to={item.navigationPath} className="flex justify-center">
              <img
                src={item.isActive}
                alt={item.label}
                className="w-6 h-6 object-contain"
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

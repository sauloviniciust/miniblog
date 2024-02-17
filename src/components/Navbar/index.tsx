import { NavLink } from "react-router-dom";
import { useAuthValue } from "../../context/authContext";
import { useAuthentication } from "../../hooks/useAuthentication";

export const Nav = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  // console.log(user)

  return (
    <nav className="bg-gray-700 flex gap-5 justify-between p-2 items-center">
      <NavLink to="/">
        <img className="w-56" src="xnanax w.png" alt="" />
      </NavLink>
      <ul className=" flex gap-5">
        {user && (
          <>
            <li>
              <NavLink to="/posts/create">+</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dash</NavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <button onClick={logout}>Sair</button>
            </li>
            
          </>
        )}

        <li className="mr-2">
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

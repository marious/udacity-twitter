import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeclassname="active">
            New Tweet
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

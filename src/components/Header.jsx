import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const menu = [
  { title: 'Products', path: '/' },
  { title: 'Categories', path: '/categories' },
];

function Header() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleNavMenu = () => {
    setNavMenuOpen(!navMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <button className="nav-toggle" onClick={toggleNavMenu}>
            &#9776;
          </button>
          <ul className={`nav-menu ${navMenuOpen ? 'nav-menu-open' : ''}`}>
            {menu.map((item) => (
              <li key={item.title} className="nav-item">
                <Link className="nav-link" to={item.path}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* <div className="user-menu">
          <button className="user-avatar" onClick={toggleUserMenu}>
            <img src="/static/images/avatar/2.jpg" alt="User Avatar" />
          </button>
          <ul
            className={`user-dropdown ${
              userMenuOpen ? 'user-dropdown-open' : ''
            }`}
          >
            {settings.map((setting) => (
              <li key={setting} className="user-dropdown-item">
                {setting}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </header>
  );
}

export default Header;

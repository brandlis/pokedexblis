import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import pokeballIcon from "../assets/pokeball-icon.png";

function NavBar() {
  const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigationRoutes = [
    { name: "Buscar", route: "/search" },
    { name: "Comparar", route: "/compare" },
    { name: "Pokemon", route: "/pokemon" },
    { name: "Mi Lista", route: "/list" },
    { name: "Contacto", route: "/about" },
  ];

  useEffect(() => {
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    );
    ul(index);
  }, [location.pathname, navigationRoutes]);

  function ul(index: number) {
    const underLines = document.querySelectorAll<HTMLElement>(".underLine");
    for (let i = 0; i < underLines.length; i++) {
      underLines[i].style.transform = `translate3d(${index * 100}%,0,0)`;
    }
  }

  return (
    <nav>
      <div className="block">
        <img src={pokeballIcon} alt="Icon" />
      </div>
      <div className="data">
        <ul>
          <div className="underLine"></div>
          <div className="underLine"></div>
          <div className="underLine"></div>
          {navigationRoutes.map(({ name, route }, index) => {
            return (
              <Link to={route} key={index}>
                <li>{name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="block">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
}

export default NavBar;

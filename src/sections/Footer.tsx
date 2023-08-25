import { signOut } from "firebase/auth";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPokemonTab, setToast, setUserStatus } from "../app/slices/AppSlice";
import { Tooltip } from "react-tooltip";
import { pokemonTabs } from "../utils/Constants";
import { useLocation } from "react-router-dom";

function Footer() {
  const dispatch = useAppDispatch();
  const { currentPokemonTab } = useAppSelector(({ app }) => app);
  const location = useLocation();
  const handleLogout = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast("se ha cerrado sesión correctamente"));
  };

  const routes = [
    {
      name: pokemonTabs.description,
      value: "Descripción",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolución",
    },
    {
      name: pokemonTabs.locations,
      value: "Ubicación",
    },
    {
      name: pokemonTabs.moves,
      value: "Movimientos",
    },
  ];

  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            {routes.map((route) => {
              return (
                <li
                  key={route.name}
                  className={`${
                    currentPokemonTab === route.name ? "active" : ""
                  }`}
                  onClick={() => {
                    dispatch(setPokemonTab(route.name));
                  }}
                >
                  {route.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="block">
        <Tooltip
          id="my-tooltip"
          style={{
            borderRadius: "50px",
            fontSize: "0.8rem",
            textTransform: "capitalize",
          }}
        />
        <MdOutlinePowerSettingsNew
          onClick={handleLogout}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Cerrar Sesión"
        />
      </div>
    </footer>
  );
}

export default Footer;

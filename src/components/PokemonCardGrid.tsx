import React from "react";
import { pokemonTypeInterface, userPokemonsType } from "../utils/Types";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import { useAppDispatch } from "../app/hooks";
import { addToCompare, setCurrentPokemon } from "../app/slices/PokemonSlice";
import { setPokemonTab, setToast } from "../app/slices/AppSlice";
import { Tooltip } from "react-tooltip";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
import { removePokemon } from "../app/reducers/removePokemonFromUserList";
import { pokemonTabs } from "../utils/Constants";

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: userPokemonsType) => {
            return (
              <div className="pokemon-card" key={data.id}>
                <div className="pokemon-card-list">
                  {location.pathname.includes("/pokemon") ||
                  location.pathname.includes("/search") ? (
                    <FaPlus
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Añadir a mi lista"
                      className="plus"
                      onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Quitar de la lista"
                      onClick={async () => {
                        await dispatch(removePokemon({ id: data.firebaseId! }));
                        dispatch(
                          setToast(
                            `El Pokemon ${data.name} se elimino con éxito`
                          )
                        );
                      }}
                    />
                  )}
                </div>
                <div className="pokemon-card-compare">
                  <MdOutlineCompareArrows
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Comparar"
                    onClick={() => {
                      dispatch(addToCompare(data));
                      dispatch(
                        setToast(
                          `Se agregó el pokemon ${data.name} a la lista de comparación.`
                        )
                      );
                    }}
                  />
                </div>
                <Tooltip
                  id="my-tooltip"
                  style={{
                    borderRadius: "50px",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                  }}
                />
                <h3 className="pokemon-card-title">{data.name}</h3>
                <img
                  src={data.image}
                  alt="pokemonimagen"
                  className="pokemon-card-image"
                  loading="lazy"
                  onClick={() => {
                    dispatch(setPokemonTab(pokemonTabs.description));
                    dispatch(setCurrentPokemon(undefined));
                    navigate(`/pokemon/${data.id}`);
                  }}
                />
                <div className="pokemon-card-types">
                  {data.types.map(
                    (type: pokemonTypeInterface, index: number) => {
                      const keys = Object.keys(type);
                      return (
                        <div className="pokemon-card-types-type" key={index}>
                          <img
                            src={type[keys[0]].image}
                            alt="PokemonType"
                            className="pokemon-card-types-type-image"
                            loading="lazy"
                          />
                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;

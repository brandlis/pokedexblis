import React from "react";
import {
  pokemonStatType,
  pokemonTypeInterface,
  userPokemonsType,
} from "../utils/Types";
import { BsPlusSquare } from "react-icons/bs";
import { pokemonTypes } from "../utils/getPokemonTypes";
import { Tooltip } from "react-tooltip";
import { removeFromCompare } from "../app/slices/PokemonSlice";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { addPokemonToList } from "../app/reducers/addPokemonToList";

function CompareContainer({
  pokemon = undefined,
  isEmpty = false,
}: {
  pokemon?: userPokemonsType;
  isEmpty?: boolean;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createStatsArray = (
    types: pokemonTypeInterface[],
    statType: pokemonStatType
  ) => {
    const statsArray: { name: string; image: string }[] = [];
    const statsSet = new Set<string>();
    types.forEach((type: pokemonTypeInterface) => {
      const key = Object.keys(type)[0];
      type[key][statType].forEach((stat: string) => {
        if (!statsSet.has(stat)) {
          // @ts-ignore
          statsArray.push({ name: stat, image: pokemonTypes[stat].image });
          statsSet.add(stat);
        }
      });
    });
    return statsArray;
  };
  const getStats = () => {
    return (
      <>
        <Tooltip
          id="my-tooltip"
          style={{
            borderRadius: "50px",
            fontSize: "0.8rem",
            textTransform: "capitalize",
          }}
        />
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Fuerza</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, "strength").map(
              (stat: { image: string; name: string }) => (
                <div className="pokemon-type">
                  <img
                    src={stat.image}
                    alt=""
                    className="pokemon-type-image"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={stat.name}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Debilidad</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, "weakness").map(
              (stat: { image: string; name: string }) => (
                <div className="pokemon-type">
                  <img
                    src={stat.image}
                    alt=""
                    className="pokemon-type-image"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={stat.name}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Resistencia</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, "resistance").map(
              (stat: { image: string; name: string }) => (
                <div className="pokemon-type">
                  <img
                    src={stat.image}
                    alt=""
                    className="pokemon-type-image"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={stat.name}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Vulnerabilidad</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, "vulnerable").map(
              (stat: { image: string; name: string }) => (
                <div className="pokemon-type">
                  <img
                    src={stat.image}
                    alt=""
                    className="pokemon-type-image"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={stat.name}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="compare-container">
      {isEmpty && (
        <div className="empty">
          <button onClick={() => {}}>
            <BsPlusSquare />
          </button>
          <h3>Añade un pokemon para comparar</h3>
        </div>
      )}
      {pokemon && (
        <div className="compare-element" key={pokemon?.id}>
          <div className="compare-info">
            <div className="compare-details">
              <h3>{pokemon?.name}</h3>
              <img
                src={pokemon?.image}
                alt="pokemon"
                className="compare-image"
              />
            </div>
            <div className="pokemon-types-container">
              <div className="pokemon-types">
                <h4 className="pokemon-type-title">Type</h4>
                <div className="pokemon-type-icons">
                  {pokemon?.types.map((type: pokemonTypeInterface) => {
                    const keys = Object.keys(type);
                    return (
                      <div className="pokemon-type">
                        <img
                          src={type[keys[0]].image}
                          alt="pokemon type"
                          className="pokemon-type-image"
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {getStats()}
            </div>
          </div>
          <div className="compare-action-buttons">
            <button
              className="compare-btn"
              onClick={() => dispatch(addPokemonToList(pokemon))}
            >
              Añadir a Mi Lista
            </button>
            <button
              className="compare-btn"
              onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            >
              Visualizar
            </button>
            <button
              className="compare-btn"
              onClick={() => dispatch(removeFromCompare({ id: pokemon.id }))}
            >
              Remover
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareContainer;

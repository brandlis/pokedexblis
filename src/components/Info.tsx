import React, { useEffect } from "react";
import { pokemonTypes } from "../utils/getPokemonTypes";
import { useAppDispatch } from "../app/hooks";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
import { setPokemonTab } from "../app/slices/AppSlice";
import { pokemonTabs } from "../utils/Constants";
import { currentPokemonType, pokemonStatsType } from "../utils/Types";

export default function Info({
  data,
}: {
  data: currentPokemonType | undefined;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const progressBars = document.querySelectorAll("progress");
    progressBars.forEach((progressBar) => {
      progressBar.style.width = "10rem";
    });
  }, []);
  const createStatsArray = (types: string[] | undefined, statType: string) => {
    if (!types) {
      return [];
    }
    const statsSet = new Set();
    types.forEach((types: string) => {
      // @ts-ignore
      pokemonTypes[types][statType].forEach((stat: string) => {
        if (!statsSet.has(stat)) {
          statsSet.add(stat[0].toUpperCase() + stat.slice(1));
        }
      });
    });
    return Array.from(statsSet);
  };
  return (
    <>
      <div className="details">
        <h1 className="name">{data?.name}</h1>
        <h3>Tipo: {data?.types.join(" - ")}</h3>
        <h3>Evolución: {data?.evolutionLevel}</h3>
        <button
          className="add-pokemon"
          onClick={() => dispatch(setPokemonTab(pokemonTabs.evolution))}
        >
          Ver evolución siguiente
        </button>
      </div>
      <div className="stats">
        <ul>
          {data?.stats.map((stat: pokemonStatsType) => {
            return (
              <li key={stat.name}>
                {stat.name}: {stat.value}
                <progress max={100} value={stat.value} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="battle-stats">
        {
          <ul>
            <li>
              <span>Fortaleza:</span>
              <span>
                {createStatsArray(
                  data?.types as unknown as string[],
                  "strength"
                ).join(", ")}
              </span>
            </li>
            <li>
              <span>Debilidad:</span>
              <span>
                {createStatsArray(
                  data?.types as unknown as string[],
                  "weakness"
                ).join(", ")}
              </span>
            </li>
            <li>
              <span>Resistencia:</span>
              <span>
                {createStatsArray(
                  data?.types as unknown as string[],
                  "resistance"
                ).join(", ")}
              </span>
            </li>
            <li>
              <span>Vulnerabilidad:</span>
              <span>
                {createStatsArray(
                  data?.types as unknown as string[],
                  "vulnerable"
                ).join(", ")}
              </span>
            </li>
          </ul>
        }
        <button
          onClick={() => dispatch(addPokemonToList(data!))}
          className="add-pokemon"
        >
          Añadir pokemon a mi Lista
        </button>
      </div>
    </>
  );
}

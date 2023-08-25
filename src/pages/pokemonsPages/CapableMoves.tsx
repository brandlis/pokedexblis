import React from "react";
import { useAppSelector } from "../../app/hooks";

function CapableMoves() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );

  return (
    <div className="capable-moves">
      <h1 className="capable-moves-title">Habilidades</h1>
      <ul className="capable-moves-list ability">
        {pokemonData?.pokemonAbilities?.abilities?.map((ability: string) => (
          <li key={ability} className="move">
            {ability}
          </li>
        ))}
      </ul>
      <h1 className="capable-moves-title">Movimientos</h1>
      <ul className="capable-moves-list">
        {pokemonData?.pokemonAbilities?.moves?.map((move: string) => (
          <li key={move} className="move">
            {move}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CapableMoves;

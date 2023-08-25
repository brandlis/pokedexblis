import React from "react";
import pokeball1 from "../assets/pokeball.png";
import pokeball2 from "../assets/pokeball2.png";

function Background() {
  return (
    <div className="background">
      <img src={pokeball1} alt="Pokeball" className="pokeball pokeball1" />
      <img src={pokeball2} alt="Pokeball" className="pokeball pokeball2" />
      <img src={pokeball1} alt="Pokeball" className="pokeball pokeball3" />
      <img src={pokeball2} alt="Pokeball" className="pokeball pokeball4" />
      <img src={pokeball1} alt="Pokeball" className="pokeball pokeball5" />
      <img src={pokeball2} alt="Pokeball" className="pokeball pokeball6" />
    </div>
  );
}

export default Background;

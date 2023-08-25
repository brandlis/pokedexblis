import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import Wrapper from "../sections/Wrapper";
import img1 from "../assets/poke1.jpg";
import img2 from "../assets/poke2.jpg";
import img3 from "../assets/poke3.jpg";
import img4 from "../assets/poke4.jpg";
import img5 from "../assets/poke5.jpg";
import img6 from "../assets/poke6.jpg";
import img7 from "../assets/poke7.jpg";
import img8 from "../assets/poke8.jpg";
import img9 from "../assets/poke9.jpg";
import img10 from "../assets/poke10.jpg";

function About() {
  return (
    <div className="container">
      <div className="about">
        <img src={img1} alt="imagen" />
        <img src={img2} alt="imagen" />
        <img src={img3} alt="imagen" />
        <img src={img4} alt="imagen" />
        <img src={img5} alt="imagen" />
        <img src={img6} alt="imagen" />
        <img src={img7} alt="imagen" />
        <img src={img8} alt="imagen" />
        <img src={img9} alt="imagen" />
        <img src={img10} alt="imagen" />
      </div>
      <div className="about-info">
        <a
          href="https://www.linkedin.com/in/brand-vargas-lis-b117a9251/"
          target="_blank"
          rel="nooper noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://instagram.com/brand_liz.888?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
          target="_blank"
          rel="nooper noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}

export default Wrapper(About);

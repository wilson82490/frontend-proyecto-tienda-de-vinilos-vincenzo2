import Navbar from "./Navbar";
import logo from "../assets/favicon.svg";
import SearchBox from "./SearchBox";
import { useState, useEffect } from "react";
import { getVinilos } from "../services/viniloService";
// import { vinilos } from "../data/vinilos";

function Header() {
  const [vinilos, setVinilos] = useState([]);

  useEffect(() => {
    const loadVinilos = async () => {
      try {
        const data = await getVinilos();
        setVinilos(data);
      } catch {
        setVinilos([]);
      }
    };
    loadVinilos();
  }, []);

  return (
    <header className="site-header">
      <div className="header-content container">
        <div className="header-item">
          <img src={logo} alt="Logo de la tienda de vinilos" className="logo" title="Tienda de Vinilos" />
        </div>
        <Navbar />
        <SearchBox vinilos={vinilos} />
      </div>
    </header>
  );
}

export default Header;

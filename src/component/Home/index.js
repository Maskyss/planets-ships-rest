import React from "react";
import { NavLink } from "react-router-dom";
import Styles from './index.module.scss'

const Home = () => {
  return <div className={Styles.gridContainer}>

        <NavLink to="/starships">
              <p>starships</p>
        </NavLink>

          <NavLink to="/planets">
              <p>planets</p>
          </NavLink>
      </div>
};
export default Home;

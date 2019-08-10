import React, { Component } from "react";
import { Api } from "../../rest/api";
import { NavLink } from "react-router-dom";

import Loader from "../../theme/svg/loader_gif.gif";
import Styles from "./index.module.scss";

class StarList extends Component {
  state = {
    loader: false,
    count: 0,
    items: [],
    item: {}
  };
  componentDidMount() {
    const { starItem } = this.props;
    this.getNameItem(starItem);
  }

  getNameItem = async item => {
    const response = await Api.getListOf.getItems(item);

    const items = response.results.map(k => {
      const item1 = {
        name: "",
        url: ""
      };
      item1.name = k.name;
      item1.url = k.url;
      return item1;
    });
    if (items.length !== 0) {
      this.setState(prevState => ({
        count: response.count,
        loader: !prevState.loader,
        items: items
      }));
    }
  };
  sortingName = items => {
    const k = items.sort(this.comparing);
    console.log(k, "sorting");
  };
  comparing(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.name.toUpperCase();
    const genreB = b.name.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }

  sortAZ = () => {
    const { items } = this.state;
    this.sortingName(items);
    if (items.length !== 0) {
      this.setState({
        items: items
      });
    }
  };
  sortZA = () => {
    const { items } = this.state;
    this.sortingName(items);
    items.reverse();
    if (items.length !== 0) {
      this.setState({
        items: items
      });
    }
  };
  getMoreInfo = async url => {
    const { starItem } = this.props;
    const response = await Api.getListOf.getMoreInfo(url);

    if (starItem === "starships") {
      this.setShip(response);
    }
    if (starItem === "planets") {
      this.setPlanet(response);
    }
  };
  setPlanet = response => {
    const { name, rotation_period, diameter, climate } = response;
    if (response.length !== 0) {
      this.setState({
        item: {
          name: name,
          rotation_period: rotation_period,
          diameter: diameter,
          climate: climate
        }
      });
    }
  };

  setShip = response => {
    const { name, model, manufacturer, passengers } = response;
    if (response.length !== 0) {
      this.setState({
        item: {
          name: name,
          model: model,
          manufacturer: manufacturer,
          passengers: passengers
        }
      });
    }
  };
  render() {
    const { loader, items, item } = this.state;
    const { starItem } = this.props;
    return (
      <div className={Styles.gridContainer}>
        <div className={Styles.leftBlock}>
          {loader ? (
            <>
              {items.map(k => (
                <button onClick={() => this.getMoreInfo(k.url)}>
                  {k.name}
                </button>
              ))}
              <div className={Styles.buttonRight}>
                <button onClick={this.sortAZ}>sortA-Z</button>
                <button onClick={this.sortZA}>sortZ-A</button>
              </div>
              {}
            </>
          ) : (
            <img src={Loader} />
          )}
        </div>
        <div className={Styles.rightBlock}>
          {Object.entries(item).map(k => (
            <p>
              {k[0]}: {k[1]}
            </p>
          ))}
        </div>
        <div>
          {" "}
          {starItem !== "planets" ? (
            <NavLink to="/planets">
              <p>planets</p>
            </NavLink>
          ) : (
            <NavLink to="/starships">
              <p>starships</p>
            </NavLink>
          )}
        </div>
      </div>
    );
  }
}
export default StarList;

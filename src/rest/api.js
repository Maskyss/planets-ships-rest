import { MAIN_URL } from "./config";

export const Api = {
  getListOf: {
    getItems(item) {
      return fetch(`${MAIN_URL}` + `${item}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        }
      }).then(
          response => response.json()
      )
      .catch(err => {
          console.log("fetch error" + err);
      });
    },
    getMoreInfo(url){
      return fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        }
      }).then(
          response => response.json()
      )
          .catch(err => {
            console.log("fetch error" + err);
          });
    }
  },

};

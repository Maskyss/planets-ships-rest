import React from "react";
import Home from "./component/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StarList from "./component/StarList";
import './theme/styles/index.scss'
function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/starships" component={() => <StarList starItem='starships' />}/>
      <Route exact path="/planets" component={() => <StarList starItem='planets' />}/>
    </Router>
  );
}

export default App;

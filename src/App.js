import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";

import "./App.css";
import { Fragment } from "react";

function App() {

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/test" element={<div>testing page</div>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;;

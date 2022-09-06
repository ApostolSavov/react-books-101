import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CatalogPage from "./pages/Catalog/CatalogPage";
import "./App.scss";

function App() {

  return (
    <Router>
      <Header />
      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path="/catalog" element={<CatalogPage />} />
          <Route exact path="/test" element={<div>testing page</div>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

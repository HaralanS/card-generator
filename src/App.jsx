import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />;
          <Route path="/search" element={<SearchPage />} />;
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

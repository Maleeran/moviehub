import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import "@radix-ui/themes/styles.css";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import MoviesDetails from "./pages/MoviesDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />;
          <Route path="/search" element={<SearchPage />} />;
          <Route path="/movies/:movieId" element={<MoviesDetails />} />;
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

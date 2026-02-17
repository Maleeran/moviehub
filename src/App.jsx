import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:memoId" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

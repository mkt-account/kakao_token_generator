import { BrowserRouter, Routes, Route } from "react-router-dom";
import Init from "./components/init";
import Callback from "./components/callback";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Init />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contoh from "./components/contoh";
import Tugas from "./components/tugas";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/tugas" element={<Tugas />} />
          <Route path="/contoh" element={<Contoh />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

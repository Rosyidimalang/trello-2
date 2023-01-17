import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tugas from "./Layout/tugas";
import Contoh from "./Layout/contoh";

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

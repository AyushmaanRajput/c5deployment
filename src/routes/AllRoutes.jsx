import React from "react";
import { Routes, Route } from "react-router-dom";
import { Contact } from "../pages/Contact";
import { Appointment } from "../pages/Appointment";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Contact />}></Route>
      <Route path="/appointment" element={<Appointment />}></Route>
    </Routes>
  );
};

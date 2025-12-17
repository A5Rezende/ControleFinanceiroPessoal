import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Show_Category from "./pages/categories/Show";
import List_Category from "./pages/categories/List";
import Show_Record from "./pages/records/Show";
import List_Record from "./pages/records/List";
import PrivateRoute from "./components/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={
        <PrivateRoute>
          <Menu />
          <Dashboard />
        </PrivateRoute> } 
      />
      <Route path="/categories/show" element={
        <PrivateRoute>
          <Menu />
          <Show_Category />
        </PrivateRoute> } 
      />
      <Route path="/categories/list" element={
        <PrivateRoute>
          <Menu />
          <List_Category />
        </PrivateRoute> } 
      />
      <Route path="/categories/show/:id" element={
        <PrivateRoute>
          <Menu />
          <Show_Category />
        </PrivateRoute> } 
      />

      <Route path="/records/show" element={
        <PrivateRoute>
          <Menu />
          <Show_Record />
        </PrivateRoute> } 
      />
      <Route path="/records/list" element={
        <PrivateRoute>
          <Menu />
          <List_Record />
        </PrivateRoute> } 
      />
      <Route path="/records/show/:id" element={
        <PrivateRoute>
          <Menu />
          <Show_Record />
        </PrivateRoute> } 
      />
    </Routes>
  </BrowserRouter>
);

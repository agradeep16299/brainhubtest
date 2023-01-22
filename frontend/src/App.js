import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Checkout from "./Components/Checkout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import AddProduct from "./Components/AddProduct";
import AdminRoute from "./Components/AdminRoute";


function App() {
  return (

    <Router>
      <Container>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addproduct" element={
            <AdminRoute >
          <AddProduct />
          </AdminRoute>
          } />
          
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtectWrapper from "./pages/userProtectWrapper";
import Userhome from "./pages/UserHome";
import Userlogout from "./pages/Userlogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
const App=()=>{
  return(
    <div>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignup/>}/>
        <Route path="/UserHome" element={
          <UserProtectWrapper>
            <Userhome/>
          </UserProtectWrapper>}/>
        <Route path="/users/logout" element={<Userlogout/>}/>  
        <Route path="/CaptainHome" element={
          <CaptainProtectWrapper>
          <CaptainHome/>
          </CaptainProtectWrapper>}/>
          </Routes>
    </div>
  )
}
export default App
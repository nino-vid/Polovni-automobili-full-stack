import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import CarInfo from "./pages/Car-info";
import Login from "./pages/Login";
import SearchPage from "./pages/Search";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import ProfilePage from "./pages/Profile";
import PostaviOglas from "./pages/PostaviOglas";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<Main />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route
          exact
          path="/registration-success"
          element={<RegistrationSuccess />}
        ></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/car-info/:id" element={<CarInfo />}></Route>
        <Route exact path="/auto-oglasi" element={<SearchPage />}></Route>
        <Route exact path="/profile" element={<ProfilePage />}></Route>
        <Route exact path="/postavi-oglas" element={<PostaviOglas />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

//////////////////////////////////////////////////

// AdID
// :
// 22297812
// brandName
// :
// "Alfa Romeo"
// category
// :
// 26
// chassis
// :
// "Limuzina"
// city
// :
// "Ljukovo"
// color
// :
// "Crna"
// country
// :
// "Srbija"
// doornum
// :
// "4/5 vrata"
// featured
// :
// true
// featured_info
// :
// null
// featured_xl
// :
// true
// fixed
// :
// false
// fuelType
// :
// "Dizel"
// gearBox
// :
// "Manuelni 6 brzina"
// images_xl
// :
// (4) [{…}, {…}, {…}, {…}]
// mileage
// :
// 321000
// modelName
// :
// "156"
// new
// :
// false
// ownerId
// :
// 765423
// photoLink
// :
// (4) ['https://gcdn.polovniautomobili.com/user-images/thumbs/2229/22297812/2cc2a18343d4-120x90.jpg', 'https://gcdn.polovniautomobili.com/user-images/thumbs/2229/22297812/2cc2a18343d4-240x180.jpg', 'https://gcdn.polovniautomobili.com/user-images/thumbs/2229/22297812/2cc2a18343d4-480x360.jpg', 'https://gcdn.polovniautomobili.com/user-images/thumbs/2229/22297812/2cc2a18343d4-720x540.jpg']
// power
// :
// 103
// power_raw
// :
// "103.00"
// price
// :
// 1200
// tag_block
// :
// "1.200 €, 2005 god., 321.000 km, Limuzina, Dizel, 103kW (140KS), Crna, 4/5 vrata, 5 sedišta, Manuelni 6 brzina, A.Klima, Ljukovo, 20.09.2023."
// title
// :
// "Alfa Romeo 156 "
// url
// :
// "/auto-oglasi/22297812/alfa-romeo-156"
// year
// :
// 2005
// zamena
// :
// false

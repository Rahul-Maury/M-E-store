import React from 'react'
// import {BrowserRouter as Router} from "react-router-dom"
import { ReactNavbar } from "overlay-navbar";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/logo.png";

const options = {
  profileIcon:true,
  profileIconColor: "rgb(33, 32, 38)",
  ProfileIconElement: MdAccountCircle, 
  searchIcon:true,
  searchIconColor: "rgb(33, 32, 38)",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconColor: "rgb(33, 32, 38)",
  CartIconElement:MdAddShoppingCart,

burgerColor:"rgb(9, 37, 64)",
navColor1:"rgb(178, 203, 233)",


  // burgerColorHover: "#eb4034",
  burgerColorHover:"rgb(245, 252, 255)",
  logo,
  logoWidth: "20vmax",
  // navColor1: "white",
  logoHoverSize: "10px",
  // logoHoverColor: "#eb4034",
  logoHoverColor:"rgb(245, 252, 255)",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  // link1Color: "rgba(35, 35, 35,0.8)",
  link1Color:"rgb(33, 32, 38)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",

  profileIconUrl: "/login",
  
  

  profileIconColorHover: "rgb(33, 32, 38)",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

  
const Header = () => {
  return (
    // <Router>
         <ReactNavbar {...options}/>
    // </Router>
   
  )
}

export default Header
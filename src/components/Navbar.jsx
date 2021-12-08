import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Navbar.css';
import { Badge } from "@material-ui/core";
import ImportContactsSharpIcon from "@mui/icons-material/ImportContactsSharp";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { searchBook } from "../Redux/searchRedux";



const Navbar = () => {
  const [search,setSearch]=useState('')
  const dispatch = useDispatch()
  const cart = useSelector(state=>state.cart.carts)

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }

  useEffect(() => {
    dispatch(searchBook(search));
  }, [search])

  return (
    <div className='nav'>
      <div className='logoContainer'>
        <ImportContactsSharpIcon style={{ fontSize: "30px" }} />
        <span>BOOKS STORE</span>
      </div>
      <div className='inputContainer'>
        <input placeholder="Search" onChange={handleChange} />
        <SearchOutlinedIcon />
      </div>
      <div className='cartContainer'>
            <Link to='/cart'>
            <Badge badgeContent={cart.length} color="primary">
              <ShoppingCartOutlined style={{color:'black'}}/>
            </Badge>
            </Link>
      </div>
    </div>
  );
};

export default Navbar;

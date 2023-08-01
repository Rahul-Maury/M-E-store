import React from 'react'
import { useState } from 'react' 
import MetaData from '../layout/MetaData'
import "./Search.css"

const Search = ({history}) => {
    const [keyword,setkeyword]=useState("");


    const searchSubmitHandler=(e)=>{
    e.preventDefault(); //stop re-loading form after sumbit
    if(keyword.trim()){ //trim() remove the space 
   history.push(`/products/${keyword}`);
    }
     else{
        history.push("/products");
     }
    }
  return (
    <>
       <MetaData title={ `Search a Product E-COMMERCE`}/>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
          <input type='text'
           placeholder='Search a Product...'
           onChange={(e)=>setkeyword(e.target.value)}
             
          />

          <input type="submit" value="Search"/>
      </form>
    </>
  )
}

export default Search
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import React from "react";
import DataManipulation from "./components/DataManipulation";
// const url="http://localhost:5000/api/users"


const App = () => {

//   const [data,setData]=useState([]);

// const fetchData = async() => {
//     try {
//       const response=await axios.get(url)
//     const data=response.data
//     // console.log(data)
//      setData(data)
//     } catch (error) {
//       console.log(error)
//     }
// }

//   useEffect(()=>{
//    fetchData();
//   },[data]);

  // console.log(data)

  // return (
    return(
 <React.Fragment>
  

  {/* {data.map((item)=>{
    // const{name,email}=item
   return <>
   <h5 key={item.name}>Name:{name}</h5>
   <p key={item.email}>Email:{email}</p>
   </> */}
   {/* {data.map((item)=>{
   return <React.Fragment>
   <h5 key={item.name}>Name:{item.name}</h5>
   <p key={item.email}>Email:{item.email}</p>
   </React.Fragment>

  })} */}
  <DataManipulation />

 </React.Fragment>
  );
}

export default App;
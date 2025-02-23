import React from 'react'
import {useContext,useState} from "react"
import { Usercontext } from '../context/Usecontext'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Allimages from '../components/Allimages';

const Home = () => {
  const { user } = useContext(Usercontext);
  
console.log(user)


  return (
    <div className='min-h-screen'>
      <Navbar/>
      <Hero/>
      <Allimages/>

    </div>
  )
}

export default Home
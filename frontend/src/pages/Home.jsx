import React from 'react'
import Header from '../components/Header'
import Specialitymenu from '../components/Specialitymenu'
import Doctorlist from '../components/Doctorlist'
import Banner from '../components/Banner'
const Home = () => {
  return (
    <div>
      <Header />
      <Specialitymenu />
      <Doctorlist />
      <Banner/>

    </div>
  )
}

export default Home

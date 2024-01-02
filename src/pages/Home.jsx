import React from 'react'
import Hero from '../components/Hero'
import Movieraw from '../components/Movieraw'
import endpoints from '../services/movieServices'

const home = () => {
  return (
    <>
        <Hero />
        <Movieraw title="upcoming" url={endpoints.upcoming}/>
        <Movieraw title="trending" url={endpoints.trending}/>
        <Movieraw title="top rated" url={endpoints.topRated}/>
        <Movieraw title="comedy" url={endpoints.comedy}/>
        <Movieraw title="popular" url={endpoints.popular}/>
        
    </>

  )
}

export default home

import React from 'react'
import Carousel from './Carousel'
import Feed from '../feed/Feed'

const Home = () => {

  return (
    <div>
      <Feed />
      <h3>Learning Opportunities</h3>
      <div>
        <Carousel />
      </div>
      <h3>Latest from the Community</h3>
    </div>
  )
}

export default Home
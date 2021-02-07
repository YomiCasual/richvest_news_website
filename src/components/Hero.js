import React from 'react'
import { Button } from "@material-ui/core"


const Hero = () => {

    return (
      <div className="hero" id="home">
        <div className="overlay">
    
          <div className="hero-title">
            <span>Browse, Search &</span>
            <span>Read News Easily</span>
            <span>With A Single Click</span>

            <Button variant="contained" color="primary" href="#top_headlines"
            className="hero-button"
            >Get Started</Button>
        </div>
        </div>
        

      </div>
    );
}

export default Hero

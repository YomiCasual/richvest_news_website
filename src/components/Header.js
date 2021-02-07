import React from 'react'
import { Button } from '@material-ui/core'

const Header = () => {
    return (
      <div className="header">
        <p href="#home">RichVest News</p>
        <div className="header-tags">
          <Button href="#top_headline" className="header_button">
            Top Headlines
          </Button>
          <Button href="#sources" className="header_button">Sources</Button>
          <Button href="#all_news" className="header_button">All News</Button>
        </div>
      </div>
    );
}

export default Header

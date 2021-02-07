import React from 'react'
import {  Skeleton } from '@material-ui/lab'
import Carousel from "react-multi-carousel";
import { responsive } from "./Sections/AllNews";


const Loader = () => {
    return (
      <div style={{ marginLeft: "3rem"}} id="loader">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          
        >
          {[1, 2, 3, 4].map((item, index) => (
            <div key={index}>
                <Skeleton variant="rect" width="80%" height={170} />
                <Skeleton width="80%"/>
                <Skeleton width="60%" />
            </div>
          ))}
        </Carousel>
      </div>
    );
}

export default Loader

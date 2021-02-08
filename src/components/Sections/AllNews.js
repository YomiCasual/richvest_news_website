import React, { useState, useEffect } from "react";
import { TextField, Button,  } from "@material-ui/core";
import * as Axios from "axios";
import NewsCard from "./NewsCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loader from "../Loader";


export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


  


const AllNews = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  


  const fetchData = () => {
    setIsLoading(true);
    Axios.get(
      `https://newsapi.org/v2/everything?q=bitcoin&apiKey=3f97599099bc43aa86fb68e11ddc9ce2`
    )
      .then((res) => {
        let data = res.data;
        setBlogs(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleSearch = () => {
    if (search) {
        console.log(search)
      setIsLoading(true);
      Axios.get(
        `https://newsapi.org/v2/everything?q=${search}&language=en&apiKey=3f97599099bc43aa86fb68e11ddc9ce2`
      )
        .then((res) => {
          let data = res.data;
          setBlogs(data.articles);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      setSearch("");
    }
    else {
        fetchData()
    }
  };

  return (
    <div className="top-headline" id="all_news">
      <div className="header-div">
        <h2>All Articles</h2>
        <div>
          <TextField
            id="outlined-required"
            label="Enter your search here"
            value={search}
            variant="outlined"
            size="small"
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ marginRight: "1rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearch()}
          >
            {" "}
            Search{" "}
          </Button>
        </div>
      </div>

      <div className="news-blog">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Carousel
              responsive={responsive}
              itemClass="carousel-item-padding-40-px"
              containerClass="carousel-container"
              autoPlay={true}
              autoPlaySpeed={2000}
            >
              {blogs.map((blog, index) => (
                <div style={{ marginRight: "1rem" }} key={index}>
                  <NewsCard blog={blog} />
                </div>
              ))}
            </Carousel>

            {/* <div style={{ display: "flex", justifyContent: "center"}}>
                <Button variant="contained" color="secondary">Load More</Button>
              </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default AllNews;

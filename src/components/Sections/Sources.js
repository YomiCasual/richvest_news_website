import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import * as Axios from "axios";
import NewsCard from "./NewsCard";
import Carousel from "react-multi-carousel";
import { responsive } from './AllNews'
import Loader from "../Loader";
import { Autocomplete } from '@material-ui/lab'


const TopHeadlines = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allSources, setAllSources] = useState([])
  const [pickSource, setPickSource] = useState("bbc-news")

  const fetchData = () => {
    setIsLoading(true);
    Axios.get(
      `https://newsapi.org/v2/everything?sources=${pickSource}&apiKey=${process.env.REACT_APP_API_KEY}`
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

  const fetchSources = () => {
        Axios.get(
          `https://newsapi.org/v2/sources?apiKey=${process.env.REACT_APP_API_KEY}`
        )
          .then((res) => {
            let data = res.data;
            setAllSources(data.sources);
          })
          .catch((err) => {});
  }

  useEffect(() => {
    fetchData();
    fetchSources()
  }, []);

  const handleSearch = () => {
    if (pickSource) {
         fetchData();
    }
  
  };

  return (
    <div className="top-headline" id="sources">
      <div className="header-div">
        <h2>News Source</h2>
        <div style={{ display: "flex", alignItems: "center"}}>
          <Autocomplete
            id="sources"
            size="small"
            fullWidth
            options={allSources ? allSources : []}
            getOptionLabel={(option) => option.name}
            style={{
              marginRight: "1rem",
              width: "150px",
              textTransform: "capitalize",
            }}
            onChange={(e, value) => {
              setPickSource(value?.id);
             
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="sources"
                variant="outlined"
                label="Search or Pick"
                value={pickSource}
              />
            )}
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
            <h3 style={{ marginBottom: "0.5rem" }}>
              Source:{" "}
              <span style={{ textTransform: "uppercase" }}>{blogs[0]?.source.id}</span>
            </h3>
            <Carousel
              responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={2000}
            >
              {blogs.map((blog, index) => (
                <div style={{ marginRight: "0.4rem" }} key={index}>
                  <NewsCard blog={blog} />
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
};

export default TopHeadlines;

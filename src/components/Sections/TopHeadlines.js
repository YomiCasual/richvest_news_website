import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, MenuItem } from "@material-ui/core"
import * as Axios from 'axios'
import NewsCard from './NewsCard'
import Loader from '../Loader';

export const chooseCategory = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const TopHeadlines = () => {

   
    const[search, setSearch] = useState("")
     const [blogs, setBlogs] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const [category, setCategory] = useState("")


     const fetchData = () => {
       setIsLoading(true);
       Axios.get(
         `https://newsapi.org/v2/top-headlines?pageSize=12&language=en&apiKey=3f97599099bc43aa86fb68e11ddc9ce2`
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
      if (search ||category) {
          setIsLoading(true);
        Axios.get(
          `https://newsapi.org/v2/top-headlines?q=${search}&category=${category}&pageSize=12&language=en&apiKey=3f97599099bc43aa86fb68e11ddc9ce2`
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
      <div className="top-headline" id="top_headline">
        <div className="header-div">
          <h2>Top Headlines</h2>
          <div>
            <TextField
              id="outlined-required"
              label="Pick a Category"
              select
              value={category}
              variant="outlined"
              size="small"
              onChange={(e) => setCategory(e.target.value)}
              style={{
                marginRight: "1rem",
                width: "150px",
                textTransform: "capitalize",
              }}
            >
              <MenuItem value="">None</MenuItem>
              {chooseCategory.map((category, index) => (
                <MenuItem
                  key={index}
                  value={category}
                  style={{ textTransform: "capitalize" }}
                >
                  {category}
                </MenuItem>
              ))}
            </TextField>
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
              className="top-search"
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
              <Grid container spacing={3}>
                {blogs.map((blog, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <NewsCard blog={blog} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      </div>
    );
}

export default TopHeadlines

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography  }from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    boxShadow: "none",
    border: "0"
  },
  media: {
    height: 140,
  },
});

const NewsCard = (props) =>  {
  const classes = useStyles();
  const { blog } = props

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={blog.urlToImage || "https://via.placeholder.com/150"}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            style={{ lineHeight: "28px", fontWeight: "normal" }}
          >
            {blog.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {blog.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p"s style={{ marginTop: "0.5rem"}}>
            - {blog.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={blog.url} target="_blank">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default NewsCard
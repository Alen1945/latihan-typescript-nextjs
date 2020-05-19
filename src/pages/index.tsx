import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { GetServerSideProps } from "next";
import MovieInterface from "../interface/movieInterface";
import {
  Container,
  Paper,
  Box,
  Grid,
  Card,
  CardMedia,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/styles";
import { GetData } from "../helpers/Crud";
import Link from "../components/Link";
const styles = makeStyles({
  paper: {
    height: "200px",
    overflow: "hidden",
    position: "relative",
    backgroundImage:
      "url(https://static.rogerebert.com/uploads/review/primary_image/reviews/the-swan-2018/Swan-2018-image.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  titleWeb: {
    color: "#fff",
    textAlign: "right",
  },
  containerPoster: {
    position: "absolute",
    bottom: "0px",
    width: "100%",
  },
  titleMovie: {
    display: "flex",
    alignItems: "center",
    padding: "5px",
    justifyContent: "space-between",
    textDecoration: "none",
    backgroundColor: "rgba(0,0,0,.7)",
  },
  iconArrow: {
    color: "#222",
    padding: 3,
    fontSize: "12px",
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
});
const HomePage: React.FC = ({ movie }: MovieInterface[] | undefind) => {
  const [dataMovie, setDataMovie] = useState(movie);
  const classes = styles();
  return (
    <Layout title="Home Movie">
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Paper className={classes.paper} elevation={3}>
          <Box style={{ position: "absolute", bottom: "20px", right: "20px" }}>
            <h2 className={classes.titleWeb}>IndoMovie</h2>
            <h5 className={classes.titleWeb} style={{ marginTop: "-20px" }}>
              Streaming Movie
            </h5>
          </Box>
        </Paper>
      </Container>
      <Container
        maxWidth="md"
        style={{ marginTop: "30px", paddingBottom: "100px" }}
      >
        <Grid container spacing={2}>
          {dataMovie.length > 0 &&
            dataMovie.map((v, i) => (
              <Grid
                item
                lg={3}
                sm={4}
                xs={6}
                style={{ height: "300px" }}
                key={i}
              >
                <Card style={{ height: "100%", position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={v.Poster}
                    style={{ heigt: "100%" }}
                  />
                  <Box className={classes.containerPoster}>
                    <Link
                      href="/[movieId]"
                      as={`/${i + 1}`}
                      className={classes.titleMovie}
                    >
                      <h5 style={{ color: "#fff", margin: 0 }}>{v.Title}</h5>
                      <ArrowForwardIosIcon className={classes.iconArrow} />
                    </Link>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data: MovieInterface[] | undefined = await GetData(
    "https://www.omdbapi.com/?apiKey=b445ca0b&s=avenger"
  );
  return {
    props: { movie: data },
  };
};

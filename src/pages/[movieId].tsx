import Layout from "../Layout/Layout";
import { useRouter } from "next/router";
import { Container, Box, Grid, Card, CardMedia } from "@material-ui/core";
import { GetData } from "../helpers/Crud";
import { makeStyles } from "@material-ui/styles";
import { GetServerSideProps } from "next";
import MovieInterface from "../interface/movieInterface";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Link from "../components/Link";
const styles = makeStyles({
  rootContainer: {
    marginTop: "30px",
  },
  link: {
    textDecoration: "none",
    color: "#555",
  },
});
export default function Movie({
  detailMovie,
}: MovieInterface | undefined): React.ReactNode {
  const classes = styles();
  const router = useRouter();
  return (
    <Layout title={detailMovie.Title}>
      <Container maxWidth="md" className={classes.rootContainer}>
        <Box style={{ width: "100%", alignItems: "center", padding: "10px" }}>
          <Link href="/" className={classes.link}>
            Home
          </Link>
          <ArrowForwardIosIcon
            style={{
              fontSize: "12px",
              marginRight: "5px",
              color: "#222",
              marginLeft: "5px",
            }}
          />
          <Link
            className={classes.link}
            style={{ color: "#222" }}
            as={router.asPath}
            href="/[movieId]"
          >
            {detailMovie.Title}
          </Link>
        </Box>
      </Container>
      <Container maxWidth="md" className={classes.rootContainer}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6}>
            <Card style={{ height: "600px" }}>
              <CardMedia
                component="img"
                style={{ height: "100%" }}
                image={detailMovie.Poster}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <h5 style={{ margin: 0 }}>{detailMovie.Type}</h5>
            <h6 style={{ margin: 0 }}>{detailMovie.Year}</h6>
            <h1 style={{ margin: 0, marginBottom: "15px", marginTop: "15px" }}>
              {detailMovie.Title}
            </h1>
            <h5 style={{ margin: 0 }}>Description</h5>
            <p>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum It is a
              long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout. The point
              of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
type queryMovie = {
  movieId: integer;
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data: MovieInterface[] | undefined = await GetData(
    "https://www.omdbapi.com/?apiKey=b445ca0b&s=avenger"
  );
  const query: queryMovie = ctx.query;
  return {
    props: { detailMovie: data[query.movieId - 1] },
  };
};

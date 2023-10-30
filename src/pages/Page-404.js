import React from "react";
import Navigation from "../components/header/Navigation";
import classes from "./styles/Page404.module.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Page404 = () => {
  return (
    <div>
      <Navigation />
      <div className={classes.dataError}>
        <div className={classes.dataImage}></div>
        <div className={classes.dataText}>
          <p className={classes.paragraph}>Page Not Found</p>
          <p className={classes.text}>
            Uh oh, we can't seem to find the page you're looking for. Try going
            back to the previous page or see our Help Center for more
            information.{" "}
          </p>
          <Link className={classes.link} to="/">
            Go to your feed
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page404;

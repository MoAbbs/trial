import React, { Fragment } from "react";
import Footer from "./Components/Footer";
import IncreaseValue from "./Components/IncreaseValue";
import Main from "./Components/Main";
import Pricing from "./Components/Pricing";
import Profits from "./Components/Profits";
import Questions from "./Components/Questions";
import Welcome from "./Components/Welcome";
import WhatOffer from "./Components/WhatOffer";

const Home = () => {
  return (
    <Fragment>
      <div>
        <Main />
        <Welcome />
        <Profits />
        <Questions />
        <IncreaseValue />
        <WhatOffer />
        <Pricing />
        <Footer />
      </div>
    </Fragment>
  );
};
export default Home;

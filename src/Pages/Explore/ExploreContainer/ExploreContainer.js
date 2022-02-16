import React from "react";
import Drones from "../../Home/Drones/Drones";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";

const ExploreContainer = () => {
  return (
    <>
      <Navigation />
      <Drones url="https://still-castle-43681.herokuapp.com/drones" />
      <Footer />
    </>
  );
};

export default ExploreContainer;

import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import Banner from "../Banner/Banner";
import Drones from "../Drones/Drones";
import Reviews from "../Reviews/Reviews";

const HomeContainer = () => {
  return (
    <div>
      <Navigation />
      <Banner />
      <Drones url="https://still-castle-43681.herokuapp.com/drones/homeDrones" />
      <Reviews />
      <Footer />
    </div>
  );
};

export default HomeContainer;

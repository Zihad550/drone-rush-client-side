import React from "react";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import Drones from "../Drones/Drones";
import Reviews from "../Reviews/Reviews";

const HomeContainer = () => {
  return (
    <div>
      <Banner />
      <Drones url="https://still-castle-43681.herokuapp.com/drones/homeDrones" />
      <Reviews />
      <ContactUs />
    </div>
  );
};

export default HomeContainer;

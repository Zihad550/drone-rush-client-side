import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import Drones from "../Drones/Drones";
import Reviews from "../Reviews/Reviews";

const HomeContainer = () => {
  return (
    <div>
      <Navigation />
      <Banner />
      <Drones url="http://localhost:5000/drones/homeDrones" />
      <Reviews />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomeContainer;

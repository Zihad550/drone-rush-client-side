import React from "react";
import Footer from "../../Shared/Footer";
import Header from "../../Shared/Header";
import AboutUsBanner from "./AboutUsBanner";
import OurTeam from "./OurTeam";
import WhyUs from "./WhyUs";

const AboutUs = () => {
  return (
    <>
      {/* header */}
      <Header />
      {/* main  */}
      {/* banner */}
      <AboutUsBanner />

      {/* why us */}
      <WhyUs />

      {/* our team */}
      <OurTeam />
      {/* main */}
      {/* footer */}
      <Footer />
    </>
  );
};

export default AboutUs;

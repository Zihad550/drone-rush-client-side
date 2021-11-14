import React from "react";
import Drones from "../../Home/Drones/Drones";
import Navigation from "../../Shared/Navigation/Navigation";

const ExploreContainer = () => {
  return (
    <div>
      <Navigation />
      <Drones url="https://still-castle-43681.herokuapp.com/drones" />
    </div>
  );
};

export default ExploreContainer;

import React from "react";
import Drones from "../../Home/Drones/Drones";
import Navigation from "../../Shared/Navigation/Navigation";

const ExploreContainer = () => {
  return (
    <div>
      <Navigation />
      <Drones url="http://localhost:5000/drones" />
    </div>
  );
};

export default ExploreContainer;

import Banner from "./Banner";
import Drones from "./Drones";
import Reviews from "./Reviews";

const Home = () => (
  <div>
    <Banner />
    <Drones url="https://still-castle-43681.herokuapp.com/drones/homeDrones" />
    <Reviews />
  </div>
);

export default Home;

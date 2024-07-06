import { Helmet } from "react-helmet-async";
import Rooms from "../../components/Home/Rooms";
import Categories from "../../components/Categories/Categories";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>StayVista | Vacation Homes & Condo Rentals</title>
      </Helmet>
      {/* Categories section  */}
      <Categories />
      {/* Rooms section */}
      <Rooms />
    </div>
  );
};

export default Home;

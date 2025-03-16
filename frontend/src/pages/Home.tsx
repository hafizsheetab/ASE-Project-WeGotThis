import Navbar from "../modules/shared/components/Navbar";
import SearchFilters from "../modules/home/components/SearchFilters";
import OfferList from "../modules/home/components/OfferList";
import Footer from "../modules/shared/components/Footer";
import styles from "../modules/home/components/Home.module.css";
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <SearchFilters />
      <OfferList />
      <Footer />
    </div>
  );
};

export default Home;
import tum_additive from "../assets/image/tum_additive.webp";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="container">
      <h2>Herzlich Willkomen zu</h2>
      <img src={tum_additive} alt="tum_additive" />
      <a href="/exhibition">ENTDECKEN</a>
    </div>
  );
};

export default Home;

import ArgenPesos from "../../components/Home/ArgenPesos";
import Hero from "../../components/Home/Hero";
import OurProducts from "../../components/Home/OurProducts";
import RecomenProducts from "../../components/Home/RecomenProducts";

const Home = () => {
  return (
    <div className="px-5 w-full">
      <Hero />
      <OurProducts />
      <RecomenProducts />
      <ArgenPesos />
    </div>
  );
};

export default Home;

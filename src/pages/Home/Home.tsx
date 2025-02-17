import MainBanner from "./MainBanner";
import MapSection from "./MapSection";
import TreatmentArea from "./Treatment";
import { ScrollAnimation } from "../../components/ScrollAnimation";

const Home = () => {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
      <ScrollAnimation>
        <MainBanner />
      </ScrollAnimation>

      <ScrollAnimation animation="fade-up" delay={200}>
        <TreatmentArea />
      </ScrollAnimation>

      <ScrollAnimation animation="fade-up" delay={400}>
        <MapSection />
      </ScrollAnimation>
    </div>
  );
};

export default Home;

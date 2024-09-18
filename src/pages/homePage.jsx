import { HomeContent } from "../components/home/HomeContent";
import { HomeHeader } from "../components/home/HomeHeader";

export const HomePage = () => {
  return (
    <div className="lg:max-w-[1000px] mx-auto">
      
      <HomeHeader />
      <HomeContent />
    </div>
  );
};

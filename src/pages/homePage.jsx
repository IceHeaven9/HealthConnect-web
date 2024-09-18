import { HomeContent } from "../components/home/HomeContent";
import { HomeHeader } from "../components/home/HomeHeader";

export const HomePage = () => {
  return (
    <div className="max-w-full bg-smokeWhite sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] mx-auto px-4">
      <HomeHeader />
      <HomeContent />
    </div>
  );
};

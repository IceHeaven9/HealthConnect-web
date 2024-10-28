import { Header } from "../components/Header";
import { HomeTextCard } from "../components/home/HomeContent";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-0 z-10 w-full">
        <Header />
      </div>
      <div className="flex items-center justify-center mx-3 mt-20">
        <div className="max-w-full bg-lightCakeBlue rounded-2xl shadow-xl m-4  mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <HomeTextCard />
        </div>
      </div>
    </div>
  );
};

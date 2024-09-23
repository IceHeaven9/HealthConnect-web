import { HomeContent } from "../components/home/HomeContent";
import { HomeHeader } from "../components/home/HomeHeader";

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="absolute top-0 z-10 w-full">
        <HomeHeader />
      </div>
      <div className="flex items-center justify-center mt-20">
        <div className="max-w-full bg-lightCakeBlue rounded-2xl shadow-xl m-4 p-6 mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <div className="bg-smokeWhite rounded-lg w-full ">
            <HomeContent />
          </div>
        </div>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

export const DoctorUserCard = ({ currentUser, data }) => {
  return (
    <>
      <section className=" flex flex-col gap-3 items-center p-3 justify-between w-[50%] mx-auto mb-8">
        <img
          className="shadow-xl w-20 h-20 rounded-full border-lightBlue border-solid border-[0.1rem]"
          src={currentUser.decoded.avatar}
          alt="User Avatar"
        />
        <p className="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] font-ubuntu font-bold text-xl">
          {currentUser.decoded.userName}
        </p>
        <p className="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-center font-ubuntu text-lg italic">
          {data.specialities}
        </p>
      </section>
    </>
  );
};

DoctorUserCard.propTypes = {
  currentUser: PropTypes.shape({
    decoded: PropTypes.shape({
      avatar: PropTypes.string,
      userName: PropTypes.string,
    }),
  }),
  data: PropTypes.shape({
    specialities: PropTypes.string,
  }),
};

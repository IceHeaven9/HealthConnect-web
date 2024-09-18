import PropTypes from "prop-types";
import { forwardRef } from "react";

export const ConsultationDetailsTitle = forwardRef(({ navigate }, ref) => {
  return (
    <>
      <div ref={ref}></div>
    </>
  );
});

ConsultationDetailsTitle.propTypes = {
  navigate: PropTypes.func.isRequired,
};

ConsultationDetailsTitle.displayName = "ConsultationDetailsTitle";

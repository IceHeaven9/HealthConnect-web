import { forwardRef } from "react";

export const ConsultationDetailsTitle = forwardRef((_, ref) => {
  return (
    <>
      <div className="div oculto" ref={ref}></div>
    </>
  );
});

ConsultationDetailsTitle.displayName = "ConsultationDetailsTitle";

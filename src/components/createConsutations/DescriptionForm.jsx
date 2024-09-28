import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConsultationFetch } from "./fetch/createConsultationFetch";
import { notify } from "../../utils/notify";
import { DescriptionFormTopSection } from "./DescriptionFormTopSection";
import { DescriptionFormMidSection } from "./DescriptionFormMidSection";
import { DescriptionFormBottomSection } from "./DescriptionFormBottomSection";
import { Header } from "../Header";

export const DescriptionForm = ({
  selectedDate,
  selectedSpecialty,
  selectedDoctor,
  selectedHour,
}) => {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [textinput, setTextinput] = useState("");
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("TOKEN");

  const selectedDateTime = new Date(selectedDate);
  let formattedDateTime = "";
  if (!isNaN(selectedDateTime.getTime())) {
    const [hour, minute] = selectedHour.split(":");
    const combinedDateTime = new Date(
      selectedDateTime.getFullYear(),
      selectedDateTime.getMonth(),
      selectedDateTime.getDate(),
      parseInt(hour, 10),
      parseInt(minute, 10)
    );
    combinedDateTime.setHours(combinedDateTime.getHours() + 2);
    formattedDateTime = combinedDateTime
      .toISOString()
      .replace("T", " ")
      .substring(0, 16);
  }

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...filePreviews]);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleFileRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitWrapper = async (event) => {
    const consultationId = await createConsultationFetch(
      event,
      token,
      title,
      textinput,
      severity,
      selectedSpecialty,
      formattedDateTime,
      selectedDoctor,
      files,
      setTitle,
      setTextinput,
      setSeverity,
      setFiles,
      setPreviews,
      notify,
      navigate
    );
    if (consultationId) {
      navigate(`/consultation/${consultationId}/details`);
    }
  };
  return (
    <div>
      <div className="absolute top-0 z-10 w-full">
        <Header title="Datos de la consulta" showBackButton={true} />
      </div>
      <div className="bg-lightCakeBlue p-6 w-full mx-auto rounded-2xl mb-4 mt-[9rem] sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <div className="bg-smokeWhite rounded-lg">
          <form
            className="flex flex-col items-start justify-center mx-4 text-center "
            onSubmit={handleSubmitWrapper}
          >
            <DescriptionFormTopSection
              setTextinput={setTextinput}
              setTitle={setTitle}
              title={title}
              textinput={textinput}
            />

            <DescriptionFormMidSection
              severity={severity}
              setSeverity={setSeverity}
            />

            <DescriptionFormBottomSection
              files={files}
              handleFileChange={handleFileChange}
              previews={previews}
              handleFileRemove={handleFileRemove}
              textinput={textinput}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

DescriptionForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  selectedSpecialty: PropTypes.number,
  selectedDoctor: PropTypes.object,
  selectedHour: PropTypes.string,
  setShowDescriptionForm: PropTypes.func.isRequired,
};

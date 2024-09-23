import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConsultationFetch } from "./fetch/createConsultationFetch";
import { notify } from "../../utils/notify";
import { DescriptionTitle } from "./DescriptionTitle";
import { DescriptionFormTopSection } from "./DescriptionFormTopSection";
import { DescriptionFormMidSection } from "./DescriptionFormMidSection";
import { DescriptionFormBottomSection } from "./DescriptionFormBottomSection";

import { DinamicTitle } from "../DinamicTitle";
export const DescriptionForm = ({
  selectedDate,
  selectedSpecialty,
  selectedDoctor,
  selectedHour,
  setShowDescriptionForm,
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
    <div className="max-w-full bg-smokeWhite sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] mx-auto px-4">
      <DinamicTitle text="Datos de la consulta" />
      <DescriptionTitle setShowDescriptionForm={setShowDescriptionForm} />
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
        />

        <div className="w-full flex justify-center text-center p-4 text-xl mb-4 rounded-lg text-smokeWhite bg-lightBlue ">
          <button type="submit" disabled={!textinput}>
            Confirmar
          </button>
        </div>
      </form>
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

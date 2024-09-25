import { useContext, useEffect, useState, useRef } from "react";
import { useParams} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthGuard } from "../hooks/authGuard";
import { AuthContext } from "../contexts/authContext";
import { fetchConsultationDetails } from "../components/consultationDetails/fetch/consultationDetailsFetch";
import { ConsultationDetailsTitle } from "../components/consultationDetails/ConsultationDetailsTitle";
import { PatientSection } from "../components/consultationDetails/PatientSection";
import { DateSection } from "../components/consultationDetails/DateSection";
import { ConsultationTitle } from "../components/consultationDetails/ConsultationTitle";
import { DescriptionSection } from "../components/consultationDetails/DescriptionSection";
import { SeveritySection } from "../components/consultationDetails/SeveritySection";
import { StatusSection } from "../components/consultationDetails/StatusSection";
import { SpecialtySection } from "../components/consultationDetails/SpecialtySection";
import { DoctorButton } from "../components/consultationDetails/DoctorButton";
import { ConsultationFilesButton } from "../components/consultationDetails/ConsultationFilesSection";
import { ResponseButton } from "../components/consultationDetails/ResponseButton";
import { EditButton } from "../components/consultationDetails/EditButton";
import { CancelButton } from "../components/consultationDetails/CancelButton";
import { DinamicTitle } from "../components/DinamicTitle";

export const DetailsConsultationPage = () => {
  const { id } = useParams();
  const [consultationDetails, setConsultationDetails] = useState(null);
  const consultationId = consultationDetails?.id;
  const [showConsultationFiles, setShowConsultationFiles] = useState(false);
  const [showResponseFiles, setShowResponseFiles] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);
  const [userType, setUserType] = useState(null);
  const scrollToTopRef = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const userTypeForRender = currentUser?.decoded?.userType;
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
    severity: false,
  });


  useAuthGuard("/consultations/:id/details");

  // Fetch para obtener los datos de la consulta
  useEffect(() => {
    fetchConsultationDetails(
      setUserType,
      currentUser,
      setConsultationDetails,
      id
    );
  }, [id, currentUser]);

  if (!consultationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <div className="absolute top-0 z-10 w-full">
        <DinamicTitle text="Detalles de la consulta" />
        <ConsultationDetailsTitle    
        ref={scrollToTopRef}      
        />
      </div>
      <div className="flex items-center justify-center m-auto mx-4 mt-20 w-full">
        <div className="bg-lightCakeBlue rounded-2xl shadow-xl m-4 p-6 w-full sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <main className="bg-smokeWhite rounded-lg p-4">
            <PatientSection consultationDetails={consultationDetails} />
            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
            <DateSection consultationDetails={consultationDetails} />
            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
            <ConsultationTitle
              userType={userType}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              id={id}
              consultationDetails={consultationDetails}
              setConsultationDetails={setConsultationDetails}
            />
            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
            <DescriptionSection
              userType={userType}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              id={id}
              consultationDetails={consultationDetails}
              setConsultationDetails={setConsultationDetails}
            />
            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
            <SeveritySection
              userType={userType}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              id={id}
              consultationDetails={consultationDetails}
              setConsultationDetails={setConsultationDetails}
            />
            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>

            <StatusSection consultationDetails={consultationDetails} />

            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
            <SpecialtySection consultationDetails={consultationDetails} />
            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
            <div className="w-full flex flex-col items-center gap-4">
              {userTypeForRender !== "doctor" && (
                <DoctorButton
                  setShowDoctor={setShowDoctor}
                  showDoctor={showDoctor}
                  consultationDetails={consultationDetails}
                  currentUser={currentUser}
                />
              )}
              <ConsultationFilesButton
                setShowConsultationFiles={setShowConsultationFiles}
                showConsultationFiles={showConsultationFiles}
                consultationDetails={consultationDetails}
              />
              <ResponseButton
                consultationId={consultationId}
                showResponseFiles={showResponseFiles}
                setShowResponseFiles={setShowResponseFiles}
                consultationDetails={consultationDetails}
                currentUser={currentUser}
              />

              <div className="w-full flex  mx-4  gap-2">
                {userTypeForRender !== "doctor" && (
                  <>
                    <EditButton
                      consultationDetails={consultationDetails}
                      scrollToRef={scrollToTopRef}
                      setIsEditing={setIsEditing}
                      isEditing={isEditing}
                    />
                    <CancelButton
                      setConsultationDetails={setConsultationDetails}
                      consultationDetails={consultationDetails}
                    />
                  </>
                )}
                <ToastContainer />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

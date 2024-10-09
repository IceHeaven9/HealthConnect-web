import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { NotFoundPage } from "./pages/notFoundPage";
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";
import { CreateConsultationPage } from "./pages/createConsultationPage";
import { ValidateEmailPage } from "./pages/validateEmailPage";
import { RecoveryAccountPage } from "./pages/recoveryAccountPage";
import { ResetPasswordPage } from "./pages/resetPasswordPage";
import { DetailsConsultationPage } from "./pages/detailsConsultationsPage";
import { Footer } from "./components/Footer";
import { ConsultationPage } from "./pages/consultationPage";
import { ConsultationDoctorPage } from "./pages/consultationDoctorPage";
import { UnassignedDoctorConsultationPage } from "./pages/unassignedDoctorConsultationPage";
import { DoctorsPage } from "./pages/doctorPage";
import { SpecialitiesPage } from "./pages/specialitiesPage";
import { UserProfile } from "./pages/userProfilePage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 my-auto">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/validate-email" element={<ValidateEmailPage />} />
            <Route path="/my-consultations" element={<ConsultationPage />} />
            <Route
              path="/my-doctor-consultations"
              element={<ConsultationDoctorPage />}
            />
            <Route
              path="/my-doctor-unassigned-consultations"
              element={<UnassignedDoctorConsultationPage />}
            />
            <Route
              path="/create-consultation"
              element={<CreateConsultationPage />}
            />
            <Route
              path="/consultation/:id/details"
              element={<DetailsConsultationPage />}
            />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/specialities" element={<SpecialitiesPage />} />
            <Route path="/recovery-account" element={<RecoveryAccountPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

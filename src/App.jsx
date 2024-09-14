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
<<<<<<< HEAD
import { UserProfile } from "./pages/UserProfilePage";
=======
import { UserProfilePage } from "./pages/userProfilePage";
import { Footer } from "./components/Footer";
import { ConsultationPage } from "./pages/ConsultationPage";
import { ConsultationDoctorPage } from "./pages/consultationDoctorPage";
>>>>>>> 1df6d238ae83439ffbb24b7e9d35ed783bb76ba2

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/validate-email" element={<ValidateEmailPage />} />
          <Route path="/my-consultations" element={<ConsultationPage />} />
          <Route
            path="/my-doctor-consultations"
            element={<ConsultationDoctorPage />}
          />
          <Route
            path="/create-consultation"
            element={<CreateConsultationPage />}
          />
          <Route
            path="/consultation/:id/details"
            element={<DetailsConsultationPage />}
          />
          <Route path="/recovery-account" element={<RecoveryAccountPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

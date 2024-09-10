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
import { DetailsConsultationPage } from "./pages/detailsConsultationsPage"
import {UserProfilePage} from './pages/userProfilePage';
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/validate-email" element={<ValidateEmailPage />} />
          <Route
            path="/create-consultation"
            element={<CreateConsultationPage />}
          />
          <Route
            path="/consultation/:id/details"
            element={<DetailsConsultationPage />}
          />
          <Route
            path="/recovery-account"
            element={<RecoveryAccountPage />}
          />
          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;

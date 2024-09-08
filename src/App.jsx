import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { NotFoundPage } from "./pages/notFoundPage";
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";
import { EditConsultationPage } from "./pages/editConsultationPage";
import { CreateConsultationPage } from "./pages/createConsultationPage";
import { ValidateEmailPage } from "./pages/validateEmailPage";
<<<<<<< HEAD
import { ResetPasswordPage } from './pages/resetPasswordPage';
import { RecoveryAccountPage } from "./pages/recoveryAccountPage";
=======
import { AuthContextProvider } from "./contexts/authProvider";
import { ResetPasswordPage } from "./pages/resetPasswordPage";
import { DetailsConsultationPage } from "./pages/detailsConsultationsPage";
>>>>>>> detailsConsultations

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
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
            path="/consultation/:id/edit"
            element={<EditConsultationPage />}
          />
<<<<<<< HEAD
          <Route
            path="/recovery-account"
            element={<RecoveryAccountPage />}
          />
          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />
=======
          <Route path="/recovery-account" element={<RecoveryPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
>>>>>>> detailsConsultations
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

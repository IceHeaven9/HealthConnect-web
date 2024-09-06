import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { NotFoundPage } from "./pages/notFoundPage";
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";
import { EditConsultationPage } from "./pages/editConsultationPage";
import { CreateConsultationPage } from "./pages/createConsultationPage";
import { RecoveryPasswordPage } from "./pages/recoveryPasswordPage";
import { ValidateEmailPage } from "./pages/validateEmailPage";
import { AuthContextProvider } from "./contexts/authProvider";
import { ResetPasswordPage } from "./pages/resetPasswordPage";
import { DetailsConsultationPage } from "./pages/detailsConsultationsPage";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
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
            path="/consultations/:id/details"
            element={<DetailsConsultationPage />}
          />
          <Route
            path="/consultation/:id/edit"
            element={<EditConsultationPage />}
          />
          <Route path="/recovery-account" element={<RecoveryPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

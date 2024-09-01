import { RecoveryPassForm } from "../components/forms/RecoveryPassForm";
import { SingleTitle } from "../components/SingleTitle";

export const ResetPasswordPage = () => {
  return (
    <div className="bg-white">
      <SingleTitle />
      <RecoveryPassForm />
    </div>
  );
};

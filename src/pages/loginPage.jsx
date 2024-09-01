import { LoginForm } from "../components/forms/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div>Header</div>
      <LoginForm />
      <div>Footer</div>
    </div>
  );
};

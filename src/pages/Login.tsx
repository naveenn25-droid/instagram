import { AuthLayout } from "../components/layout/AuthLayout";
import { HeroSection } from "../components/hero/HeroSection";
import { LoginForm } from "../components/form/LoginForm";

export const Login = () => {
  return (
    <AuthLayout 
      hero={<HeroSection />}
      form={<LoginForm />}
    />
  );
};

export default Login;

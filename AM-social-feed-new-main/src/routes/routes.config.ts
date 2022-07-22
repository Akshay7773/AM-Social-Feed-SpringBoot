import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const Register = lazy(() => import("../pages/auth/register/register"));
const ForgotPass = lazy(() => import("../pages/auth/forgotPass/forgotPass"));
const ResetPassword = lazy(() => import("../pages/auth/forgotPass/getToken"));
const EditProfile = lazy(() => import("../pages/home/EditProfile"));
/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  register: "/auth/register",
  forgotPass: "/auth/forgotPass",
  resetPassword: "/auth/reset-password",
  editProfile: "/editProfile",
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.register,
    component: Register,
  },
  {
    path: paths.forgotPass,
    component: ForgotPass,
  },
  {
    path: paths.resetPassword,
    component: ResetPassword,
  },
  {
    path: paths.editProfile,
    component: EditProfile,
  },
];

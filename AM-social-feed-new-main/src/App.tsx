import "./App.css";
import { Suspense } from "react";
import { AppLoader } from "./components/app-loader";
import { AppNavigator } from "./components/app-navigator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { authenticationService } from "./utils/auth.service";
import EditProfile from "./pages/home/EditProfile";
export const UserContext = createContext<any>();
function App() {
  const [count, setCount] = useState(0);
  const [headerName, setHeaderName] = useState("HOME");
  const [editOpen, setEditOpen] = useState(false);

  // const [user, setUser] = useState<any>(
  //   JSON.parse(localStorage.getItem("currentUser") || undefined)
  // );
  // useEffect(() => {
  //   const loggedUserFun = async () => {
  //     const users = await authenticationService.getLoggedUser();
  //     setUser(users);
  //   };
  //   loggedUserFun();
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("currentUser", JSON.stringify(user));
  // }, [user]);

  // console.log(user);
  return (
    <UserContext.Provider
      value={{
        count,
        setCount,
        headerName,
        setHeaderName,
        editOpen,
        setEditOpen,
      }}
    >
      <Suspense fallback={<AppLoader />}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AppNavigator />
        <EditProfile />
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;

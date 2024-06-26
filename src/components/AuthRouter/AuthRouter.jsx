import Login from "../users/Forms/Login";

const AuthRouter = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user?.token ? true : false;
  if (!isLoggedIn) return <Login />;
  return <>{children}</>;
};

export default AuthRouter;

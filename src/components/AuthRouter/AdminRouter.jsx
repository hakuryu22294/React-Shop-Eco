import Login from "../users/Forms/Login";

const AdminRouter = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.user?.role === "admin" ? true : false;
  if (!isAdmin) return <h1>Access Denied, Admin Only</h1>;
  return <div>{children}</div>;
};

export default AdminRouter;

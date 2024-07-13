import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const HostRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "host") return children;
  return <Navigate to="/dashboard" />;
};

HostRoute.propTypes = {
  children: PropTypes.node,
};

export default HostRoute;

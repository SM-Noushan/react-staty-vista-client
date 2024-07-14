import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";

const Statistics = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  return <>{role === "admin" && <AdminStatistics />}</>;
};

export default Statistics;

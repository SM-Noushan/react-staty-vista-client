import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import HostStatistics from "../../../components/Dashboard/Statistics/HostStatistics";
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import GuestStatistics from "../../../components/Dashboard/Statistics/GuestStatistics";

const Statistics = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {role === "admin" ? (
        <AdminStatistics />
      ) : role === "host" ? (
        <HostStatistics />
      ) : (
        <GuestStatistics />
      )}
    </>
  );
};

export default Statistics;

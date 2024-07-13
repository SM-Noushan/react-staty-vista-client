import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import UpdateUserModal from "../../Modals/UpdateUserModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDataRow = ({ user, refetch }) => {
  const { user: currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Update Status
  const { mutateAsync: updateStatusMutation } = useMutation({
    mutationFn: async (updatedDoc) => {
      const { data } = await axiosSecure.patch(
        `user/update/role/${user?.email}`,
        updatedDoc
      );
      return data.modifiedCount;
    },
    onSuccess: () => {
      refetch();
      toast.success("Role Updated");
    },
  });

  // Modal Handler
  const modalHandler = async (selectedRole) => {
    if (user?.role === selectedRole)
      return toast.error("Select a different role");
    const updatedDoc = {
      role: selectedRole,
      status: "Verified",
    };
    try {
      await updateStatusMutation(updatedDoc);
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          disabled={user.email === currentUser?.email}
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight disabled:cursor-not-allowed disabled:brightness-75"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;

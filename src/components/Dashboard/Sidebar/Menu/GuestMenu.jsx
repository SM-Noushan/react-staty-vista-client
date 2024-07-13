import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import HostModal from "../../../Modals/HostRequestModal";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import toast from "react-hot-toast";
import MenuItem from ".//MenuItem";
import PropTypes from "prop-types";
import { useState } from "react";

const GuestMenu = ({ host = false }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  // handle host request
  const { mutateAsync: hostRequestMutation } = useMutation({
    mutationFn: async () => {
      const userInfo = {
        email: user?.email,
        role: "guest",
        status: "Requested",
      };
      const { data } = await axiosSecure.put("/user", userInfo);
      return data;
    },
    onSuccess: (res) => {
      if (res.modifiedCount > 0)
        toast.success("Requested! Please wait for approval");
      else toast.success("Already Requested! Please wait for approval");
    },
    onError: () => {
      toast.error("Failed! Try again");
    },
  });
  const handleHostModalRequest = async () => {
    try {
      await hostRequestMutation();
    } catch (error) {
      toast.error(error.message);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      />

      {!host && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform text-gray-600 hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
          >
            <GrUserAdmin className="w-5 h-5" />

            <span className="mx-4 font-medium">Become A Host</span>
          </button>
          {/* Modal */}
          <HostModal
            isOpen={isModalOpen}
            closeModal={handleCloseModal}
            handleHostModalRequest={handleHostModalRequest}
          />
        </>
      )}
    </>
  );
};

GuestMenu.propTypes = {
  host: PropTypes.bool,
};

export default GuestMenu;

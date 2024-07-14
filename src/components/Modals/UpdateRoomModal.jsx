import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import { imageUpload } from "../../api/utils";
import UpdateRoomForm from "../Form/UpdateRoomForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UpdateRoomModal = ({ setIsEditModalOpen, isOpen, room, refetch }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState(room);
  const [imagePreview, setImagePreview] = useState("");
  const [imageText, setImageText] = useState("Upload Image");
  const [date, setDate] = useState({
    startDate: new Date(room?.from),
    endDate: new Date(room?.to),
    key: "selection",
  });

  //update room data and save to db
  const { mutateAsync: updateMutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = axiosSecure.patch(`/room/${room?._id}`, roomData);
      return data;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["my-listings", "room"]);
      toast.success("Updated successfully!");
      setIsEditModalOpen(false);
    },
    onError: () => {
      toast.error("Failed! Try again");
    },
  });

  // form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedRoomData = Object.assign({}, roomData);
      if (typeof updatedRoomData.image === "object")
        updatedRoomData.image = await imageUpload(updatedRoomData.image);
      delete updatedRoomData._id;
      await updateMutateAsync(updatedRoomData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //   date range handler
  const handleDate = (range) => {
    setDate(range.selection);
    setRoomData({
      ...roomData,
      from: range.selection.startDate,
      to: range.selection.endDate,
    });
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Room Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update room form */}
                  <UpdateRoomForm
                    date={date}
                    room={roomData}
                    loading={loading}
                    imageText={imageText}
                    handleDate={handleDate}
                    setRoomData={setRoomData}
                    setImageText={setImageText}
                    handleSubmit={handleSubmit}
                    imagePreview={imagePreview}
                    closeModal={setIsEditModalOpen}
                    setImagePreview={setImagePreview}
                  />
                </div>
                <hr className="mt-8 " />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdateRoomModal.propTypes = {
  isOpen: PropTypes.bool,
  room: PropTypes.object,
  refetch: PropTypes.func,
  setIsEditModalOpen: PropTypes.func,
};

export default UpdateRoomModal;

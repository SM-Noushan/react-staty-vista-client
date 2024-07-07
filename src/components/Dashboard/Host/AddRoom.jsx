import { useState } from "react";
import AddRoomForm from "../../Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });
  const [loading, setLoading] = useState(false);
  const [imageText, setImageText] = useState("Upload Image");
  const [imagePreview, setImagePreview] = useState("");

  //post roomData to server
  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = axiosSecure.post("/room", roomData);
      return data;
    },
    onSuccess: () => {
      toast.success("Room added");
      navigate("/dashboard/my-listings");
    },
    onError: () => {
      toast.error("Failed! Try again");
    },
  });

  //   date range handler
  const handleDate = (range) => {
    setDate(range.selection);
  };

  //   form handler
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const category = form.category.value;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const bedrooms = form.bedrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const from = date.startDate;
    const to = date.endDate;
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    try {
      const image_url = await imageUpload(image);
      const roomData = {
        location,
        title,
        category,
        price,
        guests,
        bathrooms,
        bedrooms,
        description,
        from,
        to,
        image: image_url,
        host,
      };
      //   console.log(roomData);
      // post req to server
      await mutateAsync(roomData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>

      {/* form */}
      <AddRoomForm
        date={date}
        handleDate={handleDate}
        imageText={imageText}
        setImageText={setImageText}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleForm={handleForm}
        loading={loading}
      />
    </>
  );
};

export default AddRoom;

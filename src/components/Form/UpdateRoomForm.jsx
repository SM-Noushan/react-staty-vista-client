import PropTypes from "prop-types";
import { categories } from "../Categories/CategoriesData";
import { DateRange } from "react-date-range";

const UpdateRoomForm = ({
  date,
  room,
  loading,
  imageText,
  closeModal,
  handleDate,
  setRoomData,
  handleSubmit,
  imagePreview,
  setImageText,
  setImagePreview,
}) => {
  const {
    location,
    category: currCategory,
    title,
    price,
    guests,
    bathrooms,
    bedrooms,
    description,
    image,
  } = room || {};
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-1 text-sm">
            <label htmlFor="location" className="block text-gray-600">
              Location
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="location"
              id="location"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setRoomData({ ...room, location: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="title" className="block text-gray-600">
              Title
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="title"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setRoomData({ ...room, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="category" className="block text-gray-600">
              Category
            </label>
            <select
              required
              className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
              name="category"
              value={currCategory}
              onChange={(e) =>
                setRoomData({ ...room, category: e.target.value })
              }
            >
              {categories.map((category) => (
                <option value={category.label} key={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="location" className="block text-gray-600">
              Select Availability Range
            </label>
            <div className="flex justify-center pt-2">
              {/* Calender */}
              <DateRange
                className="w-full"
                rangeColors={["#f43f5e"]}
                editableDateInputs={true}
                minDate={new Date()}
                endDatePlaceholder="End Date"
                onChange={(value) => handleDate(value)}
                moveRangeOnFirstSelection={false}
                ranges={[date]}
              />
            </div>
          </div>

          <div className="p-4 bg-white w-full m-auto rounded-lg">
            <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
              <label
                className={`flex justify-center gap-4 items-center ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <img
                  src={`${imagePreview || image}`}
                  alt="image-preview"
                  className="h-20 rounded-md"
                />
                <input
                  disabled={loading}
                  onChange={(e) => {
                    const image = e.target.files[0];
                    const imageName = image.name;
                    setImagePreview(URL.createObjectURL(image));
                    setImageText(
                      imageName.length > 20
                        ? imageName.split(".")[0].slice(0, 15) +
                            "..." +
                            imageName.split(".")[1]
                        : imageName
                    );
                    setRoomData({ ...room, image });
                  }}
                  className="text-sm w-36 hidden"
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  hidden
                />
                <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold p-1 px-3 hover:bg-rose-500">
                  {imageText}
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Price
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="price"
                id="price"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setRoomData({ ...room, price: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="guest" className="block text-gray-600">
                Total guest
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="guests"
                id="guest"
                type="number"
                placeholder="Total guest"
                value={guests}
                onChange={(e) =>
                  setRoomData({ ...room, guests: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="bedrooms" className="block text-gray-600">
                Bedrooms
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="bedrooms"
                id="bedrooms"
                type="number"
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={(e) =>
                  setRoomData({ ...room, bedrooms: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="bathrooms" className="block text-gray-600">
                Bathrooms
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="bathrooms"
                id="bathrooms"
                type="number"
                placeholder="Bathrooms"
                value={bathrooms}
                onChange={(e) =>
                  setRoomData({ ...room, bathrooms: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>

            <textarea
              id="description"
              className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
              name="description"
              value={description}
              onChange={(e) =>
                setRoomData({ ...room, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="mt-2 flex gap-x-4">
          <button
            type="submit"
            className="flex-1 p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
          >
            Update
          </button>
          {/* <button
            type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
            Update
          </button> */}
          <button
            type="button"
            className="flex-1 p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-emerald-500"
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateRoomForm.propTypes = {
  room: PropTypes.object,
  date: PropTypes.object,
  loading: PropTypes.bool,
  handleDate: PropTypes.func,
  closeModal: PropTypes.func,
  imageText: PropTypes.string,
  setRoomData: PropTypes.func,
  handleSubmit: PropTypes.func,
  setImageText: PropTypes.func,
  imagePreview: PropTypes.string,
  setImagePreview: PropTypes.func,
};

export default UpdateRoomForm;

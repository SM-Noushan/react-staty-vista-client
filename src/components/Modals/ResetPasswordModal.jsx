import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { Fragment, useRef } from "react";

const ResetPasswordModal = ({ closeModal, isOpen, resetEmail }) => {
  const resetEmailRef = useRef();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80" />
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
                  as="label"
                  htmlFor="resetEmail"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Email Address
                </DialogTitle>
                <input
                  ref={resetEmailRef}
                  type="email"
                  name="resetEmail"
                  id="resetEmail"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full mt-2 px-3 py-2 border rounded-md border-gray-300 focus:outline-sky-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                <hr className="mt-8 " />
                <div className="flex flex-row-reverse mt-2 justify-start gap-x-4">
                  <button
                    onClick={() => {
                      resetEmail(resetEmailRef.current.value);
                    }}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

ResetPasswordModal.propTypes = {
  closeModal: PropTypes.func,
  resetEmail: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ResetPasswordModal;

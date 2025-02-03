const SupportForm = ({
  setShowForm,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1F2A40] p-5 rounded-lg shadow-lg w-[90%] max-w-[500px] overflow-auto">
        <h2 className="text-green-600 text-xl font-bold mb-4">SUPPORT FORM</h2>
        <hr className="border-1 border-gray-600 mt-8 mb-8"></hr>
        <p className="text-[16px] text-gray-400 mb-5">
          File a ticket for personal response from our support team in case you
          did not find the answer in the FAQs.
        </p>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-[16px] mb-3 font-bold"
              htmlFor="subject"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              className="text-[14px] w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-400 focus:outline-none"
              placeholder="Enter the subject"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-400  text-[16px] mb-3 font-bold"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              className="text-[14px] w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-400 focus:outline-none"
              placeholder="Enter the issue description"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-400 text-[16px] mb-3 font-bold"
              htmlFor="impact"
            >
              How is this affecting you? <span className="text-red-500">*</span>
            </label>
            <select
              id="impact"
              className="text-[14px] w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-400 focus:outline-none cursor-pointer"
            >
              <option value="" disabled selected>
                Please select one...
              </option>
              <option value="casual" className="py-10">
                Just a casual question, idea, comment, or suggestion.
              </option>
              <option value="help" className="py-10">
                I need some help, but it is not urgent.
              </option>
              <option value="workaround" className="py-10">
                Something is broken, but I can work around it now.
              </option>
              <option value="urgent" className="py-10">
                I can not get things done until I hear back from you.
              </option>
              <option value="urgent" className="py-10">
                Extreme critical emergency!
              </option>
            </select>
          </div>

          <div className="flex mt-8">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-[50%]"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-[50%] ml-2"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportForm;

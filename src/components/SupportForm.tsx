import { useState, useEffect } from "react";
import { submitSupportForm } from "../services/postData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SupportFormProps {
  setShowForm: (show: boolean) => void;
}

const SupportForm: React.FC<SupportFormProps> = ({ setShowForm }) => {
  const [supportData, setSupportData] = useState({
    email: "",
    subject: "",
    description: "",
    impact: "",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    // Retrieve user from localStorage
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      // Assign the user's email to the support form state
      setSupportData((prevData) => ({
        ...prevData,
        email: parsedUser.email || "",
      }));
    }
  }, []);

  const submitMutation = useMutation({
    mutationFn: submitSupportForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support"] });
      setShowForm(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMutation.mutate(supportData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1F2A40] p-5 rounded-lg shadow-lg w-[90%] max-w-[500px] overflow-auto">
        <h2 className="text-green-600 text-xl font-bold mb-4">SUPPORT FORM</h2>
        <hr className="border-1 border-gray-600 mt-8 mb-8"></hr>
        <p className="text-[16px] text-gray-400 mb-5">
          File a ticket for a personal response from our support team.
        </p>
        <form onSubmit={handleSubmit}>
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
              value={supportData.subject}
              onChange={(e) =>
                setSupportData({ ...supportData, subject: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-[16px] mb-3 font-bold"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              className="text-[14px] w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-400 focus:outline-none"
              placeholder="Enter the issue description"
              value={supportData.description}
              onChange={(e) =>
                setSupportData({ ...supportData, description: e.target.value })
              }
              required
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
              value={supportData.impact}
              onChange={(e) =>
                setSupportData({ ...supportData, impact: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Please select one...
              </option>
              <option value="casual">
                Just a casual question, idea, comment, or suggestion.
              </option>
              <option value="help">
                I need some help, but it is not urgent.
              </option>
              <option value="workaround">
                Something is broken, but I can work around it now.
              </option>
              <option value="urgent">
                I cannot get things done until I hear back from you.
              </option>
              <option value="emergency">Extreme critical emergency!</option>
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

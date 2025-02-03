import { useState, useEffect } from "react";
import { createFaq, updateFaq } from "../services/postData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FaqData = {
  id?: string;
  question: string;
  answer: string;
};

type FaqFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  faqToEdit?: FaqData | null;
};

const FaqForm = ({ setShowForm, faqToEdit }: FaqFormProps) => {
  const [faq, setFaq] = useState<FaqData>({ question: "", answer: "" });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (faqToEdit) {
      setFaq(faqToEdit);
    }
  }, [faqToEdit]);

  const createMutation = useMutation({
    mutationFn: createFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FaqData }) =>
      updateFaq(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      setShowForm(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (faqToEdit && faqToEdit.id) {
      updateMutation.mutate({ id: faqToEdit.id, data: faq });
    } else {
      createMutation.mutate(faq);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1F2A40] p-5 rounded-lg shadow-lg w-[90%] max-w-[500px] overflow-auto">
        <h2 className="text-green-600 text-xl font-bold mb-4">
          {faqToEdit ? "Edit FAQ" : "Create FAQ"}
        </h2>
        <hr className="border-1 border-gray-600 mt-8 mb-8"></hr>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-[16px] mb-3 font-bold">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="text-[14px] w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-400 focus:outline-none"
              placeholder="Enter the question"
              value={faq.question}
              onChange={(e) => setFaq({ ...faq, question: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-[16px] mb-3 font-bold">
              Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              className="text-[14px] w-full p-2 border border-gray-700 rounded-sm bg-[#1F2A40] text-gray-400 focus:outline-none"
              placeholder="Enter the answer"
              value={faq.answer}
              onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
              required
            />
          </div>

          <div className="flex mt-8">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-[50%]"
            >
              {faqToEdit ? "Update" : "Create"}
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

export default FaqForm;

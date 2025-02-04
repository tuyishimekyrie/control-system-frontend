import { useState, useEffect } from "react";
import { IoIosAddCircleOutline, IoIosHelpCircleOutline } from "react-icons/io";
import { FaTrash, FaPen } from "react-icons/fa";
import { fetchFaqs, deleteFaq } from "../services/postData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SupportForm from "./SupportForm";
import FaqForm from "./FaqsForm";

type FaqData = {
  id: string;
  question: string;
  answer: string;
};

const Support = () => {
  const [showForm, setShowForm] = useState(false);
  const [faqToEdit, setFaqToEdit] = useState<FaqData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsAdmin(parsedUser.role === "admin");
    }
  }, []);

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (faq: FaqData) => {
    setFaqToEdit(faq);
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        isAdmin ? (
          <FaqForm setShowForm={setShowForm} faqToEdit={faqToEdit} />
        ) : (
          <SupportForm setShowForm={setShowForm} />
        )
      ) : (
        <div className="p-5 pt-0 min-h-screen flex flex-col">
          <div className="flex justify-between items-center mb-10 mt-8">
            <div>
              <h1 className="text-[25px] font-bold text-gray-400">
                HELP CENTER
              </h1>
              <p className="text-green-600 text-[14px]">
                We're here to assist you with any questions or issues you have!
                Click the support button to reach out to our support team
                directly.
              </p>
            </div>
            <div className="flex justify-start">
              {isAdmin ? (
                <button
                  className="flex items-center px-4 text-[14px] py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-4"
                  onClick={() => setShowForm(true)}
                >
                  <IoIosAddCircleOutline className="mr-2" />
                  Create FAQ
                </button> // for admins only.
              ) : (
                <button
                  className="flex items-center px-4 text-[14px] py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
                  onClick={() => setShowForm(true)}
                >
                  <IoIosHelpCircleOutline className="mr-2" />
                  Support
                </button>
              )}
            </div>
          </div>

          <div
            className="flex-grow p-6 rounded shadow-md text-gray-400 border-l-2 border-l-green-600"
            style={{ backgroundColor: "#1F2A40" }}
          >
            <h2 className="text-xl font-bold mb-4 text-green-600">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            {isLoading ? (
              <p>Loading FAQs...</p>
            ) : (
              <ul className="list-decimal pl-6 mb-6">
                {faqs.map((faq: FaqData) => (
                  <li
                    key={faq.id}
                    className="mb-3 text-[14px] flex justify-between"
                  >
                    <div>
                      <strong className="font-bold text-[16px]">
                        {faq.question}
                      </strong>
                      <br />
                      {faq.answer}
                    </div>
                    {isAdmin && (
                      <div className="flex gap-3">
                        <button
                          className="text-yellow-500 hover:text-yellow-700"
                          onClick={() => handleEdit(faq)}
                        >
                          <FaPen />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(faq.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Support;

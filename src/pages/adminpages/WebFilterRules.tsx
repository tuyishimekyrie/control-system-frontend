import React, { useState } from "react";
import RuleList from "../../components/AdminComponents/RuleList";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import BlockWebsite from "../../components/forms/BlockWebsite";
import { fetchBlockedWebsite } from "../../services/postData";
import { useQuery } from "@tanstack/react-query";

const WebFilterRules: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, refetch } = useQuery({
    queryKey: ["Website"],
    queryFn: fetchBlockedWebsite,
    staleTime: Infinity,
  });

  const handleModel = () => {
    setShowModal((prevShowModal) => !prevShowModal);
    refetch();
  };

  return (
    <div>
      {showModal ? (
        <div
          className="fixed inset-0 flex justify-center items-center"
          style={{ backgroundColor: "#161b2d" }}
        >
          <div className="absolute right-10 top-10 text-white ">
            <button onClick={handleModel}>
              <IoMdClose className="mr-2 w-10 h-10 font-bold" />
            </button>
          </div>
          <BlockWebsite />
        </div>
      ) : (
        <div className="p-5 pt-0">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-[25px] font-bold text-gray-400">
                WEB FILTER RULES
              </h1>
              <p className="text-green-600 text-[14px]">
                Control websites access for members and groups with URL-based
                rules.
              </p>
            </div>
            <button
              onClick={handleModel}
              className="flex items-center px-4 text-[14px] py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <IoIosAddCircleOutline className="mr-2" />
              Add Website
            </button>
          </header>
          <div className="flex justify-end items-center mb-6">
            <div className="text-gray-400 font-semibold">
              <span className="text-[14px]">
                Total Rules:{" "}
                <span className="text-green-600">{data?.length ?? 0}</span>
              </span>
            </div>
          </div>
          <RuleList rules={data ?? []} refetch={refetch} />
        </div>
      )}
    </div>
  );
};

export default WebFilterRules;

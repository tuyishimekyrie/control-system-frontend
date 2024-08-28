import React from "react";
import { Website } from "../../types/BlockWebsite";
import { unBlockUrl } from "../../services/postData";
import toast, { Toaster } from "react-hot-toast";

interface RuleItemProps {
  rule: Website;
  refetch: () => void;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule, refetch }) => {
  const onUnblockUrl = (id: string) => {
    const data = unBlockUrl(id);
    data
      .then(() => {
        toast.success("Website unblocked  Successfully");
        refetch();
      })
      .catch((error) => {
        toast.error("error", error);
        refetch();
      });
  };
  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1fr_1fr] p-3 border-b border-gray-700 items-center text-gray-400 text-[14px]`}
    >
      <Toaster />
      <span>{rule.id.substring(0, 3)}</span>
      <span className="cursor-pointer p-2 w-full">{rule.name}</span>
      <span className="cursor-pointer p-2 w-full text-red-600"> Blocked</span>
      <span
        className="cursor-pointer p-2 w-24 text-center rounded-full bg-green-700 text-white px-4 py-1 hover:bg-green-500"
        onClick={() => onUnblockUrl(rule.id)}
      >
        {" "}
        UnBlock
      </span>
    </div>
  );
};

export default RuleItem;

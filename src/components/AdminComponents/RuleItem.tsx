import React from "react";
import { Website } from "../../types/BlockWebsite";

interface RuleItemProps {
  rule: Website;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule }) => {
  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1fr] p-3 border-b border-gray-700 items-center text-gray-400 text-[14px]`}
    >
      <span>{rule.id.substring(0, 3)}</span>
      <span className="cursor-pointer p-2 w-full">{rule.name}</span>
      <span className="cursor-pointer p-2 w-full text-red-600"> Blocked</span>
    </div>
  );
};

export default RuleItem;

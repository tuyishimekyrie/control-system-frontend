import React from "react";
import RuleItem from "../AdminComponents/RuleItem";
import { Website } from "../../types/BlockWebsite";

interface RuleListProps {
  rules: Website[];
}

const RuleList: React.FC<RuleListProps> = ({ rules}) => {
  return (
    <div
      className="border border-gray-700 rounded text-gray-300"
      style={{ backgroundColor: "#1F2A40" }}
    >
      <div
        className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_150px] p-3 border-b border-gray-700 font-bold gap-2 text-[15px]"
        style={{ backgroundColor: "#1F2A45" }}
      >
        <span>#</span>
        <span>Name</span>
        <span>Action</span>
      </div>
      {rules.map((rule) => (
        <RuleItem key={rule.id} rule={rule}/>
      ))}
    </div>
  );
};

export default RuleList;

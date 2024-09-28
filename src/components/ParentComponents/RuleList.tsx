import React from "react";
import RuleItem from "../AdminComponents/RuleItem";
import { Website } from "../../types/BlockWebsite";

interface RuleListProps {
  rules: Website[];
  refetch: () => void;
}

const RuleList: React.FC<RuleListProps> = ({ rules, refetch }) => {
  return (
    <div
      className="border border-gray-700 rounded text-gray-300"
      style={{ backgroundColor: "#1F2A40" }}
    >
      <div
        className="grid grid-cols-[1fr_1fr_1fr_1fr] p-3 border-b border-gray-700 font-bold text-[15px]"
        style={{ backgroundColor: "#1F2A45" }}
      >
        <span>#</span>
        <span>Name</span>
        <span>Status</span>
        <span>Action</span>
      </div>
      {rules.map((rule) => (
        <RuleItem key={rule.id} rule={rule} refetch={refetch} />
      ))}
    </div>
  );
};

export default RuleList;

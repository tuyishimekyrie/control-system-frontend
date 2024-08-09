import React from "react";
import RuleItem from "../AdminComponents/RuleItem";

interface Rule {
  id: number;
  name: string;
  action: string;
  destination: string;
  site: string;
  isPublished: boolean;
}

interface RuleListProps {
  rules: Rule[];
  updateRule: (updatedRule: Rule) => void;
}

const RuleList: React.FC<RuleListProps> = ({ rules, updateRule }) => {
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
        <span>Destination</span>
        <span>Site/Category</span>
        <span>Published</span>
      </div>
      {rules.map((rule) => (
        <RuleItem key={rule.id} rule={rule} updateRule={updateRule} />
      ))}
    </div>
  );
};

export default RuleList;

import React, { useState } from "react";

interface Rule {
  id: number;
  name: string;
  action: string;
  destination: string;
  site: string;
  isPublished: boolean;
}

interface RuleItemProps {
  rule: Rule;
  updateRule: (updatedRule: Rule) => void;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule, updateRule }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAction, setIsEditingAction] = useState(false);
  const [isEditingDestination, setIsEditingDestination] = useState(false);
  const [isEditingSite, setIsEditingSite] = useState(false);

  const handleBlur = (field: string, value: string) => {
    updateRule({ ...rule, [field]: value });
    setIsEditingName(false);
    setIsEditingAction(false);
    setIsEditingDestination(false);
    setIsEditingSite(false);
  };

  const togglePublished = () => {
    updateRule({ ...rule, isPublished: !rule.isPublished });
  };

  const inputStyles = `p-2 w-full bg-transparent text-gray-400 outline-none border-none cursor-text`;

  return (
    <div
      className={`grid grid-cols-[50px_1fr_1fr_1fr_1fr_150px] p-3 border-b border-gray-700 items-center gap-2 text-gray-400 text-[14px] ${
        rule.isPublished ? "cursor-not-allowed" : ""
      }`}
    >
      <span>{rule.id}</span>
      {rule.isPublished ? (
        <span className="p-2 w-full">{rule.name}</span>
      ) : isEditingName ? (
        <input
          type="text"
          value={rule.name}
          className={inputStyles}
          onChange={(e) => updateRule({ ...rule, name: e.target.value })}
          onBlur={() => handleBlur("name", rule.name)}
          onFocus={() => setIsEditingName(true)}
        />
      ) : (
        <span
          onClick={() => setIsEditingName(true)}
          className="cursor-pointer p-2 w-full"
        >
          {rule.name || "Enter rule name"}
        </span>
      )}
      {rule.isPublished ? (
        <span className="p-2 w-full">{rule.action}</span>
      ) : isEditingAction ? (
        <select
          value={rule.action}
          className={inputStyles}
          onChange={(e) => updateRule({ ...rule, action: e.target.value })}
          onBlur={() => handleBlur("action", rule.action)}
          onFocus={() => setIsEditingAction(true)}
        >
          <option value="Deny">Deny</option>
          <option value="Warn">Warn</option>
        </select>
      ) : (
        <span
          onClick={() => setIsEditingAction(true)}
          className="cursor-pointer p-2 w-full"
        >
          {rule.action}
        </span>
      )}
      {rule.isPublished ? (
        <span className="p-2 w-full">{rule.destination}</span>
      ) : isEditingDestination ? (
        <select
          value={rule.destination}
          className={inputStyles}
          onChange={(e) => updateRule({ ...rule, destination: e.target.value })}
          onBlur={() => handleBlur("destination", rule.destination)}
          onFocus={() => setIsEditingDestination(true)}
        >
          <option value="Custom URL">Custom URL</option>
          <option value="Category">Category</option>
        </select>
      ) : (
        <span
          onClick={() => setIsEditingDestination(true)}
          className="cursor-pointer p-2 w-full"
        >
          {rule.destination}
        </span>
      )}
      {rule.isPublished ? (
        <span className="p-2 w-full">{rule.site}</span>
      ) : isEditingSite ? (
        <input
          type="text"
          value={rule.site}
          className={inputStyles}
          onChange={(e) => updateRule({ ...rule, site: e.target.value })}
          onBlur={() => handleBlur("site", rule.site)}
          onFocus={() => setIsEditingSite(true)}
        />
      ) : (
        <span
          onClick={() => setIsEditingSite(true)}
          className="cursor-pointer p-2 w-full"
        >
          {rule.site || "Enter site/category"}
        </span>
      )}
      <button
        onClick={togglePublished}
        className={`px-4 py-2 rounded ${
          rule.isPublished ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {rule.isPublished ? "Published" : "Unpublished"}
      </button>
    </div>
  );
};

export default RuleItem;

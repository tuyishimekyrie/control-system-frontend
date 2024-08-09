import React, { useState } from "react";
import RuleList from "../../components/AdminComponents/RuleList";
import { IoIosAddCircleOutline } from "react-icons/io";

interface Rule {
  id: number;
  name: string;
  action: string;
  destination: string;
  site: string;
  isPublished: boolean;
}

const WebFilterRules: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 1,
      name: "Block Social Sites",
      action: "Deny",
      destination: "Custom URL",
      site: "twitter.com",
      isPublished: true,
    },
    {
      id: 2,
      name: "Block Adult Sites",
      action: "Deny",
      destination: "Custom URL",
      site: "facebook.com",
      isPublished: false,
    },
  ]);

  const [defaultAction, setDefaultAction] = useState<string>("Deny");

  const addRule = () => {
    setRules([
      ...rules,
      {
        id: rules.length + 1,
        name: "",
        action: "Warn",
        destination: "Any",
        site: "Any",
        isPublished: false,
      },
    ]);
  };

  const updateRule = (updatedRule: Rule) => {
    setRules(
      rules.map((rule) => (rule.id === updatedRule.id ? updatedRule : rule))
    );
  };

  return (
    <div className="p-5 pt-0">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[25px] font-bold text-gray-400">
            WEB FILTER RULES
          </h1>
          <p className="text-green-600 text-[14px]">
            Control websites access for members and groups with URL-based rules.
          </p>
        </div>
        <button
          onClick={addRule}
          className="flex items-center px-4 text-[14px] py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <IoIosAddCircleOutline className="mr-2" />
          Add New Rule
        </button>
      </header>
      <div className="flex justify-end items-center mb-6">
        <div className="text-gray-400 font-semibold mr-20">
          <span className="text-[14px]">Total Rules: {rules.length}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-gray-400 font-semibold text-[14px]">
            Default Action:
          </span>
          <select
            value={defaultAction}
            onChange={(e) => setDefaultAction(e.target.value)}
            className="px-3 py-2 border-none pr-10 text-gray-400 rounded-sm text-[14px]"
            style={{
              backgroundColor: "#1F2A40",
              outline: "none",
            }}
          >
            <option value="Deny">Deny</option>
            <option value="Warn">Warn</option>
          </select>
        </div>
      </div>
      <RuleList rules={rules} updateRule={updateRule} />
    </div>
  );
};

export default WebFilterRules;

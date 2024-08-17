import { Website } from "../../types/BlockWebsite";


interface RuleItemProps {
  rule: Website;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule }) => {



  return (
    <div
      className={`grid grid-cols-[50px_1fr_1fr_1fr_1fr_150px] p-3 border-b border-gray-700 items-center gap-2 text-gray-400 text-[14px]`}
    >
      <span>{rule.id.substring(0, 3)}</span>
      <span
          className="cursor-pointer p-2 w-full"
        >
          {rule.name}
        </span> 
<span
          className="cursor-pointer p-2 w-full"
        >
          Blocked
        </span>
    </div>
  );
};

export default RuleItem;

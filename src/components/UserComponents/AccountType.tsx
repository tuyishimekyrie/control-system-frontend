import React from "react";
import { NavigateFunction } from "react-router-dom";

interface AccountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: NavigateFunction;
}

const AccountTypeModal: React.FC<AccountTypeModalProps> = ({
  isOpen,
  onClose,
  navigate,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAccountSelection = (type: string) => {
    switch (type) {
      case "organization":
        navigate("/auth/register/organization");
        break;
      case "school":
        navigate("/auth/register/school");
        break;
      case "parent":
        navigate("/auth/register/parent");
        break;
      default:
        break;
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">
          NETFELLA REGISTRATION
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          Select your Account type
        </p>
        <div className="flex flex-col gap-4">
          <button
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
            onClick={() => handleAccountSelection("organization")}
          >
            Organization/Company
          </button>
          <button
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={() => handleAccountSelection("school")}
          >
            Educational Institution
          </button>
          <button
            className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
            onClick={() => handleAccountSelection("parent")}
          >
            Parental Account
          </button>
        </div>

        <p
          className="mt-6 text-sm text-gray-500 hover:underline text-center cursor-pointer"
          onClick={onClose}
        >
          Dismiss
        </p>
      </div>
    </div>
  );
};

export default AccountTypeModal;

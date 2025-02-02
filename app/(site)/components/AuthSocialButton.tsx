import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  Icon: IconType;
  onClick: () => void;
}

const AuthSocialButton = ({ Icon, onClick }: AuthSocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white dark:bg-firstChatBox px-4 py-2 text-gray-500 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-blue-900 focus:outline-offset-0 transition"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;

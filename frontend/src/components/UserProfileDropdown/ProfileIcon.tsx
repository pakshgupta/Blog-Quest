import { FiUser } from "react-icons/fi";

interface ProfileIconProps {
  onClick: () => void;
}
const ProfileIcon: React.FC<ProfileIconProps> = ({ onClick }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <FiUser size={24} />
    </div>
  );
};

export default ProfileIcon;

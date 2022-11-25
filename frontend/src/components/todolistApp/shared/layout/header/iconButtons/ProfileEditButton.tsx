import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";
import IconButton from '../../../../../shared/buttons/IconButton';

const ProfileEditButton = () => {
  const navigate = useNavigate()

  const handleGoEditProfile = () => {
    navigate('/profile/edit')
  }

  return (
    <IconButton size="text-2xl md:text-3xl" onClick={handleGoEditProfile}>
        <AiFillEdit />
    </IconButton>
  )
}

export default ProfileEditButton
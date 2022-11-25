import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import IconButton from '../../../../../shared/buttons/IconButton';


const ProfileButton = () => {
  const navigate = useNavigate()

  const handleGoToProfile = () => {
    navigate('/profile', {replace: true})
  }

  return (
     <IconButton size="text-2xl md:text-3xl" onClick={handleGoToProfile}>
        <BsPersonCircle />
    </IconButton>
  )
}

export default ProfileButton
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import IconButton from './IconButton';

type Props = {}

const ProfileButton = (props: Props) => {
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
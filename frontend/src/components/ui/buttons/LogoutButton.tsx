import { useNavigate } from 'react-router-dom';
import { HiLogout } from "react-icons/hi";

import IconButton from './IconButton'


type Props = {}

const LogoutButton = (props: Props) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/login', {replace: true})
  }

  return (
     <IconButton size="text-2xl md:text-3xl" onClick={handleLogout}>
        <HiLogout />
    </IconButton>
  )
}

export default LogoutButton
import { useNavigate } from 'react-router-dom';
import { HiLogout } from "react-icons/hi";

import IconButton from '../../../../../shared/buttons/IconButton'
import useUserAccount from '../../../../../../store';

const LogoutButton = () => {
  const navigate = useNavigate()
  const logout = useUserAccount(state => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login', {replace: true})
  }

  return (
     <IconButton size="text-2xl md:text-3xl" onClick={handleLogout}>
        <HiLogout />
    </IconButton>
  )
}

export default LogoutButton
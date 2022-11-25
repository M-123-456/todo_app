import { useNavigate } from 'react-router-dom'
import { FaUserFriends } from 'react-icons/fa'
import IconButton from '../../../../../shared/buttons/IconButton'
IconButton


const FriendsButton = () => {
  const navigate = useNavigate()
  const handleGoToFriends = () => {
    navigate('/friends', {replace: true})
}
  return (
    <IconButton size="text-2xl md:text-3xl" onClick={handleGoToFriends}>
        <FaUserFriends />
    </IconButton>
  )
}

export default FriendsButton
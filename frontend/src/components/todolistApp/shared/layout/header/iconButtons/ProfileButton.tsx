import { useNavigate } from 'react-router-dom';
import IconButton from '../../../../../shared/buttons/IconButton';
import useUserAccount from '../../../../../../store';
import noAvatar from '../../../../../../assets/images/noAvatar.png'



const ProfileButton = () => {
  const navigate = useNavigate()
  const user = useUserAccount(state => state.user)

  const handleGoToProfile = () => {
    navigate('/profile', {replace: true})
  }

  if (user) {
    return (
    <IconButton size="text-2xl md:text-3xl" onClick={handleGoToProfile}>
        <img 
          className="h-6 md:h-8 rounded-full"
          src={user.avatar || `${noAvatar}`} 
          alt='user_avatar' 
        />
    </IconButton>
    )

  }
}

export default ProfileButton
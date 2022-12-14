import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import IconButton from '../../../../../shared/buttons/IconButton'


const BackButton = () => {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  return (
    <div className="flex items-center" onClick={handleBack}>
        <IconButton size="text-2xl md:text-3xl">
            <IoIosArrowBack />
        </IconButton>
        <span>BACK</span>
    </div>
  )
}

export default BackButton
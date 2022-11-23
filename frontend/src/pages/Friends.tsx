import { useState } from 'react'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import Search from '../components/forms/Search'
import CurrentFriends from '../components/friends/CurrentFriends'
import Requests from '../components/friends/requests/Requests'

type Props = {}

const Friends = (props: Props) => {
  const [showFriends, setShowFriends] = useState(false)
  const [showRequests, setShowRequests] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  return (
      <div className="flex flex-col py-8 mt-6 lg:py-0 w-full">
        {/* search bar */}
        <Search 
          className="self-center bg-white px-2 py-1 shadow drop-shadow-xl"
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        {

        }

        <ul
          className="space-y-3 mt-5"
        >

          {/* Friends */}
          <li
            className="flex items-center gap-1 font-semibold"
            onClick={() => setShowFriends(prev => !prev)}
          >
            { showFriends ? <IoIosArrowDown/> : <IoIosArrowForward /> }
            <span>Friends</span>
          </li>
          { showFriends && <CurrentFriends /> }

          {/* Open Requests */}
          <li
            className="flex items-center gap-1 font-semibold"
            onClick={() => setShowRequests(prev => !prev)}
          >
            { showRequests ? <IoIosArrowDown/> : <IoIosArrowForward /> }
            <span>Open Requests</span>
          </li>
          { showRequests && <Requests /> }
        </ul>
      </div>
  )
}

export default Friends
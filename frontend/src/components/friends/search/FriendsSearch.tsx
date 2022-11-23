import React, { useEffect, useState } from 'react'
import MatchedFriendCard from './MatchedFriendCard'
import { IFriend } from '../../../types'

type Props = {
    searchInput: string
}

const DUMMY = [
    {
        _id: "1",
        username: 'Friend 1',
        avatar: 'friend8.png'
    },
    {
        _id: "2",
        username: 'Friend 2',
        avatar: 'friend8.png'
    },
    {
        _id: "3",
        username: 'Friend 3',
        avatar: 'friend8.png'
    },
    {
        _id: "4",
        username: 'Friend 4',
        avatar: 'friend8.png'
    },
]

const FriendsSearch = (props: Props) => {
  const [matchedFriends, setMatchedFriends] = useState<IFriend[] | undefined>([])

  useEffect(() => {
    const matched = DUMMY.filter(item => item.username.includes(props.searchInput))
    setMatchedFriends(matched)
  },[props.searchInput])


  return (
    <div
        area-label='friends_cards'
        className="mt-6 flex flex-wrap bg-white py-6 px-7 gap-3 rounded shadow-sm"
    >
      {
        DUMMY.map(item => (
          <MatchedFriendCard 
            item={item}
            key={item._id}
          />
        ))
      }
    </div>
  )
}

export default FriendsSearch
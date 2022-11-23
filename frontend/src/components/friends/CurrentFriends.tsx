import React from 'react'
import FriendCard from './FriendCard'

type Props = {}

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

const CurrentFriends = (props: Props) => {
  return (
    <div
        area-label='friends_cards'
        className="flex flex-wrap bg-white py-6 px-7 gap-3 rounded shadow-sm"
    >
      {
        DUMMY.map(item => (
          <FriendCard 
            item={item}
            key={item._id}
          />
        ))
      }
    </div>
  )
}

export default CurrentFriends
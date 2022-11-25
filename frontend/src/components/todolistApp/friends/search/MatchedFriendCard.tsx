import React from 'react'
import { IFriend } from '../../../types'

type Props = {
    item: IFriend
}


const MatchedFriendCard = (props: Props) => {
  return (
    <div 
        area-label='friends_card'
        className="py-2 px-3 rounded shadow drop-shadow-2xl flex flex-col items-center"
      >
        <div>
          <img src={props.item.avatar} alt="" />
        </div>
        <h4>{props.item.username}</h4>
        <button
            className="bg-blue-600 text-white px-2 py-1 rounded"
        >
            Send request
        </button>
    </div>
  )
}

export default MatchedFriendCard
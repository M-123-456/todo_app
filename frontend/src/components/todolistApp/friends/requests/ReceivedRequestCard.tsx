import React from 'react'
import { IFriend } from '../../../types'


type Props = {
    item: IFriend
}


const ReceivedRequestCard = (props: Props) => {
  return (
     <div 
        area-label='request_cards'
        className="py-2 px-3 rounded shadow drop-shadow-2xl flex flex-col items-center"
      >
        <div>
          <img src={props.item.avatar} alt="" />
        </div>
        <h4>{props.item.username}</h4>
        <div
          className="flex gap-1"
        >
          <button
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
          >
            Accept
          </button>
          <button
            className="text-xs bg-red-500 text-white px-2 py-1 rounded"
          >
            Decline
          </button>
        </div>
    </div>
  )
}

export default ReceivedRequestCard
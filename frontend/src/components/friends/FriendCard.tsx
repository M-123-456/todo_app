import React from 'react'
import { isHtmlElement } from 'react-router-dom/dist/dom'
import { IFriend } from '../../types'

type Props = {
    item: IFriend
}

const FriendCard = (props: Props) => {
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
          className="bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
    </div>
  )
}

export default FriendCard
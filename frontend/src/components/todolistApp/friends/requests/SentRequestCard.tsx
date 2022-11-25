import React from 'react'
import { IFriend } from '../../../../types'

type Props = {
    item: IFriend
}

const SentRequestCard = (props: Props) => {
  return (
     <div 
        area-label='friends_card'
        className="py-2 px-3 rounded shadow drop-shadow-2xl flex flex-col items-center"
      >
        <div>
          <img src={props.item.avatar} alt="" />
        </div>
        <h4>{props.item.username}</h4>
    </div>
  )
}

export default SentRequestCard
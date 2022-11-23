import React from 'react'
import ReceivedRequestCard from './ReceivedRequestCard'
import SentRequestCard from './SentRequestCard'

type Props = {}

const SENT_DUMMY = [
    {
        _id: "8",
        username: 'Friend 8',
        avatar: 'friend8.png'
    },
    {
        _id: "9",
        username: 'Friend 9',
        avatar: 'friend8.png'
    },
    {
        _id: "10",
        username: 'Friend 10',
        avatar: 'friend8.png'
    },
    {
        _id: "11",
        username: 'Friend 11',
        avatar: 'friend8.png'
    },
]

const RECEIVED_DUMMY = [
    {
        _id: "12",
        username: 'Friend 12',
        avatar: 'friend8.png'
    },
    {
        _id: "13",
        username: 'Friend 13',
        avatar: 'friend8.png'
    },
]

const Requests = (props: Props) => {
  return (
    <ul
        area-label='list of requests'
    >
        {/* Sent Requests */}
        <li
            className="flex items-center gap-1 font-semibold"
          >
            Sent
        </li>
        <div
            area-label='friends_cards'
            className="mt-2 flex flex-wrap bg-white py-6 px-7 gap-3 rounded shadow-sm"
        >
            {
                SENT_DUMMY.map(item => (
                <SentRequestCard 
                    item={item}
                    key={item._id}
                />
                ))
            }
        </div>

        
        {/* Received Requests */}
        <li
            className="mt-2 flex items-center gap-1 font-semibold"
          >
            Received
        </li>
        <div
            area-label='friends_cards'
            className="mt-2 flex flex-wrap bg-white py-6 px-7 gap-3 rounded shadow-sm"
        >
            {
                RECEIVED_DUMMY.map(item => (
                <ReceivedRequestCard 
                    item={item}
                    key={item._id}
                />
                ))
            }
        </div>
    </ul>
  )
}

export default Requests
import React from 'react'

type Props = {}

const CurrentFriends = (props: Props) => {
  return (
    <div
            area-label='list of current friends'
          >
            <div
              area-label='friends_card'
              className="flex flex-wrap bg-white py-6 px-7 gap-2 rounded shadow-sm"
            >
              <div area-label='friends_card'
              >
                <div>
                  avatar
                  <img src="" alt="" />
                </div>
                <h4>Friend 1</h4>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>

              <div
                area-label='friends_card'
              >
                <div>
                  avatar
                  <img src="" alt="" />
                </div>
                <h4>Friend 1</h4>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
              
            

          </div>

        </div>
  )
}

export default CurrentFriends
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectHappyHrList, getHappyHrList } from "./happyHrListSlice"

export default function HappyHrList() {
  const list = useSelector(selectHappyHrList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHappyHrList())
  }, [])
  console.log(list)
  return (
    <div>
      {list.map((item) => {
        return (
          <div>
            <h1>{item.venue_id}</h1>
          </div>
        )
      })}
    </div>
  )
}

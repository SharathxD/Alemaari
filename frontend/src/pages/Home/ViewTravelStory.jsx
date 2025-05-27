import React from "react"
import { IoMdClose } from "react-icons/io"
import { MdOutlineDelete, MdOutlineUpdate } from "react-icons/md"
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 bg-[#F5E6D3] p-2 rounded-l-lg">
            <button className="btn-small" onClick={onEditClick}>
              <MdOutlineUpdate className="text-lg" /> UPDATE STORY
            </button>

            <button className="btn-small btn-delete" onClick={onDeleteClick}>
              <MdOutlineDelete className="text-lg" /> DELETE STORY
            </button>

            <button className="cursor-pointer" onClick={onClose}>
              <IoMdClose className="text-lg text-[#D2691E]" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-[#8B4513]">
            {storyInfo && storyInfo.title}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-[#D2691E]">
              {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
            </span>

            <div className="inline-flex items-center gap-2 text-[13px] text-[#8B4513] bg-[#D2691E]/20 rounded-sm px-2 py-1">
              <FaLocationDot className="text-sm" />

              {storyInfo &&
                storyInfo.visitedLocation.map((item, index) =>
                  storyInfo.visitedLocation.length === index + 1
                    ? `${item}`
                    : `${item},`
                )}
            </div>
          </div>
        </div>

        <img
          src={storyInfo && storyInfo.imageUrl}
          alt="story image"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="mt-4">
          <p className="text-sm text-[#8B4513] leading-6 text-justify whitespace-pre-line">
            {storyInfo.story}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewTravelStory

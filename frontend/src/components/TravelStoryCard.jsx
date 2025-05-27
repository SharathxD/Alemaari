import React from "react"
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { FaHeart } from "react-icons/fa"

const TravelStoryCard = ({
  imageUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavourite,
  onEdit,
  onClick,
  onFavouriteClick,
}) => {
  console.log(isFavourite)

  return (
    <div className="border border-[#D2691E]/20 rounded-lg overflow-hidden bg-[#F5E6D3] hover:shadow-lg hover:shadow-[#D2691E]/20 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-56 object-cover rounded-lg"
        onClick={onClick}
      />

      <button
        className="w-12 h-12 flex items-center justify-center bg-[#F5E6D3]/40 rounded-lg border border-[#F5E6D3]/30 absolute top-4 right-4"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`icon-btn ${
            isFavourite ? "text-red-500" : "text-[#F5E6D3]"
          } hover:text-red-500`}
        />
      </button>

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-[16px] font-medium text-[#8B4513]">{title}</h6>

            <span className="text-xs text-[#D2691E]">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-sm text-[#8B4513]/80 mt-2">{story?.slice(0, 60)}</p>

        <div className="inline-flex items-center gap-2 text-[13px] text-[#8B4513] bg-[#D2691E]/10 rounded mt-3 px-2 py-1">
          <FaLocationDot className="text-sm" />

          {visitedLocation.map((item, index) =>
            visitedLocation.length === index + 1 ? `${item}` : `${item},`
          )}
        </div>
      </div>
    </div>
  )
}

export default TravelStoryCard

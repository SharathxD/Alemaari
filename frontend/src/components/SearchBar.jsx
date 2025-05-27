import React from "react"
import { FaSearch } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-white/80 rounded-md border border-[#D2691E]/20">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-xs bg-transparent py-[11px] outline-none text-[#8B4513]"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-[#D2691E] cursor-pointer hover:text-[#8B4513] mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaSearch
        className="text-[#D2691E] cursor-pointer hover:text-[#8B4513]"
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar

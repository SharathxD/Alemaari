import moment from "moment"
import React, { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { MdDateRange } from "react-icons/md"
import { DayPicker } from "react-day-picker"

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const dayPickerStyles = {
    caption: { color: '#8B4513' },
    head_cell: { color: '#D2691E' },
    table: { color: '#8B4513' },
    cell: { color: '#8B4513' },
    nav_button: { color: '#D2691E' },
    nav_button_previous: { color: '#D2691E' },
    nav_button_next: { color: '#D2691E' },
    day_today: { color: '#8B4513', fontWeight: 'bold' },
    day_selected: { 
      backgroundColor: '#8B4513',
      color: '#F5E6D3',
      fontWeight: 'bold'
    },
    day_disabled: { color: '#D2691E40' },
    day_outside: { color: '#D2691E80' },
    day_hidden: { visibility: 'hidden' },
    day_range_middle: { 
      backgroundColor: '#D2691E20',
      color: '#8B4513'
    },
    day_range_end: { 
      backgroundColor: '#8B4513',
      color: '#F5E6D3',
      fontWeight: 'bold'
    },
    day_range_start: { 
      backgroundColor: '#8B4513',
      color: '#F5E6D3',
      fontWeight: 'bold'
    }
  }

  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#8B4513] bg-[#D2691E]/10 hover:bg-[#D2691E]/20 rounded-sm px-2 py-1 cursor-pointer"
        onClick={() => {
          setOpenDatePicker(true)
        }}
      >
        <MdDateRange className="text-lg" />

        {date
          ? moment(date).format("Do MMM YYYY")
          : moment().format("Do MMM YYYY")}
      </button>

      {openDatePicker && (
        <div className="overflow-y-scroll p-5 bg-[#F5E6D3]/80 rounded-lg relative pt-9">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F5E6D3] hover:bg-[#D2691E]/10 absolute top-2 right-2"
            onClick={() => {
              setOpenDatePicker(false)
            }}
          >
            <IoMdClose className="text-xl text-[#8B4513]" />
          </button>

          <DayPicker
            captionLayout="dropdown"
            mode="single"
            selected={date}
            onSelect={setDate}
            pagedNavigation
            styles={dayPickerStyles}
            modifiersStyles={{
              today: {
                fontWeight: 'bold',
                color: '#8B4513'
              },
              selected: {
                backgroundColor: '#8B4513',
                color: '#F5E6D3'
              }
            }}
            className="!bg-[#F5E6D3] p-3 rounded-lg"
          />
        </div>
      )}
    </div>
  )
}

export default DateSelector

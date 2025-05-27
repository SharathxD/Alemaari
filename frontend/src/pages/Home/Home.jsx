import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import axiosInstance from "../../utils/axiosInstance"
import TravelStoryCard from "../../components/TravelStoryCard"
import { ToastContainer, toast } from "react-toastify"
import { IoMdAdd } from "react-icons/io"
import Modal from "react-modal"
import AddEditTravelStory from "../../components/AddEditTravelStory"
import ViewTravelStory from "./ViewTravelStory"
import EmptyCard from "../../components/EmptyCard"
import { DayPicker } from "react-day-picker"
import moment from "moment"
import FilterInfoTitle from "../../components/FilterInfoTitle"
import { getEmptyCardMessage } from "../../utils/helper"

const Home = () => {
  const [allStories, setAllStories] = useState([])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")

  const [dateRange, setDateRange] = useState({ from: null, to: null })

  // console.log(allStories)

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  })

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

  // Get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/travel-story/get-all")

      if (response.data && response.data.stories) {
        setAllStories(response.data.stories)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Handle Edit Story
  const handleEdit = async (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data })
  }

  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data })
  }

  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id

    try {
      const response = await axiosInstance.put(
        "/travel-story/update-is-favourite/" + storyId,
        {
          isFavorite: !storyData.isFavorite,
        }
      )

      if (response.data && response.data.story) {
        toast.success("Story updated successfully!")
        getAllTravelStories()
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // delete story
  const deleteTravelStory = async (data) => {
    const storyId = data._id

    try {
      const response = await axiosInstance.delete(
        "/travel-story/delete-story/" + storyId
      )

      if (response.data && !response.data.error) {
        toast.success("Story deleted successfully!")

        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))

        getAllTravelStories()
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // search story
  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/travel-story/search", {
        params: {
          query: query,
        },
      })

      if (response.data && response.data.stories) {
        setFilterType("search")
        setAllStories(response.data.stories)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Clear search
  const handleClearSearch = () => {
    setFilterType("")
    getAllTravelStories()
  }

  // Handle filter travel story by date range
  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null
      const endDate = day.to ? moment(day.to).valueOf() : null

      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-story/filter", {
          params: { startDate, endDate },
        })

        if (response.data && response.data.stories) {
          setFilterType("date")
          setAllStories(response.data.stories)
        }
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Handle date range click
  const handleDayClick = (day) => {
    setDateRange(day)
    filterStoriesByDate(day)
  }

  const resetFilter = () => {
    setDateRange({ from: null, to: null })
    setFilterType("")
    getAllTravelStories()
  }

  useEffect(() => {
    getAllTravelStories()

    return () => {}
  }, [])

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="min-h-screen bg-[#FFF8DC] container mx-auto py-10">
        <FilterInfoTitle
          filterType={filterType}
          filterDate={dateRange}
          onClear={() => {
            resetFilter()
          }}
        />

        <div className="flex gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return (
                    <TravelStoryCard
                      key={item._id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavourite={item.isFavorite}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewStory(item)}
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />
                  )
                })}
              </div>
            ) : (
              <EmptyCard
                imgSrc={
                  "https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                message={getEmptyCardMessage(filterType)}
                setOpenAddEditModal={() =>
                  setOpenAddEditModal({
                    isShown: true,
                    type: "add",
                    data: null,
                  })
                }
              />
            )}
          </div>

          <div className="w-[320px]">
            <div className="bg-[#F5E6D3] border border-[#D2691E]/20 shadow-lg shadow-[#D2691E]/10 rounded-lg">
              <div className="p-4">
                <style>
                  {`
                    .rdp-day:focus {
                      background-color: rgba(139, 69, 19, 0.1) !important;
                      color: #8B4513 !important;
                      outline: none !important;
                    }
                    .rdp-day_selected {
                      background-color: #A0522D !important;
                      color: #FFEFD5 !important;
                    }
                    .rdp-day_selected:hover {
                      background-color: #8B4513 !important;
                      color: #FFEFD5 !important;
                    }
                    .rdp-day_range_start,
                    .rdp-day_range_end {
                      background-color: #A0522D !important;
                      color: #FFEFD5 !important;
                    }
                    .rdp-day_range_middle {
                      background-color: rgba(160, 82, 45, 0.15) !important;
                      color: #8B4513 !important;
                    }
                    .rdp-day_range_middle:hover {
                      background-color: rgba(160, 82, 45, 0.25) !important;
                      color: #8B4513 !important;
                    }
                  `}
                </style>
                <DayPicker
                  captionLayout="dropdown"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pagedNavigation
                  className="rdp !bg-[#F5E6D3]"
                  modifiers={{
                    selected: dateRange,
                  }}
                  modifiersStyles={{
                    selected: {
                      backgroundColor: '#A0522D',
                      color: '#FFEFD5',
                      fontWeight: '600'
                    },
                    today: {
                      color: '#8B4513',
                      fontWeight: '600',
                      backgroundColor: 'rgba(139, 69, 19, 0.1)'
                    },
                    range_start: {
                      color: '#FFEFD5',
                      backgroundColor: '#A0522D',
                      fontWeight: '600'
                    },
                    range_end: {
                      color: '#FFEFD5',
                      backgroundColor: '#A0522D',
                      fontWeight: '600'
                    },
                    range_middle: {
                      color: '#8B4513',
                      backgroundColor: 'rgba(160, 82, 45, 0.15)'
                    }
                  }}
                  styles={{
                    months: {
                      padding: '0.5rem'
                    },
                    caption: { 
                      color: '#8B4513',
                      fontSize: '1rem',
                      padding: '0.5rem'
                    },
                    caption_label: {
                      fontWeight: '600',
                      color: '#8B4513'
                    },
                    nav_button: { 
                      color: '#A0522D',
                      border: '1px solid rgba(160, 82, 45, 0.2)',
                      borderRadius: '0.375rem',
                      padding: '0.25rem',
                      margin: '0 0.25rem',
                      '&:hover': {
                        backgroundColor: 'rgba(160, 82, 45, 0.1)'
                      }
                    },
                    nav_button_previous: { 
                      color: '#A0522D'
                    },
                    nav_button_next: { 
                      color: '#A0522D'
                    },
                    head_cell: { 
                      color: '#A0522D',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      padding: '0.5rem'
                    },
                    cell: { 
                      color: '#8B4513',
                      padding: '0.375rem',
                      fontWeight: '500',
                      borderRadius: '0.375rem'
                    },
                    day: {
                      color: '#8B4513',
                      fontWeight: '500',
                      width: '2.25rem',
                      height: '2.25rem',
                      margin: '0.125rem',
                      borderRadius: '0.375rem',
                      transition: 'all 150ms ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(160, 82, 45, 0.1)'
                      },
                      '&:focus': {
                        backgroundColor: 'rgba(160, 82, 45, 0.1)',
                        color: '#8B4513',
                        outline: 'none'
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add & Edit Travel Story Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(139, 69, 19, 0.1)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-[#F5E6D3] rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <AddEditTravelStory
          storyInfo={openAddEditModal.data}
          type={openAddEditModal.type}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }}
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      {/* View travel story modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(139, 69, 19, 0.1)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-[#F5E6D3] rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
            handleEdit(openViewModal.data || null)
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null)
          }}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-[#8B4513] hover:bg-[#D2691E] fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
      >
        <IoMdAdd className="text-[32px] text-[#F5E6D3]" />
      </button>

      <ToastContainer />
    </>
  )
}

export default Home

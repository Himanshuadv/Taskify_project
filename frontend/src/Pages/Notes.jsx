import React from 'react'
import './CSS/Notes.css'
import Navbar from '../Components/Home Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import AddNoteBar from '../Components/AddNoteBar/AddNoteBar'
import { CgNotes } from 'react-icons/cg'

const Notes = () => {
  return (
    <div className='notes'>
      <Navbar />
      <div className='notes-section'>
      <AddNoteBar />
      </div>
      <Footer />
    </div>
  )
}

export default Notes

import React, { useState } from "react";
import "./Reminder.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from '@mui/material/TextField';
import { useTaskContext } from "../TaskContext";

import { MdCancel } from "react-icons/md";

function Reminder(props) {
  // const [value, setValue] = useState(new Date()); // value is date
  // const [msg, setMsg] = useState(""); //msg set for backend
  const {setNoteReminder, displayAlertAtTime} = useTaskContext();
  const [selectedTime, setSelectedTime] = useState("20:00"); // Initial value is 8:00 PM
  const [remindMessage, setRemindMessage] = useState(''); // Remind message
  const [selectedDate, handleDateChange] = useState(new Date());
  const datePickerStyle = {
    fontSize: "200px" // Adjust the font size as needed
  };

  const handleToday = () => {
    // Set the date to today
    const today = new Date();

    // Parse the time from the selectedTime string
    const [hours, minutes] = selectedTime.split(":").map(Number);

    // Set the time for today
    today.setHours(hours, minutes, 0, 0);

    console.log(today);
    const data = {
      time: today,
      message: remindMessage,
      id: props.id,
    };

    setRemindMessage('');
    setSelectedTime('20:00');

    setNoteReminder(data);
    props.setIsOpen(false);
    props.setIsAlarm(today);
    displayAlertAtTime(props.id,props.note,today,remindMessage);
    props.setReminderMessage(remindMessage);
    props.setReminder(today.toLocaleString());
  };

  const handleSetReminder = () => {
    const data = {
      time: selectedDate,
      message: remindMessage,
      id: props.id,
    };
    setNoteReminder(data);
    props.setIsOpen(false);
    props.setIsAlarm(selectedDate);
    displayAlertAtTime(props.id,props.note,selectedDate,remindMessage);
    props.setReminderMessage(remindMessage);
    props.setReminder(selectedDate.toLocaleString()); 
  }

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    tomorrow.setHours(hours, minutes, 0, 0);
    console.log(tomorrow);
    const data = {
      time: tomorrow,
      message: remindMessage,
      id: props.id,
    };

    setRemindMessage('');
    setSelectedTime('20:00');

    setNoteReminder(data);
    props.setIsOpen(false);
    props.setIsAlarm(tomorrow);
    displayAlertAtTime(props.id,props.note,tomorrow, remindMessage);
    props.setReminderMessage(remindMessage);
    props.setReminder(tomorrow.toLocaleString());
  };

  return (
    <div className="reminder" style={{display: props.display}}>
      <div className="reminder__header">
        <span className="reminder-header">Reminder:</span>
        <span className="reminder-cut-icon" onClick={()=>{props.setIsOpen(false)}}>
          <MdCancel />
        </span>
      </div>
      <input
        type="text"
        className="reminder__input"
        placeholder="Type your message"
        value={remindMessage}
        onChange={(e)=>{setRemindMessage(e.target.value)}}
      />
      <div className="spliteOfTimeContainer">
        <div className="reminder__spliteOfTime">
          <div className="reminder__splitOfTimeHeader" onClick={handleToday}> Later Today</div>
          <div>
            <small>
              <input
                className="reminder_timeInput"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </small>
          </div>
        </div>
      </div>
      <div className="spliteOfTimeContainer">
        <div className="reminder__spliteOfTime">
          <div className="reminder__splitOfTimeHeader" onClick={handleTomorrow}> Tomorrow</div>
          <div>
            <small>
              <input
                className="reminder_timeInput"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </small>
          </div>
        </div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            label=""
            Date={selectedDate}
            onChange={(newDate) => handleDateChange(newDate)}
            renderInput={(props) => (
              <TextField {...props} InputProps={{ style: datePickerStyle }} />
            )}
          />
        </DemoContainer>
      </LocalizationProvider>
      <button
        onClick={handleSetReminder}
        style={{cursor: 'pointer'}}
      >
        Add Reminder
      </button>
    </div>
  );
}

export default Reminder;

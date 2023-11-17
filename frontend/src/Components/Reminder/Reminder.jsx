import React, { useEffect, useState } from "react";
import "./Reminder.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from '@mui/material/TextField';

import { MdCancel } from "react-icons/md";

function Reminder() {
  const [value, setValue] = useState(new Date()); // value is date
  const [msg, setMsg] = useState(""); //msg set for backend
  const [selectedTime, setSelectedTime] = useState("20:00"); // Initial value is 8:00 PM
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

    console.log(today); // This will log the full date with the selected time
  };

  useEffect(() => {
    handleToday();
  }, [selectedTime]);

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    tomorrow.setHours(hours, minutes, 0, 0);
    console.log(tomorrow);
  };

  return (
    <div className="reminder">
      <div className="reminder__header">
        <span className="reminder-header">Reminder:</span>
        <span className="reminder-cut-icon">
          <MdCancel />
        </span>
      </div>
      <input
        type="text"
        className="reminder__input"
        placeholder="Type your message"
      />
      <div className="spliteOfTimeContainer">
        <div className="reminder__spliteOfTime" onClick={handleToday}>
          <div className="reminder__splitOfTimeHeader"> Later Today</div>
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
        <div className="reminder__spliteOfTime" onClick={handleTomorrow}>
          <div className="reminder__splitOfTimeHeader"> Tomorrow</div>
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
        onClick={() => {
          console.log(selectedDate);
        }}
      >
        Add Reminder
      </button>
    </div>
  );
}

export default Reminder;

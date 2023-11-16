import React from "react";
import Navbar from "../Components/Home Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Hero/Hero";
import Column from "../Components/Tasks Column/Column";
import "./CSS/Home.css";
import DailiesColumn from "../Components/Dailies Column/DailiesColumn";
import TasksSearchBarDiv from "../Components/TasksSearchBarDiv/TasksSearchBarDiv";
import ToDoEditContainer from "../Components/ToDo Edit Container/ToDoEditContainer";
import { useAppContext } from "../Components/context";
import DailyEditContainer from "../Components/Daily Edit Container/DailyEditContainer";
import HabitsEditContainer from "../Components/Habits Edit Container/HabitsEditContainer";

// gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { isAddToDoVisible, isAddDailyVisible, isAddHabitVisible } =
    useAppContext();
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <div
        className="todo-edit-container"
        style={{ display: isAddToDoVisible ? "block" : "none" }}
      >
        <div className="fade"></div>
        <ToDoEditContainer />
      </div>
      <div
        className="daily-edit-container"
        style={{ display: isAddDailyVisible ? "block" : "none" }}
      >
        <div className="fade"></div>
        <DailyEditContainer />
      </div>
      <div
        className="habit-edit-container"
        style={{ display: isAddHabitVisible ? "block" : "none" }}
      >
        <div className="fade"></div>
        <HabitsEditContainer />
      </div>
      <TasksSearchBarDiv />
      <div className="tasks-columns">
        <Column />
        <DailiesColumn />
        <Column />
        <Column />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
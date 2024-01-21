import React from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Home from './components/Home'
import CreateTask from './task/CreateTask';
 // import TaskCard from './components/TaskCard';
import {  Routes, Route } from 'react-router-dom';  // Import Routes and Route from react-router-dom
import Dynamic from './task/Dynamic'

function App() {
  return (
  
      <>
        <Navbar />
    
        <Routes>
          {/* <Route path="/" element={<Navbar />} />  */}
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} /> 
          <Route path= "/createtask" element={<CreateTask/>}/>
           {/* <Route path= "/tasks" element={<TaskCard/>}/> */}
           {/* <Route path="/tasks/crud" component={<Crud/>} /> */}
           <Route path="/tasks/:id" element={<Dynamic />} />

          </Routes>
      </>
   
  );
}

export default App;

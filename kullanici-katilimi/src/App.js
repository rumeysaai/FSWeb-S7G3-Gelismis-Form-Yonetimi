import React from 'react';
import {Route, Routes} from 'react-router';
import UserForm from './UserForm';
import './App.css';

// Bazı tutoriallerde (import Yup from 'yup') şeklinde kullanım görebilirsiniz, fakat üstteki kullanım daha problemsiz olacak

function App() {

  

  return (

      <div>
          {<UserForm/>} 
      </div>
  )
}

export default App;

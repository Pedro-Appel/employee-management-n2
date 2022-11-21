import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { ListUser } from './ListUsers';
import { CreateUser } from './CreateUser';
import { GetUser } from './GetUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<ListUser/>} />
      <Route exact path='/get/:id' element={<GetUser/>} />
      <Route exact path='/create' element={<CreateUser/>} />
    </Routes>
  </BrowserRouter>
);

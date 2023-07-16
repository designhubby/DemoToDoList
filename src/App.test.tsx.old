import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Root } from './root';
import { LocalGetAllToDoList, LocalPostAllToDoList } from './services/LocalDataToDoList';
import { RemoteGetToDoListData } from './services/RemotedataToDoList';

test('renders ToDo List', () => {
  render(
    <App dataAccess={LocalGetAllToDoList} forceRerender = {null} dataPost= {LocalPostAllToDoList}/>);
  const linkElement = screen.getByText(/ToDo List/i);
  expect(linkElement).toBeInTheDocument();
});

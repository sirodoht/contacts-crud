import React from 'react';
import ReactDOM from 'react-dom';

import './global.css';

import Contacts from './components/Contacts';

const people = [
  {
    first: 'Roy',
    last: 'Fielding',
    email: 'roy@fielding.com',
    country: 'United States',
  },
  {
    first: 'Ken',
    last: 'Thomson',
    email: 'kmr@unix.sh',
    country: 'United States',
  },
  {
    first: 'Dan',
    last: 'Abramov',
    email: 'dan@abramov.co.uk',
    country: 'United Kingdom',
  },
  {
    first: 'Felicia',
    last: 'Day',
    email: 'felicia@day.kr',
    country: 'Canada',
  },
  {
    first: 'Zooey',
    last: 'Ikla',
    email: 'zoe@ikla.th',
    country: 'Thailand',
  },
  {
    first: 'Sid',
    last: 'Barret',
    email: 'syd@baret.music',
    country: 'Peru',
  },
];

if (!localStorage.length) {
  people.forEach((person) => {
    localStorage.setItem(person.email, JSON.stringify(person));
  });
}

ReactDOM.render(
  <Contacts />,
  document.getElementById('root')
);

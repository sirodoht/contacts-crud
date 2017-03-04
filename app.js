import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';

import Contacts from './contacts';

const people = [
  {
    first: 'Roy',
    last: 'Fielding',
    email: 'roy@fielding.com',
    country: 'USA',
  },
  {
    first: 'Ken',
    last: 'Thomson',
    email: 'kmr@unix.sh',
    country: 'USA',
  },
  {
    first: 'Dan',
    last: 'Abramov',
    email: 'dan@abramov.co.uk',
    country: 'UK',
  },
  {
    first: 'Felicia',
    last: 'Day',
    email: 'felicia@day.kr',
    country: 'South Korea',
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

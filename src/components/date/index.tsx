import React from 'react';

export default function DateComponent() {
  const [date, setDate] = React.useState(new Date().toDateString());

  (() => {
    setInterval(() => setDate(new Date().toDateString()), 10000);
  })();

  return <span>{date}</span>;
}

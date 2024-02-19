import React, { useEffect } from 'react';

export default function DateComponent() {
  const [date, setDate] = React.useState(new Date());

  // this setting of interval should occur only once
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    // the returned function of useEffect is the clean up function
    return () => clearInterval(interval);
  }, []);

  return <span>{`${date.toDateString()}`}</span>;
}

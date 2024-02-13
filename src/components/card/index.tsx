import React from 'react';
import './index.scss';

export default function Card({ children }: { children: React.ReactElement }) {
  return <div className="card">{children}</div>;
}

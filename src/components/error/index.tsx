import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Card from '../card';

export default function Error(): React.ReactNode {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card>
        <div className="flex gap-6 items-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />
          <span className="text-xl text-gray-800">Opps! Something went wrong.</span>
        </div>
      </Card>
    </div>
  );
}

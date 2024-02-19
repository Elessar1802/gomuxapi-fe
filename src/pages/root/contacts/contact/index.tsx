import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../../../components/card';
import { User } from '../../../../types';
import { GET } from '../../../../utils/utils';

export default function Contact(): React.ReactNode {
  const [user, setUser] = useState<User | undefined>(undefined);
  const params = useParams();
  useEffect(() => {
    (async () => {
      const res = await GET(`users/${params.id}`);
      if (!res.success) {
        throw new Error('');
      }
      setUser(res.payload);
    })();
  }, [params]);

  return (
    <Card>
      <>
        <span>{user?.name}</span>
        <span>{user?.phone}</span>
        <span>{user?.role}</span>
      </>
    </Card>
  );
}

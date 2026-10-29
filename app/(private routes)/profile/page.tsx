import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getMeServer } from '@/lib/api/serverApi'; 

export const metadata: Metadata = {
  title: 'Профіль користувача',
};

export default async function ProfilePage() {
  const user = await getMeServer();

  return (
    <div>
      {}
      {user.avatar && (
        <Image 
          src={user.avatar} 
          alt={user.username || 'Аватар користувача'} 
          width={100} 
          height={100} 
          priority
        />
      )}
      
      {}
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      
      {}
      <Link href="/profile/edit">Редагувати профіль</Link>
    </div>
  );
}

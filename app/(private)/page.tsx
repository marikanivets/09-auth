import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getMeServer } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'My Profile | NoteHub',
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const cookiesHeader = cookieStore.toString();

  let user = { username: 'User', email: '', avatar: '' };
  try {
    user = await getMeServer(cookiesHeader);
  } catch (error) {
    // Ошибка обработается или перенаправится редиректом
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || 'https://goit.global'}
            alt="User Avatar"
            width={1200}
            height={1200}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

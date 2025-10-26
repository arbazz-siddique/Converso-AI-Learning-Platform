"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { addBookmark, isBookmarked, removeBookmark } from '@/lib/actions/companion.actions';
import { toast } from 'sonner'; 

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => {
  const { user } = useUser();
  const [bookmarked, setBookmarked] = useState(false);
  
useEffect(() => {
  const fetchBookmark = async () => {
    if (!user) return;
    const isBookmarkedResult = await isBookmarked(user.id, id);
    setBookmarked(isBookmarkedResult);
  };
  fetchBookmark();
}, [user, id]);

  const handleBookmark = async () => {
  if (!user) {
    toast.error("Please sign in to bookmark.");
    return;
  }

  try {
    const result = await addBookmark(id);

    setBookmarked(result.success); // success = bookmarked, false = unbookmarked

    if (result.success) {
      toast.success("Added to bookmarks!");
    } else {
      toast("Removed from bookmarks.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

  return (
    <article className='companion-card' style={{ backgroundColor: color }}>
      <div className='flex justify-between items-center'>
        <div className='subject-badge'>{subject}</div>
        <button className='companion-bookmark' onClick={handleBookmark}>
          <Image
            src={bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>
      <h2 className='text-2xl font-bold'>{name}</h2>
      <p className='text-sm'>Topic: {topic}</p>
      <div className='flex items-center gap-2'>
        <Image src="/icons/clock.svg" alt='duration' width={13.5} height={13.5} />
        <p className='text-sm'>Time: {duration} minutes</p>
      </div>
      <Link href={`/companions/${id}`} className='w-full'>
        <button className='btn-primary w-full justify-center'>Launch Lesson</button>
      </Link>
    </article>
  );
};

export default CompanionCard;

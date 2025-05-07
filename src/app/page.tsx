"use client"

import { APP_DESCRIPTION, APP_NAME } from '@/config/main.config';
import Link from 'next/link';
import { TbNurse } from 'react-icons/tb';
import { Button } from './_components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="flex gap-2 items-center text-4xl font-bold">
        {APP_NAME}
        <TbNurse />
      </h1>
      <p className="text-lg mt-2">{APP_DESCRIPTION}</p>
      <Button variant="link" size={"lg"} className="text-notice" asChild>
        <Link href="/patients">Go to Dashboard</Link>
      </Button>
    </div>
  );
}

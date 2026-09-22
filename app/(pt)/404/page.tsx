import { NotFound } from '@/components/NotFound';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404',
  robots: { index: false },
};

export default function Page() {
  return <NotFound locale="pt" />;
}

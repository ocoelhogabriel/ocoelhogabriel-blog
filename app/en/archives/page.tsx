import { ArchivesPage } from '@/components/pages';
import { site } from '@/lib/config';
import { t } from '@/lib/i18n';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${t('en', 'archives')} · ${site.title.en}`,
};

export default function Page() {
  return <ArchivesPage locale="en" />;
}

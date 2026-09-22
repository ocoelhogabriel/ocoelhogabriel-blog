import { ArchivesPage } from '@/components/pages';
import { site } from '@/lib/config';
import { t } from '@/lib/i18n';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${t('pt', 'archives')} · ${site.title.pt}`,
};

export default function Page() {
  return <ArchivesPage locale="pt" />;
}

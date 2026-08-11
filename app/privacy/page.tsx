import type { Metadata } from 'next';
import LegalPage from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Danylo Shypotko',
  description: 'Privacy policy for the shiparezik portfolio.',
};

export default function PrivacyPage() {
  return <LegalPage type="privacy" />;
}

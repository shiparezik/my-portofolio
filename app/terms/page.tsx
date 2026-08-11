import type { Metadata } from 'next';
import LegalPage from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Use | Danylo Shypotko',
  description: 'Terms of use for the shiparezik portfolio.',
};

export default function TermsPage() {
  return <LegalPage type="terms" />;
}

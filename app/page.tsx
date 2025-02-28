import Link from 'next/link';
import Wrapper from './components/Wrapper';
export default function HomePage() {
  return (
    <Wrapper>
    <div>
      <h1>Bienvenue</h1>
      <Link href='/auth/sign-in'>Se connecter</Link>
      <Link href='/auth/sign-up'>S'inscrire</Link>
    </div>
    </Wrapper>
  );
}
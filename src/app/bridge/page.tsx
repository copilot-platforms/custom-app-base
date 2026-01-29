import { Container } from '@/components/Container';
import { Demo } from '@/app/bridge/demo';

export default async function Page() {
  return (
    <Container className="max-w-screen-lg">
      <Demo />
    </Container>
  );
}

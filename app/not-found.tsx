import Container from '@/components/Container';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <section className="py-32 sm:py-44">
      <Container>
        <p className="eyebrow text-burgundy">404</p>
        <h1 className="mt-8 max-w-2xl font-display text-display-lg text-ink">
          This page is out of print.
        </h1>
        <p className="mt-8 max-w-measure text-lede text-ink-soft">
          The address does not exist, or it did and no longer does. The list, the journal and the
          services are all still where you left them.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/" variant="primary">Back to the home page</Button>
          <Button href="/books" variant="secondary">See the books</Button>
        </div>
      </Container>
    </section>
  );
}

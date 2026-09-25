import { BookNowButton, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";

export function Hero() {
  return (
    <div className="bg-blush-soft py-14 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold tracking-widest uppercase">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blush-deep align-middle" />
            Spray Tan By Jenna
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Spray tanning in Easton, MA
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Book a studio appointment with Jenna, or have her come to you with
            a mobile house-call appointment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookNowButton size="lg" />
            <ButtonLink href="/services" variant="secondary" size="lg">
              View services
            </ButtonLink>
          </div>
        </div>

        <ImageFrame
          src="/professional-airbrush-tanning-technician-jenna-crossley.jpeg"
          alt="Jenna holding an airbrush spray tan gun beside a Norvell equipment case"
          aspect="aspect-[4/5]"
          position="object-top"
          preload
        />
      </Container>
    </div>
  );
}

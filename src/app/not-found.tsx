import LiquidShape from "@/components/liquid/LiquidShape";
import Button from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="grid-paper flex min-h-screen items-center">
      <Container className="py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow index="404">Page introuvable</Eyebrow>
            <h1 className="mt-7 text-[clamp(2.8rem,7vw,5rem)]">
              Cette page a
              <br />
              perdu <span className="accent text-brand-600">le nord</span>.
            </h1>
            <p className="mt-7 max-w-md leading-relaxed text-slate-600">
              L&apos;adresse demandée n&apos;existe pas ou a changé. Reprenons depuis un point
              connu.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/" size="lg">
                Retour à l&apos;accueil
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Nous contacter
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <LiquidShape
              family="bold"
              tone="aiguille"
              spin={1.7}
              duration={19}
              className="animate-float mx-auto aspect-square w-[48%] lg:w-[80%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

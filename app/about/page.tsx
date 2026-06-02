import type { ReactNode } from "react";
import { Container, Grid } from "../components/Container";
import { Nav } from "../components/Nav";
import { FooterContact } from "../components/Footer";
import { HopText } from "../components/HopText";
import { PhotoTrail } from "../components/PhotoTrail";

const OPEN_TO_WORK_TEXT =
  "I’m open to full-time roles and freelance projects, especially with teams building products that are worth the effort.";

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main className="flex-1">
        {/* ── HERO / INTRO ───────────────────────────── */}
        <section
          id="about"
          className="relative pt-12 sm:pt-16 md:pt-24 lg:pt-32"
        >
          <PhotoTrail />
          <Container>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/50 sm:text-[11px] md:text-[12px]">
              About
            </p>
            <Grid className="mt-8 gap-y-12 md:mt-12 md:gap-y-0">
              {/* Portrait placeholder. relative + z-20 keeps it above the
                  PhotoTrail (z-5) so cursor stamps slip behind the photo
                  instead of crossing in front of it. */}
              <div className="rise-in relative z-20 col-span-12 md:col-span-5">
                <div
                  data-nav-theme="dark"
                  className="aspect-[541/657] w-full overflow-hidden rounded-[20px] bg-card sm:rounded-[24px]"
                />
              </div>

              {/* Title + body */}
              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <h1 className="text-[32px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[40px] md:text-[52px] lg:text-[64px]">
                  Small town kid.
                  <br />
                  Fine arts degree.
                  <br />
                  Product design ambitions.
                </h1>

                <div className="mt-8 space-y-5 text-[16px] leading-[1.65] text-fg/65 sm:text-[17px] md:mt-10 md:text-[18px] lg:text-[19px]">
                  <p>
                    I grew up in <Strong>Jalgaon, Maharashtra</Strong>. A
                    place where the idea of becoming a designer wasn&rsquo;t
                    really a mapped-out path. I moved to Pune after my 12th,
                    studied Commercial Arts, and completed a{" "}
                    <Strong>Bachelor of Fine Arts</Strong>.
                  </p>
                  <p>
                    That foundation in craft is something I carry into every
                    project. Right now I&rsquo;m building toward{" "}
                    <Strong>AI product design</Strong>. The intersection of
                    systems thinking, visual craft, and tools that actually
                    help people.
                  </p>
                </div>
              </div>
            </Grid>
          </Container>
        </section>

        {/* ── OPEN-TO-WORK ────────────────────────────
            No surrounding card / fill — text sits directly on the
            page so the hop-word effect reads against the natural
            page surface instead of inside a boxed container. */}
        <section className="mt-32 pb-4 md:mt-40 md:pb-6 lg:mt-48">
          <Container>
            <div className="mx-auto max-w-[820px]">
              <HopText
                text={OPEN_TO_WORK_TEXT}
                className="text-center text-[24px] font-black uppercase leading-[1.25] tracking-[-0.04em] text-fg sm:text-[30px] md:text-[36px] lg:text-[44px]"
              />
            </div>
          </Container>
        </section>

      </main>

      <FooterContact showIntro={false} tightTop />
    </>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-fg">{children}</span>;
}

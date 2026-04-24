'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const coverImage = "/images/handmade/cover.jpg";

const featuredPieces = [
  {
    title: "Atelier Beige",
    subtitle: "Texturas nobles, siluetas suaves y una presencia visual cálida.",
    image: "/images/handmade/featured-1.jpg",
  },
  {
    title: "Signature Crochet",
    subtitle: "Piezas hechas a mano con acabado prolijo y carácter contemporáneo.",
    image: "/images/handmade/featured-2.jpg",
  },
  {
    title: "Premium Details",
    subtitle: "Diseño artesanal para sesiones, regalos y momentos memorables.",
    image: "/images/handmade/featured-3.jpg",
  },
];

const gallery = [
  "/images/handmade/gallery-1.jpg",
  "/images/handmade/gallery-2.jpg",
  "/images/handmade/gallery-3.jpg",
  "/images/handmade/gallery-4.jpg",
  "/images/handmade/gallery-5.jpg",
  "/images/handmade/gallery-6.jpg",
  "/images/handmade/gallery-7.jpg",
  "/images/handmade/gallery-8.jpg",
];

const pillars = [
  {
    label: "Hecho a mano",
    text: "Cada pieza nace puntada por puntada, con tiempo, precisión y sensibilidad estética.",
  },
  {
    label: "Acabado premium",
    text: "Paleta elegante, detalles prolijos y presencia visual pensada para destacar.",
  },
  {
    label: "Diseño con alma",
    text: "No es producción en serie: es una colección íntima con identidad propia.",
  },
];

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-badge]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-hero-title] span",
        { autoAlpha: 0, yPercent: 120 },
        {
          autoAlpha: 1,
          yPercent: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.15,
        },
      );

      gsap.fromTo(
        "[data-hero-copy]",
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 1, delay: 0.35, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-hero-actions] > *",
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          delay: 0.5,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 56 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
        gsap.to(element, {
          yPercent: index % 2 === 0 ? -10 : 10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-gallery-card]").forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 80, rotate: index % 2 === 0 ? -2 : 2 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
            },
          },
        );
      });
    }, rootRef);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={rootRef} className="relative isolate overflow-x-clip bg-background text-foreground">
      <div className="grain-overlay" aria-hidden="true" />

      <main>
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,193,155,0.2),transparent_28%),linear-gradient(135deg,rgba(20,16,12,0.58),rgba(12,10,8,0.94))]" />
            <div className="absolute inset-y-0 right-[-8%] hidden w-[56%] lg:block" data-parallax>
              <Image
                src={coverImage}
                alt="Modelo luciendo una pieza premium de Hand Made Crochet"
                fill
                preload
                sizes="56vw"
                className="object-cover object-center opacity-75 saturate-[1.05]"
              />
            </div>
            <div className="absolute -left-20 top-20 h-56 w-56 rounded-full bg-[#c6ab83]/18 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#6f5a43]/16 blur-3xl" />
          </div>

          <div className="section-shell relative z-10 flex min-h-screen items-center py-24 sm:py-28">
            <div className="grid w-full gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="max-w-3xl">
                <div
                  data-hero-badge
                  className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/75"
                >
                  <span className="h-2 w-2 rounded-full bg-[#d8bf96]" />
                  Atelier artesanal · Hand Made Crochet
                </div>

                <h1
                  data-hero-title
                  className="font-display text-6xl leading-[0.86] tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[7rem]"
                >
                  <span className="block overflow-hidden">Hand Made</span>
                  <span className="block overflow-hidden text-[#e8dbc8]">Crochet</span>
                  <span className="block overflow-hidden text-white/55">hecho con carácter</span>
                </h1>

                <p
                  data-hero-copy
                  className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg"
                >
                  Diseño textil hecho a mano con una estética beige + oscura, elegante y
                  cinematográfica. Hand Made Crochet crea piezas para mujeres, bebés y regalos
                  especiales con textura, calidez y presencia premium.
                </p>

                <div data-hero-actions className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="#coleccion"
                    className="accent-ring inline-flex items-center justify-center rounded-full bg-[#eadbc7] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#1a1410] hover:-translate-y-0.5"
                  >
                    Explorar colección
                  </Link>
                  <Link
                    href="#contacto"
                    className="inline-flex items-center justify-center rounded-full border border-[#d8bf96]/35 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5ede3] hover:border-[#e6d2b0]/55 hover:bg-white/6"
                  >
                    Reservar diseño
                  </Link>
                </div>
              </div>

              <div className="relative lg:hidden">
                <div className="glass-card accent-ring relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <Image
                    src={coverImage}
                    alt="Portada de la colección premium de Hand Made Crochet"
                    fill
                    preload
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110d0a] via-transparent to-transparent" />
                </div>
              </div>

              <div className="glass-card accent-ring hidden self-end rounded-[2rem] p-6 lg:block" data-reveal>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <Stat value="100%" label="hecho a mano" />
                  <Stat value="Premium" label="acabado editorial" />
                  <Stat value="Único" label="detalle con intención" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-20 sm:py-24" data-reveal>
          <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/4 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:p-14">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#d8bf96]">Brand story</p>
              <h2 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-white sm:text-5xl">
                Artesanía contemporánea con lujo silencioso y alma textil.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-white/68 sm:text-lg">
              <p>
                Hand Made Crochet transforma hilo, textura y dedicación en una identidad visual
                cálida, elegante y memorable. Johana puede aparecer como artesana detrás de cada
                pieza, pero la marca es la protagonista de la experiencia.
              </p>
              <p>
                El resultado no es solo una prenda o accesorio: es una escena, una atmósfera y un
                recuerdo hecho a mano con sensibilidad premium.
              </p>
            </div>
          </div>
        </section>

        <section id="coleccion" className="section-shell py-20 sm:py-24">
          <div data-reveal className="mb-10 flex flex-col gap-4 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#d8bf96]">Featured collection</p>
              <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-white sm:text-6xl">
                Crochet con calidez editorial.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Una selección pensada para destacar texturas, siluetas y la delicadeza que define a
              Hand Made Crochet.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredPieces.map((piece, index) => (
              <article
                key={piece.title}
                data-reveal
                className="group glass-card accent-ring relative overflow-hidden rounded-[2rem]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0" data-parallax>
                    <Image
                      src={piece.image}
                      alt={piece.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110d0a] via-[#110d0a]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/55">0{index + 1}</p>
                    <h3 className="mt-3 font-display text-3xl text-white">{piece.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-7 text-white/68">{piece.subtitle}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell py-20 sm:py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.label}
                data-reveal
                className="glass-card rounded-[1.75rem] p-8 sm:p-10"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-[#d8bf96]">{pillar.label}</p>
                <p className="mt-5 text-lg leading-8 text-white/72">{pillar.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell py-20 sm:py-24">
          <div data-reveal className="mb-10 sm:mb-14">
            <p className="text-sm uppercase tracking-[0.35em] text-[#d8bf96]">Gallery showcase</p>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-white sm:text-6xl">
              Capas, luz y detalle.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {gallery.map((image, index) => (
              <figure
                key={image}
                data-gallery-card
                className={`glass-card group relative overflow-hidden rounded-[1.75rem] ${
                  index % 5 === 0 ? "sm:col-span-2 xl:row-span-2" : ""
                }`}
              >
                <div className={`relative ${index % 5 === 0 ? "aspect-[16/11] xl:h-full xl:min-h-[34rem]" : "aspect-[4/5]"}`}>
                  <div className="absolute inset-0" data-parallax>
                      <Image
                        src={image}
                        alt={`Detalle de la colección de Hand Made Crochet ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110d0a]/70 via-transparent to-transparent opacity-75" />
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section id="contacto" className="section-shell py-20 sm:py-24">
          <div className="glass-card accent-ring overflow-hidden rounded-[2rem] px-7 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div data-reveal>
                <p className="text-sm uppercase tracking-[0.35em] text-[#d8bf96]">Social & contact</p>
                <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-white sm:text-6xl">
                  ¿Lista para una pieza con identidad propia?
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                  Descubrí más colecciones, contactá a la artesana detrás de la marca y reservá una
                  creación de Hand Made Crochet con acabado delicado, cálido y memorable.
                </p>
              </div>

              <div data-reveal className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
                <Link
                  href="https://www.instagram.com/handmadecrochet.col/"
                  target="_blank"
                  rel="noreferrer"
                  className="accent-ring inline-flex items-center justify-center rounded-full bg-[#eadbc7] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#1a1410] hover:-translate-y-0.5"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.tiktok.com/@handmadecrochet24"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8bf96]/35 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/88 hover:border-[#e6d2b0]/55 hover:bg-white/6"
                >
                  TikTok
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/14 p-5">
      <p className="font-display text-3xl text-white">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/55">{label}</p>
    </div>
  );
}

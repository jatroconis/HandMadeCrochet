'use client';

import AOS from "aos";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const coverImage = "/images/handmade/hero-editorial.webp";

const spinFrames = Array.from({ length: 151 }, (_, index) => {
  const frame = String(index + 1).padStart(3, "0");
  return `/images/handmade/360/frame-${frame}.webp`;
});

const featuredPieces = [
  {
    title: "Editorial Citywear",
    subtitle: "Siluetas con actitud, tonos cacao y una dirección visual lista para campaña.",
    image: "/images/handmade/featured-citylook.webp",
  },
  {
    title: "Golden Hour Atelier",
    subtitle: "Luz cálida, caída elegante y textura tejida con una presencia sofisticada.",
    image: "/images/handmade/featured-sunset.webp",
  },
  {
    title: "Capsule Collection",
    subtitle: "Formatos, herrajes y color en una colección artesanal que se siente de autor.",
    image: "/images/handmade/featured-collection.webp",
  },
];

const gallery = [
  "/images/handmade/gallery-product-lineup.webp",
  "/images/handmade/gallery-city-walk.webp",
  "/images/handmade/gallery-golden-hour.webp",
  "/images/handmade/gallery-chain-detail.webp",
  "/images/handmade/gallery-beach-profile.webp",
  "/images/handmade/gallery-detail-closeup.webp",
  "/images/handmade/gallery-sunset-portrait.webp",
  "/images/handmade/gallery-packaging.webp",
];

const pillars = [
  {
    label: "Hecho a mano",
    text: "Cada bolso nace puntada por puntada, con técnica manual, paciencia y obsesión por el acabado.",
  },
  {
    label: "Paleta de marca",
    text: "Beige, miel, cacao y dorado: una identidad cálida, femenina y memorable sin depender del negro.",
  },
  {
    label: "Diseño con alma",
    text: "No es una pieza genérica: es un accesorio con firma propia, pensado para styling y presencia visual.",
  },
];

const spinHighlights = [
  "Vista 360 cuadro por cuadro para apreciar forma, brillo y estructura.",
  "Animación controlada con GSAP ScrollTrigger para una experiencia editorial al hacer scroll.",
  "Detalles de herrajes, tejido y silueta reforzados con una composición beige coherente con la marca.",
];

const spinMoments = [
  {
    eyebrow: "Forma",
    title: "La silueta entra primero.",
    text: "El giro arranca mostrando volumen, proporción y presencia general del bolso dentro del universo beige de la marca.",
  },
  {
    eyebrow: "Textura",
    title: "Después aparece el tejido.",
    text: "El scroll te deja leer la superficie, el brillo del hilo y la consistencia del trabajo artesanal sin apurar la mirada.",
  },
  {
    eyebrow: "Detalles",
    title: "Y al final mandan los herrajes.",
    text: "Aros, cierres y remates entran como puntos de lujo silencioso para que el producto se sienta premium de verdad.",
  },
];

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const spinSectionRef = useRef<HTMLElement | null>(null);
  const spinStageRef = useRef<HTMLDivElement | null>(null);
  const [activeSpinFrame, setActiveSpinFrame] = useState(spinFrames[0]);
  const [frameLabel, setFrameLabel] = useState(1);
  const [activeMoment, setActiveMoment] = useState(0);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    setLenisInstance(lenis);

    AOS.init({
      duration: 850,
      once: true,
      offset: 72,
      easing: "ease-out-cubic",
      mirror: false,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const preloadedFrames = spinFrames.map((src) => {
      const frame = new window.Image();
      frame.src = src;
      return frame;
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-badge]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-hero-title] span",
        { autoAlpha: 0, yPercent: 120 },
        {
          autoAlpha: 1,
          yPercent: 0,
          stagger: 0.08,
          duration: 1,
          ease: "power4.out",
          delay: 0.12,
        },
      );

      gsap.fromTo(
        "[data-hero-copy]",
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.9, delay: 0.25, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-hero-actions] > *",
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.38,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        "[data-hero-visual]",
        { autoAlpha: 0, x: 36, rotate: 2 },
        { autoAlpha: 1, x: 0, rotate: 0, duration: 1, delay: 0.28, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 70, scale: 0.95, filter: "blur(4px)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-stagger-item]");
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 80, rotateX: -15, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.4,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
        gsap.to(element, {
          yPercent: index % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });

      const frameState = { frame: 0 };

      if (spinSectionRef.current && spinStageRef.current) {
        gsap.to(frameState, {
          frame: spinFrames.length - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: spinSectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.8,
            pin: spinStageRef.current,
            anticipatePin: 1,
          },
          onUpdate: () => {
            const currentFrame = Math.round(frameState.frame);
            const nextSrc = spinFrames[currentFrame];
            const progress = currentFrame / (spinFrames.length - 1);

            setActiveSpinFrame((previousFrame) =>
              previousFrame === nextSrc ? previousFrame : nextSrc,
            );
            setFrameLabel(currentFrame + 1);
            setActiveMoment(progress < 0.3 ? 0 : progress < 0.65 ? 1 : 2);
          },
        });
      }

      ScrollTrigger.refresh();
      AOS.refresh();
    }, rootRef);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      preloadedFrames.length = 0;
    };
  }, []);

  return (
    <div ref={rootRef} className="relative isolate overflow-x-clip bg-background text-foreground">
      <div className="grain-overlay" aria-hidden="true" />

      <main>
        <section className="relative overflow-hidden pb-18 pt-28 sm:pb-22 sm:pt-32 lg:min-h-screen lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,249,240,0.96),transparent_34%),radial-gradient(circle_at_82%_14%,rgba(217,189,150,0.38),transparent_26%),linear-gradient(180deg,rgba(255,249,241,0.98),rgba(239,225,205,0.94))]" />
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#e7d4b8]/60 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#cfa972]/28 blur-3xl" />

          <div className="section-shell relative z-10 grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-3xl">
              <div
                data-hero-badge
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#c7a67a]/35 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#7b5738] shadow-[0_10px_30px_rgba(170,131,86,0.12)]"
              >
                <span className="h-2 w-2 rounded-full bg-[#bb8c52]" />
                Beige editorial · Hand Made Crochet
              </div>

              <h1
                data-hero-title
                className="font-display text-6xl leading-[0.86] tracking-[-0.05em] text-[#432c1d] sm:text-7xl md:text-8xl lg:text-[7rem]"
              >
                <span className="block overflow-hidden">Hand Made</span>
                <span className="block overflow-hidden text-[#8f673f]">Crochet</span>
              </h1>

              <p
                data-hero-copy
                className="mt-8 max-w-2xl text-base leading-8 text-[#6d5441] sm:text-lg"
              >
                Hand Made Crochet crea bolsos tejidos a mano con una identidad visual cálida,
                femenina y cuidada. Cada pieza combina textura, forma y detalle para sentirse
                especial, artesanal y lista para acompañar momentos que merecen verse memorables.
              </p>

              <div data-hero-actions className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#vista-360"
                  onClick={(e) => {
                    e.preventDefault();
                    lenisInstance?.scrollTo('#vista-360', { duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                  }}
                  className="accent-ring group inline-flex items-center justify-center overflow-hidden rounded-full bg-[#b88753] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#fff9f2] transition-transform duration-500 hover:scale-[1.03] active:scale-95"
                >
                  <span className="relative z-10">Ver 360°</span>
                  <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-[#a1713d] transition-transform duration-500 group-hover:translate-y-0" />
                </Link>
                <Link
                  href="#coleccion"
                  onClick={(e) => {
                    e.preventDefault();
                    lenisInstance?.scrollTo('#coleccion', { duration: 2.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                  }}
                  className="group inline-flex items-center justify-center overflow-hidden rounded-full border border-[#b58a5f]/45 bg-white/55 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#5e422d] transition-all duration-500 hover:scale-[1.03] hover:border-[#a47a50] active:scale-95"
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Explorar colección</span>
                  <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-[#b88753] transition-transform duration-500 group-hover:translate-y-0" />
                </Link>
              </div>
            </div>

            <div className="relative" data-hero-visual>
              <div className="accent-ring relative overflow-hidden rounded-[2.4rem] border border-[#e8d8c2] bg-[#f7efe3]/90 p-4 shadow-[0_30px_90px_rgba(104,72,40,0.18)] sm:p-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#efe0ca]">
                  <div className="absolute inset-0" data-parallax>
                    <Image
                      src={coverImage}
                      alt="Modelo luciendo un bolso de Hand Made Crochet"
                      fill
                      preload
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center saturate-[1.02]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6f4c34]/18 via-transparent to-[#fff7ec]/14" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-[1.6rem] border border-white/55 bg-[#fff7ee]/78 p-5 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9b7148]">
                    Firma visual
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#664a33] sm:text-base">
                    Una identidad cálida y refinada donde la textura del tejido se convierte en el
                    centro de la experiencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-18 sm:py-22" data-stagger-group>
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.label}
                data-stagger-item
                className="glass-card rounded-[1.9rem] p-8 text-[#5f4532] shadow-[0_18px_60px_rgba(120,86,52,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(120,86,52,0.14)] sm:p-10"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-[#b48353]">{pillar.label}</p>
                <p className="mt-5 text-lg leading-8 text-[#6a513e]">{pillar.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-8 pt-6 sm:pb-10 sm:pt-8" data-reveal>
          <div className="grid gap-10 rounded-[2.4rem] border border-[#e5d1b4] bg-[#fff8ef]/82 p-7 shadow-[0_24px_80px_rgba(140,104,66,0.08)] sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:p-14">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#b48353]">Brand story</p>
              <h2 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-[#472f1f] sm:text-5xl">
                Accesorios tejidos con lujo silencioso y tonos de marca que sí cuentan una historia.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-[#6a513e] sm:text-lg">
              <p>
                Hand Made Crochet transforma hilo, color y dedicación en una colección de bolsos con
                carácter visual propio. El beige deja que la artesanía respire; el cacao aporta
                profundidad y los detalles dorados hacen el cierre premium.
              </p>
              <p>
                El resultado no es solo un accesorio: es styling, atmósfera y una presencia de marca
                que se ve más cuidada, más femenina y muchísimo más memorable.
              </p>
            </div>
          </div>
        </section>

        <section id="vista-360" ref={spinSectionRef} className="relative min-h-[400vh] bg-[#fcf9f4]">
          <div ref={spinStageRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),transparent_75%)]" />
            
            {/* The Bag */}
            <div className="relative z-10 flex h-[70vh] w-full max-w-[95vw] items-center justify-center sm:h-[85vh] lg:h-[95vh]">
              <Image
                src={activeSpinFrame}
                alt="Vista 360 del bolso"
                width={1080}
                height={1440}
                unoptimized
                priority
                className="h-full w-full object-contain drop-shadow-[0_45px_80px_rgba(109,77,45,0.22)] transition-transform duration-[40ms] ease-linear"
              />
            </div>

            {/* Cinematic Overlays that fade based on activeMoment */}
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
               {/* Moment 0 */}
               <div 
                 className="absolute left-6 top-1/4 max-w-sm rounded-[2rem] border border-white/40 bg-white/40 p-6 backdrop-blur-xl sm:left-12 xl:left-24" 
                 style={{ 
                   opacity: activeMoment === 0 ? 1 : 0, 
                   transform: activeMoment === 0 ? 'translateY(0)' : 'translateY(30px)', 
                   transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
                 }}
               >
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#b48353]">01 · Forma</p>
                  <h3 className="mt-3 font-display text-4xl text-[#472f1f] sm:text-5xl lg:text-6xl leading-[0.9]">La silueta entra primero.</h3>
                  <p className="mt-4 text-base leading-7 text-[#654a34]">El giro arranca mostrando volumen, proporción y presencia general del bolso dentro del universo beige de la marca.</p>
               </div>
               
               {/* Moment 1 */}
               <div 
                 className="absolute right-6 top-1/2 max-w-sm -translate-y-1/2 rounded-[2rem] border border-white/40 bg-white/40 p-6 backdrop-blur-xl sm:right-12 xl:right-24" 
                 style={{ 
                   opacity: activeMoment === 1 ? 1 : 0, 
                   transform: activeMoment === 1 ? 'translateY(-50%)' : 'translateY(calc(-50% + 30px))', 
                   transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
                 }}
               >
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#b48353]">02 · Textura</p>
                  <h3 className="mt-3 font-display text-4xl text-[#472f1f] sm:text-5xl lg:text-6xl leading-[0.9]">Después aparece el tejido.</h3>
                  <p className="mt-4 text-base leading-7 text-[#654a34]">El scroll te deja leer la superficie, el brillo del hilo y la consistencia del trabajo artesanal sin apurar la mirada.</p>
               </div>

               {/* Moment 2 */}
               <div 
                 className="absolute bottom-1/4 left-6 max-w-sm rounded-[2rem] border border-white/40 bg-white/40 p-6 backdrop-blur-xl sm:left-12 xl:left-24" 
                 style={{ 
                   opacity: activeMoment === 2 ? 1 : 0, 
                   transform: activeMoment === 2 ? 'translateY(0)' : 'translateY(30px)', 
                   transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
                 }}
               >
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#b48353]">03 · Detalles</p>
                  <h3 className="mt-3 font-display text-4xl text-[#472f1f] sm:text-5xl lg:text-6xl leading-[0.9]">Y al final mandan los herrajes.</h3>
                  <p className="mt-4 text-base leading-7 text-[#654a34]">Aros, cierres y remates entran como puntos de lujo silencioso para que el producto se sienta premium de verdad.</p>
               </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-5 rounded-[2rem] border border-[#e8d5bd]/60 bg-white/50 px-6 py-4 shadow-[0_16px_40px_rgba(138,99,61,0.1)] backdrop-blur-xl">
                <div className="text-xs font-semibold tracking-[0.25em] text-[#936740] uppercase">
                    360° Scroll
                </div>
                <div className="h-1 w-32 overflow-hidden rounded-full bg-[#ead5bb]/50 sm:w-48">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#b67f46,#e1bc8e)] transition-[width] duration-150 ease-out"
                      style={{ width: `${(frameLabel / spinFrames.length) * 100}%` }}
                    />
                </div>
                <div className="text-xs font-semibold tracking-[0.1em] text-[#b48353]">
                    {String(frameLabel).padStart(3, "0")} / {spinFrames.length}
                </div>
            </div>
          </div>
        </section>

        <section id="coleccion" className="section-shell py-20 sm:py-24">
          <div data-reveal className="mb-10 flex flex-col gap-4 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#b48353]">Featured collection</p>
              <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-[#472f1f] sm:text-6xl">
                Bolsos crochet con dirección de moda.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#6a513e] sm:text-base">
              Una selección pensada para mostrar textura, herrajes, caída y styling en una línea
              visual coherente con un universo beige premium.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3" data-stagger-group>
            {featuredPieces.map((piece, index) => (
              <article
                key={piece.title}
                data-stagger-item
                className="group accent-ring relative overflow-hidden rounded-[2rem] border border-[#e7d5bc] bg-[#fff8ef]/90 transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(138,99,61,0.18)]"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5d3f2c]/68 via-[#7d5a3a]/8 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#f8e7d1]">0{index + 1}</p>
                    <h3 className="mt-3 font-display text-3xl text-[#fff9f3]">{piece.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-7 text-[#f8eadc]">{piece.subtitle}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell py-20 sm:py-24">
          <div data-reveal className="mb-10 sm:mb-14">
            <p className="text-sm uppercase tracking-[0.35em] text-[#b48353]">Gallery showcase</p>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-[#472f1f] sm:text-6xl">
              Textura, luz y actitud.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" data-stagger-group>
            {gallery.map((image, index) => (
              <figure
                key={image}
                data-stagger-item
                className={`group relative overflow-hidden rounded-[1.75rem] border border-[#e8d5bd] bg-[#fff8ef]/88 shadow-[0_16px_48px_rgba(132,95,57,0.08)] ${
                  index % 5 === 0 ? "sm:col-span-2 xl:row-span-2" : ""
                }`}
              >
                <div className={`${index % 5 === 0 ? "aspect-[16/11] xl:h-full xl:min-h-[34rem]" : "aspect-[4/5]"} relative`}>
                  <div className="absolute inset-0" data-parallax>
                    <Image
                      src={image}
                      alt={`Detalle de la colección de Hand Made Crochet ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6a4730]/36 via-transparent to-[#fff7ea]/12 opacity-85" />
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section id="contacto" className="section-shell py-20 sm:py-24">
          <div className="overflow-hidden rounded-[2.4rem] border border-[#ddb98f] bg-[linear-gradient(135deg,#9e7048,#d8b385)] px-7 py-10 shadow-[0_28px_90px_rgba(149,104,59,0.16)] sm:px-10 sm:py-14 lg:px-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div data-reveal>
                <p className="text-sm uppercase tracking-[0.35em] text-white/72">Social & contact</p>
                <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-[#fffaf4] sm:text-6xl">
                  ¿Lista para llevar una pieza con firma propia?
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/84 sm:text-lg">
                  Descubrí más editoriales, escribile a la marca y reservá un bolso Hand Made
                  Crochet con textura artesanal, presencia visual y una paleta que se siente suya.
                </p>
              </div>

              <div data-reveal className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
                <Link
                  href="https://www.instagram.com/handmadecrochet.col/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#fff7ee] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#7c5533] shadow-[0_18px_40px_rgba(103,69,38,0.16)] hover:-translate-y-0.5"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.tiktok.com/@handmadecrochet24"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white hover:border-white/58 hover:bg-white/16"
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

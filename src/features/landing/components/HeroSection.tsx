import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { AnimatedGroup } from "@/shared/components/ui/animated-group";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // progress 0..1 across the viewport intersection window
  const { scrollYProgress } = useScroll({
    target: ref,
    // start when element enters viewport, end when it leaves
    offset: ["start 100%", "end 80%"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [70, 0]);

  return (
    <>
      <HeroHeader />
      <main>
        <div
          aria-hidden
          className="z-2 absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-140 h-320 -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6 relative z-10">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    to="#link"
                    className="hover:bg-bg-subtle dark:hover:border-t-border bg-bg-card group mx-auto flex w-fit items-center gap-4 rounded-full border border-border-subtle p-1 pl-4 shadow-sm shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      Introducing Orbit Modules v2
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-4xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-bdogrotesk font-medium tracking-tight bg-clip-text text-transparent bg-linear-to-t from-neutral-500 to-text-primary pb-1.5">
                    Modern Solutions for Finding Clarity
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl md:text-lg text-text-secondary leading-relaxed">
                    Highly customizable modules for organizing your complete
                    personal ecosystem. Build systems that look and feel exactly
                    the way you need.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-10 flex items-center justify-center gap-3 md:flex-row shadow-none relative z-20 pointer-events-auto"
                >
                  <div
                    key={1}
                    className="bg-brand/10 rounded-[14px] border border-brand/20 p-0.5 shadow-sm"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-6 text-base bg-brand hover:bg-brand-hover text-white shadow-md cursor-pointer relative z-20"
                    >
                      <Link to="/auth/login">
                        <span className="text-nowrap">Start Building</span>
                      </Link>
                    </Button>
                  </div>
                  <div key={2} className="relative z-20 cursor-pointer">
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-xl px-6 border-border-medium bg-bg-card hover:bg-bg-card-hover text-text-primary shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <Link to="#features">
                        <span className="text-nowrap">View features</span>
                      </Link>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="perspective-distant">
                <motion.div
                  ref={ref}
                  className="hero-img will-change-transform"
                  style={
                    reduce
                      ? undefined
                      : { rotateX, transformStyle: "preserve-3d" }
                  }
                >
                  <AnimatedGroup
                    variants={{
                      container: {
                        visible: {
                          transition: {
                            staggerChildren: 0.05,
                            delayChildren: 0.75,
                          },
                        },
                      },
                      ...transitionVariants,
                    }}
                  >
                    <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20 pb-20">
                      <div
                        aria-hidden
                        className="bg-linear-to-b from-transparent to-white dark:to-black absolute inset-0 z-10 from-35%"
                      />
                      <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                        <img
                          className="bg-background aspect-15/8 max-w-full relative hidden rounded-2xl dark:block"
                          src="https://tailark.com//_next/image?url=%2Fmail2.png&w=3840&q=75"
                          alt="app screen"
                          width="2700"
                          height="1440"
                        />
                        <img
                          className="z-2 border-border/25 aspect-15/8 max-w-full relative rounded-2xl border dark:hidden"
                          src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                          alt="app screen"
                          width="2700"
                          height="1440"
                        />
                      </div>
                    </div>
                  </AnimatedGroup>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2 group"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link to="#">
                    <span>Login</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link to="#">
                    <span>Sign Up</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  <Link to="#">
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex h-8 w-8 items-center justify-center",
        className,
      )}
    >
      <div className="absolute h-6 w-6 rounded-full border-[2.5px] border-brand group-hover:border-brand-hover transition-colors opacity-80" />
      <div className="absolute h-3 w-3 rounded-full bg-brand group-hover:bg-brand-hover transition-colors ml-3 mt-3" />
    </div>
  );
};

import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";
import { BorderBeam } from "@/shared/ui/border-beam";

export function CTABannerSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
          {/* Noise Background Overlay */}
          <div
            className="absolute inset-0 -z-20 opacity-[0.4] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dzl9yxixg/image/upload/v1711742433/noise_vv6u8y.png")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Gradient Mesh Background */}
          <div className="absolute inset-0 -z-30 bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(91,106,240,0.15),transparent_50%)]" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_100%_0%,rgba(155,107,242,0.1),transparent_50%)]" />
          </div>

          {/* Border Beam Effect */}
          <BorderBeam
            size={400}
            duration={12}
            delay={9}
            colorFrom="#5B6AF0"
            colorTo="#9B6BF2"
          />

          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your productivity?
                <br />
                Start using Orbit today.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Join thousands of users who have streamlined their life with our
                all-in-one organizer. Free forever, open source, and works on
                all your devices.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  className="rounded-xl bg-white px-8 py-6 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
                  asChild
                >
                  <Link to="/login">Get Started — It's Free</Link>
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-x-4 text-xs text-gray-400">
                <span>MIT Licensed</span>
                <span className="h-1 w-1 rounded-full bg-gray-500" />
                <span>No Credit Card</span>
                <span className="h-1 w-1 rounded-full bg-gray-500" />
                <span>Offline Support</span>
              </div>
            </motion.div>
          </div>

          {/* Background decorative circles */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#5B6AF0" />
                <stop offset={1} stopColor="#9B6BF2" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

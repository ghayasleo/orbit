import { motion } from 'framer-motion';
import { Particles } from './particles';
import { Logo } from './logo';

export function FullPageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-bg-base overflow-hidden"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        staticity={30}
        color="#3b82f6"
        size={0.6}
      />
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          {/* Animated glow rings */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-x-0 inset-y-0 -m-8 rounded-full bg-primary/20 blur-2xl"
          />
          
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute inset-x-0 inset-y-0 -m-16 rounded-full bg-primary/10 blur-3xl"
          />

          {/* Central Logo/Icon Placeholder */}
          <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-bg-card border border-border-subtle shadow-2xl backdrop-blur-md">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Logo size={48} />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-text-primary via-primary to-text-primary bg-size-[200%_auto] animate-gradient-x"
          >
            Orbit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-text-muted font-medium tracking-widest uppercase"
          >
            Synchronizing your space
          </motion.p>
        </div>
        
        {/* Progress bar */}
        <div className="w-48 h-1 bg-bg-subtle rounded-full overflow-hidden mt-4">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full bg-linear-to-r from-primary/50 via-primary to-primary/50"
          />
        </div>
      </div>
    </motion.div>
  );
}

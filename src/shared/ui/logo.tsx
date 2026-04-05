import { cn } from "@/shared/lib";

export interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo = ({ className, size = 32 }: LogoProps) => {
  const outerSize = size * 0.75;
  const innerSize = size * 0.375;
  const strokeWidth = Math.max(1.5, size * (2.5 / 32));

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0",
        className
      )}
      style={{ width: size, height: size }}
    >
      <div 
        className="absolute rounded-full border-brand group-hover:border-brand-hover transition-colors opacity-80" 
        style={{ 
          width: outerSize, 
          height: outerSize, 
          borderWidth: strokeWidth 
        }}
      />
      <div 
        className="absolute rounded-full bg-brand group-hover:bg-brand-hover transition-colors" 
        style={{ 
          width: innerSize, 
          height: innerSize,
          marginLeft: innerSize,
          marginTop: innerSize
        }} 
      />
    </div>
  );
};

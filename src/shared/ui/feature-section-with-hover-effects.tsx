import { cn } from "@/shared/lib";
import { APP_MODULES_ARRAY } from "@/shared/config";

// Features array is imported from shared config

export function FeaturesSectionWithHoverEffects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {APP_MODULES_ARRAY.map((feature, index) => {
        // Keep the original arbitrary bottom border styling logic to preserve design
        const showBottomBorder = ![8, 9, 10, 11].includes(index);
        return (
          <Feature
            key={feature.id}
            {...feature}
            index={index}
            showBottomBorder={showBottomBorder}
          />
        );
      })}
    </div>
  );
}

type FeatureProps = (typeof APP_MODULES_ARRAY)[number] & {
  index: number;
  showBottomBorder: boolean;
};

const Feature = ({
  title,
  featureDescription,
  icon: Icon,
  colorClass,
  index,
  showBottomBorder,
}: FeatureProps) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-900",
        (index === 0 || index % 4 === 0) &&
          "lg:border-l dark:border-neutral-900",
        showBottomBorder && "lg:border-b dark:border-neutral-900",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        <Icon className={colorClass} />
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 group-hover/feature:bg-brand rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {featureDescription}
      </p>
    </div>
  );
};

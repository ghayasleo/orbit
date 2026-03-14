interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-text-primary font-bdogrotesk">
        {title}
      </h2>
      <p className="text-sm text-text-secondary mt-1">{description}</p>
    </div>
  );
}

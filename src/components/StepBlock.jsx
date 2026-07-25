export default function StepBlock({ number, title, children }) {
  return (
    <div className="relative flex gap-6 items-start">
      <span className="font-heading text-orange text-6xl md:text-8xl leading-none shrink-0 select-none">
        {number}
      </span>
      <div className="pt-2 md:pt-4">
        <h3 className="font-heading text-xl md:text-2xl uppercase mb-2">{title}</h3>
        <div className="text-gray-text text-sm md:text-base space-y-2">{children}</div>
      </div>
    </div>
  );
}

export default function MeshBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="animate-drift absolute -top-32 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle, #FF5C33 0%, transparent 70%)' }}
      />
      <div
        className="animate-drift absolute top-1/3 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #FF2D78 0%, transparent 70%)', animationDelay: '3s' }}
      />
    </div>
  );
}

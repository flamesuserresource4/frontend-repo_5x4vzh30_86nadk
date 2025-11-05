import Spline from '@splinetool/react-spline';

export default function BackgroundAurora() {
  return (
    <div className="pointer-events-none fixed inset-0">
      {/* 3D Spline scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/DHqV6oEjn0vFZQKN/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlays to enrich the scene without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" />
    </div>
  );
}

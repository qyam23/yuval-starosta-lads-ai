import { useId } from "react";

type NavbarBrandProps = {
  className?: string;
};

export default function NavbarBrand({ className = "" }: NavbarBrandProps) {
  const id = useId().replace(/:/g, "");
  const metalGradient = `${id}-metal`;
  const steelGradient = `${id}-steel`;
  const electricGradient = `${id}-electric`;
  const orangeGradient = `${id}-orange`;
  const softGlow = `${id}-glow`;
  const traceGlow = `${id}-trace`;

  return (
    <div className={`flex min-w-0 items-center gap-4 sm:gap-[1.1rem] ${className}`.trim()}>
      <div className="navbar-brand__icon relative flex h-[3.6rem] w-[3.6rem] flex-none items-center justify-center sm:h-[4.35rem] sm:w-[4.35rem]">
        <svg viewBox="0 0 132 132" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={metalGradient} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4f8fc" />
              <stop offset="42%" stopColor="#c1ccd8" />
              <stop offset="100%" stopColor="#6d7686" />
            </linearGradient>
            <linearGradient id={steelGradient} x1="0%" y1="12%" x2="100%" y2="88%">
              <stop offset="0%" stopColor="#eef3f8" />
              <stop offset="52%" stopColor="#96a3b6" />
              <stop offset="100%" stopColor="#4b5667" />
            </linearGradient>
            <linearGradient id={electricGradient} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7fdcff" />
              <stop offset="100%" stopColor="#2b63ff" />
            </linearGradient>
            <linearGradient id={orangeGradient} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffcf70" />
              <stop offset="100%" stopColor="#cf7f14" />
            </linearGradient>
            <filter id={softGlow} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={traceGlow} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.1" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0.12
                        0 0 1 0 0.26
                        0 0 0 0.95 0"
              />
            </filter>
          </defs>

          <g opacity="0.8" filter={`url(#${traceGlow})`}>
            <path
              d="M18 45 C27 45, 31 39, 39 39 H52"
              fill="none"
              stroke="#64d4ff"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M16 61 H40 C45 61, 48 58, 48 53 V49"
              fill="none"
              stroke="#50c8ff"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M30 87 H45 C50 87, 55 82, 55 77 V72"
              fill="none"
              stroke="#50c8ff"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="16" cy="61" r="2.3" fill="#8fe6ff" />
            <circle cx="30" cy="87" r="2.3" fill="#8fe6ff" />
            <circle cx="18" cy="45" r="2.1" fill="#8fe6ff" />
          </g>

          <circle cx="65" cy="66" r="49" fill="rgba(84,146,214,0.09)" />
          <circle cx="65" cy="66" r="41" fill="rgba(12,21,34,0.66)" stroke="rgba(160,197,236,0.14)" />

          <g className="navbar-brand__gear navbar-brand__gear--small-a">
            <Gear
              cx={37}
              cy={39}
              outerRadius={18}
              innerRadius={8}
              toothWidth={5.4}
              toothHeight={6}
              toothCount={8}
              fill={`url(#${steelGradient})`}
              stroke="#dfe8f4"
            />
          </g>

          <g className="navbar-brand__gear navbar-brand__gear--small-b">
            <Gear
              cx={94}
              cy={36}
              outerRadius={16}
              innerRadius={7}
              toothWidth={5}
              toothHeight={5.6}
              toothCount={8}
              fill={`url(#${steelGradient})`}
              stroke="#dfe8f4"
            />
          </g>

          <g className="navbar-brand__gear navbar-brand__gear--main">
            <Gear
              cx={63}
              cy={67}
              outerRadius={26}
              innerRadius={12}
              toothWidth={6.8}
              toothHeight={8}
              toothCount={10}
              fill={`url(#${metalGradient})`}
              stroke="#e8eef7"
            />
          </g>

          <g filter={`url(#${softGlow})`}>
            <path d="M50 53 L67 44 L84 53 L67 62 Z" fill={`url(#${electricGradient})`} />
          </g>
          <g filter={`url(#${softGlow})`}>
            <path d="M50 53 L67 62 L67 83 L50 74 Z" fill={`url(#${electricGradient})`} />
            <path d="M84 53 L67 62 L67 83 L84 74 Z" fill="#2f71d8" />
            <path d="M66 46 L97 34 L99 44 L67 56 Z" fill={`url(#${orangeGradient})`} opacity="0.96" />
            <path d="M67 58 L102 45 L104 56 L67 70 Z" fill={`url(#${orangeGradient})`} opacity="0.86" />
          </g>

          <g opacity="0.92" filter={`url(#${traceGlow})`}>
            <path
              d="M84 62 H102 C107 62, 111 58, 111 53 V45"
              fill="none"
              stroke="#6de2ff"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="111" cy="45" r="2.2" fill="#9be8ff" />
            <circle cx="111" cy="33" r="1.8" fill="#9be8ff" opacity="0.84" />
            <circle cx="20" cy="27" r="1.8" fill="#9be8ff" opacity="0.86" />
            <circle cx="111" cy="98" r="2.1" fill="#9be8ff" opacity="0.86" />
          </g>
        </svg>
      </div>

      <span className="navbar-brand__text block min-w-0 whitespace-nowrap leading-none">
        <span className="navbar-brand__text-word navbar-brand__text-word--primary">Starosta</span>
        <span className="navbar-brand__text-separator" aria-hidden="true">&nbsp;</span>
        <span className="navbar-brand__text-word navbar-brand__text-word--accent">Industrial</span>
      </span>
    </div>
  );
}

type GearProps = {
  cx: number;
  cy: number;
  outerRadius: number;
  innerRadius: number;
  toothWidth: number;
  toothHeight: number;
  toothCount: number;
  fill: string;
  stroke: string;
};

function Gear({ cx, cy, outerRadius, innerRadius, toothWidth, toothHeight, toothCount, fill, stroke }: GearProps) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {Array.from({ length: toothCount }).map((_, index) => {
        const angle = (360 / toothCount) * index;
        return (
          <rect
            key={angle}
            x={-toothWidth / 2}
            y={-(outerRadius + toothHeight)}
            width={toothWidth}
            height={toothHeight}
            rx={toothWidth / 3}
            fill={fill}
            transform={`rotate(${angle})`}
          />
        );
      })}
      <circle r={outerRadius} fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle r={innerRadius + 4} fill="#09101b" stroke="rgba(232,238,247,0.45)" strokeWidth="1.2" />
      <circle r={innerRadius - 1} fill="#101b2b" stroke="rgba(109, 205, 255, 0.28)" strokeWidth="1.2" />
    </g>
  );
}

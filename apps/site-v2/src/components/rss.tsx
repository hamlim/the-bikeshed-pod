import type { SVGProps } from "react";

interface LogoIconProps {
  attributes?: SVGProps<SVGSVGElement>;
  className?: string;
}

export function Rss({
  attributes = { role: "graphics-symbol" },
  className,
}: LogoIconProps) {
  return (
    <svg
      {...attributes}
      className={className}
      width="120"
      height="120"
      viewBox="0 0 31.75 31.75"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>RSS</title>
      <g id="layer1">
        <g
          id="g683"
          transform="matrix(0.26458333,0,0,0.26458333,-8.8489774,-15.621043)"
        >
          <rect
            style={{
              fill: "#ff7f2a",
              strokeWidth: "0.635",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            width="100"
            height="100"
            x="43.444954"
            y="69.040161"
            rx="21.251678"
            ry="21.251678"
          />
          <ellipse
            style={{
              fill: "#f2f2f2",
              strokeWidth: "1.20348",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            cx="69.901382"
            cy="141.92136"
            rx="10.357387"
            ry="10.120168"
          />
          <path
            style={{
              fill: "#f2f2f2",
              strokeWidth: "0.635",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            d="m 59.835641,106.93038 v 10.80296 a 35.029171,35.029171 0 0 1 34.874357,34.87384 h 10.802442 a 45.676788,45.676788 0 0 0 -45.676799,-45.6768 z"
          />
          <path
            style={{
              fill: "#f2f2f2",
              strokeWidth: "0.87785",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            d="m -81.988277,59.856295 c 0,0 -10.066183,0.06645 -10.117729,0.122473 -5.28e-4,33.446743 -27.088614,60.574142 -60.535324,60.623172 v 9.90689 c 39.02047,1.7e-4 70.652935,-31.632064 70.653053,-70.652535 z"
            transform="rotate(-90)"
          />
        </g>
      </g>
    </svg>
  );
}

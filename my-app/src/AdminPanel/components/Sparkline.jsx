export default function Sparkline({ data = [], stroke }) {
  if (!data.length) return null;

  const w = 80;
  const h = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h}>
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}

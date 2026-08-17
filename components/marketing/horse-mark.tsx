type HorseMarkProps = {
  className?: string;
  decorative?: boolean;
};

export function HorseMark({ className = "h-7 w-7", decorative = true }: HorseMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Horse profile"}
    >
      <path
        d="M35.8 8.2c-3.2 2.1-5.2 4.8-6.1 8.1-2.7-2.4-6-3.8-10-4.1l2.2 5.4c-4.4 2.1-7.7 6.2-8.9 11.1l5.8-2.4c1.1 6.6 5.4 11.3 12.2 13.5-1.4-3.1-1.5-6.2-.4-9.3 4.2-.8 7.4-3.1 9.6-6.9l-4.3-1.2 3-3.3-4.6-1.1c1.5-3.5 2-6.8 1.5-9.8Z"
        fill="currentColor"
      />
      <circle cx="31.8" cy="18.8" r="1.1" fill="white" />
    </svg>
  );
}

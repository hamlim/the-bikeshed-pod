export const youtubeChannelUrl = "https://www.youtube.com/@BikeshedPod";

export function YouTube({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={32}
      height={32}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="4" width="22" height="16" rx="4" fill="#FF0033" />
      <path d="M10 8.5v7l6-3.5z" fill="#fff" />
    </svg>
  );
}

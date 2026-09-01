/** A gable and a rule: the two things every guide on this app ends up being about. */
export default function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#244D4D" />
      <path d="M8 17.5 16 10l8 7.5" stroke="#FBF9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 17v6.5h11V17" stroke="#FBF9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 23.5V20h4v3.5" stroke="#C8D5CB" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

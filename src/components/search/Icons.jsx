export const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={`${className} text-blue-600`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="7" strokeWidth={2.5} />
    <line x1="16" y1="16" x2="21" y2="21" strokeWidth={2.5} strokeLinecap="round" />
  </svg>
);

export const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={`${className} text-red-500`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
    />
    <circle cx="12" cy="10" r="3" strokeWidth={2} />
  </svg>
);

export const HistoryIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={`${className} text-green-500`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" strokeWidth={2.5} />
    <path strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l4 2" />
  </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={`${className} text-gray-700`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line x1="6" y1="6" x2="18" y2="18" strokeWidth={3} strokeLinecap="round" />
    <line x1="6" y1="18" x2="18" y2="6" strokeWidth={3} strokeLinecap="round" />
  </svg>
);

export const LoadingIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={`${className} animate-spin text-purple-600`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      strokeWidth={3}
      strokeDasharray="60"
      strokeDashoffset="20"
      strokeLinecap="round"
    />
  </svg>
);

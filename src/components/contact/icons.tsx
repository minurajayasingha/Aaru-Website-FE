type FieldIconProps = {
  className?: string;
};

export function UserFieldIcon({ className }: FieldIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="10" cy="6.5" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 17c.8-3.5 3.7-5.5 6.5-5.5s5.7 2 6.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneFieldIcon({ className }: FieldIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 3.5h2.5l1.2 3.2-1.6 1.4a9 9 0 0 0 4.8 4.8l1.4-1.6 3.2 1.2V15c0 .9-.8 1.6-1.7 1.5C8.6 15.9 4.1 11.4 3.5 6.2 3.4 5.3 3.1 4 4 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmailFieldIcon({ className }: FieldIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 5.5l7 5.5 7-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeFieldIcon({ className }: FieldIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 10h15M10 2.5c2 2.2 3 4.8 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.8-3-7.5s1-5.3 3-7.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function BuildingFieldIcon({ className }: FieldIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="2.5" width="12" height="15" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 6h1.5M11.5 6H13M7 9.5h1.5M11.5 9.5H13M7 13h1.5M11.5 13H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MessageFieldIcon({ className }: FieldIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2.5 5.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H8l-3.5 3v-3H4a1.5 1.5 0 0 1-1.5-1.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MegaphoneFieldIcon({ className }: FieldIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 8h2.3L13 4.2v11.6L5.3 12H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6 12.3L7 17h2l-.9-4.7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15.5 7a3.3 3.3 0 0 1 0 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: FieldIconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4.5 7.5l5.5 5.5 5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

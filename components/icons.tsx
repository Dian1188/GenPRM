
import React from 'react';

export const PencilIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);

export const SprayCanIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h1.5a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H18"></path>
        <path d="M12 10h4"></path>
        <path d="M12 14h2"></path>
        <path d="M12 18h4"></path>
        <path d="m6 10 1.5-1.5"></path>
        <path d="m6 14 1.5-1.5"></path>
        <path d="m6 18 1.5-1.5"></path>
        <path d="M19 10c0 6-4 6-4 6H9c-1.7 0-3-1.3-3-3v- pensato-3c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v2z"></path>
    </svg>
);

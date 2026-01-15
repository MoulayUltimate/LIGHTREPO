import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    background?: 'default' | 'white' | 'gray';
    spacing?: boolean;
}

export function Section({
    children,
    className = '',
    background = 'default',
    spacing = true
}: SectionProps) {
    const bgClasses = {
        default: 'bg-light',
        white: 'bg-white',
        gray: 'bg-gray-50',
    };

    return (
        <section
            className={`${spacing ? 'section-spacing' : ''} ${bgClasses[background]} ${className}`}
        >
            <div className="container-custom">
                {children}
            </div>
        </section>
    );
}

'use client';

import { Shield } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';

const partners = [
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg',
        title: 'Compatible with Adobe',
        description: 'Import vector files directly into LightBurn',
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/CorelDraw_logo.svg',
        title: 'Works with CorelDRAW',
        description: 'Smooth vector design import workflow',
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Autodesk_Logo_2021.svg',
        title: 'Autodesk Compatible',
        description: 'Perfect support for DXF and CAD drawings',
    },
    {
        logo: 'https://lightburntool.com/wp-content/uploads/2025/03/1555.webp',
        title: 'Official LightBurn Pro',
        description: 'Genuine License • Instant Delivery',
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
        title: 'Secured by PayPal',
        description: 'Safe payments & buyer protection',
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/ISO_9001-2015.svg',
        title: 'ISO 9001 Certified',
        description: 'Trusted quality for business-grade software',
    },
];

export default function TrustedPartners() {
    return (
        <Section background="default">
            <div className="max-w-4xl mx-auto">
                {/* Header with animated underline */}
                <div className="flex items-center gap-4 mb-8 group">
                    <Shield className="h-8 w-8 text-gray-900" />
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 relative pb-2">
                        Trusted by Laser Engraving Professionals Worldwide
                        <span className="absolute left-0 bottom-0 h-1 bg-primary rounded-full transition-all duration-500 w-0 group-hover:w-full" />
                    </h3>
                </div>

                {/* Partner Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-7 flex items-center gap-5 border border-gray-200 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                        >
                            {/* Animated left border */}
                            <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />

                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <div className="relative w-11 h-11">
                                    <Image
                                        src={partner.logo}
                                        alt={`${partner.title} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div>
                                <div className="font-bold text-lg mb-1.5 text-gray-900">
                                    {partner.title}
                                </div>
                                <div className="text-base text-gray-600">
                                    {partner.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

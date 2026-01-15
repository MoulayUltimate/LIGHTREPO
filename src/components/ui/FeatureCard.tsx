import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
                <Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
}

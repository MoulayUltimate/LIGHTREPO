'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Section } from '@/components/ui/Section';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: 'How long does my license last?',
        answer:
            'LightBurn will work forever as long as you have your license key, but after a year you will need to renew the maintenance on your license to keep getting the latest features and updates.',
    },
    {
        question: 'What operating systems does your software work with?',
        answer: 'Windows 10+',
    },
    {
        question: 'Is LightBurn Compatible with My Laser Machine?',
        answer:
            '✔ Ruida (CO2)\n✔ GRBL (Diode and CO2 lasers)\n✔ Smoothieboard\n✔ TopWisdom\n✔ EZCad2 & EZCad2-Lite (Galvo fiber, CO2, and UV)\n\n💡 Not sure about compatibility? Download the free trial and test it directly with your machine.',
    },
    {
        question: 'Does LightBurn Work on Windows, Mac, and Linux?',
        answer:
            'Yes! LightBurn is compatible with Windows only, allowing you to use it on your preferred operating system.\n\n💡 Try it risk-free – Download the 30-day free trial and see how it works on your device!',
    },
    {
        question: 'Is LightBurn a Subscription or a One-Time Purchase?',
        answer:
            'LightBurn is a One-Time Purchase – No Monthly Subscription!\n\nWhen you buy LightBurn, you get lifetime access with 12 months of free updates included.',
    },
    {
        question: 'What Happens After 12 Months? Do I Need to Pay Again?',
        answer:
            'No, you do not need to pay again. After 12 months, you can continue using LightBurn indefinitely with the last version you received.\n\nIf you want to receive new updates after the first year, you can renew your license at any time, but this is completely optional.',
    },
    {
        question: 'Can my whole team use the software?',
        answer:
            'Yes, even commercial businesses can use the same Activation across their entire team without additional costs.',
    },
    {
        question: 'How do I buy the software?',
        answer:
            "It's easy! Just add it to your cart, fill in your details, and you'll get your Download Link right after completing your purchase.",
    },
];

function FAQAccordion({ item }: { item: FAQItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-semibold text-lg pr-4">{item.question}</span>
                <div className="flex-shrink-0">
                    {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                </div>
            </button>
            {isOpen && (
                <div className="px-6 pb-6 border-t">
                    <p className="text-gray-600 whitespace-pre-line pt-4 leading-relaxed">
                        {item.answer}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    return (
        <Section background="gray">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        FAQ For LightBurn Pro
                    </h1>
                    <p className="text-xl text-gray-600">
                        Find answers to the most commonly asked questions about LightBurn Pro
                    </p>
                </div>

                <div>
                    {faqData.map((item, index) => (
                        <FAQAccordion key={index} item={item} />
                    ))}
                </div>
            </div>
        </Section>
    );
}

'use client';

import { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // TODO: Implement Formspree or Cloudflare Workers integration
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Section background="gray">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100">
                        <MessageSquare className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600">
                        Have a question? We'd love to hear from you. Send us a message and we'll respond as
                        soon as possible.
                    </p>
                </div>

                {/* Success/Error Messages */}
                {status === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
                        <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to
                        you soon.
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
                        <strong>Oops!</strong> Something went wrong. Please try again later.
                    </div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="card p-8">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-700">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
                                placeholder="Tell us more about your inquiry..."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={status === 'sending'}
                            variant="primary"
                            size="lg"
                            className="w-full"
                        >
                            {status === 'sending' ? (
                                'Sending...'
                            ) : (
                                <>
                                    <Send className="h-5 w-5 mr-2" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                {/* Contact Info */}
                <div className="mt-12 text-center p-6 bg-blue-50 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600 mx-auto mb-3" />
                    <p className="text-gray-700">
                        You can also email us directly at{' '}
                        <a
                            href="mailto:contact@lightburnpro.de"
                            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                        >
                            contact@lightburnpro.de
                        </a>
                    </p>
                </div>
            </div>
        </Section>
    );
}

import Image from 'next/image';
import Link from 'next/link';
import {
  Clock, Shield, Check, Headphones, Zap, Award,
  Sparkles, Download, Lock, TrendingUp, Users, Gem
} from 'lucide-react';
import { products } from '@/data/products';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { ProductCard } from '@/components/ui/ProductCard';
import FAQSection from '@/components/FAQSection';
import TrustedPartners from '@/components/TrustedPartners';

export default function Home() {
  const product = products[0];

  return (
    <div className="flex flex-col bg-light min-h-screen">
      {/* Hero Section - Modern Split Layout */}
      <section className="relative bg-gradient-to-br from-white via-gray-50 to-red-50 py-16 md:py-20 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                #1 Laser Engraving Software 2025
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your Laser Cutting Workflow
              </h1>

              <p className="text-xl text-gray-600">
                Professional-grade control software trusted by <span className="text-primary font-bold">50,000+</span> makers worldwide.
                One-time payment, lifetime access.
              </p>

              {/* Key Points */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Instant digital delivery in 1-30 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">No subscription - pay once, use forever</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Free 30-day trial available</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="#product">
                  <Button variant="primary" size="lg" className="shadow-xl shadow-primary/20">
                    🎯 Get 10% OFF Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Try Free Demo
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>

            {/* Right - Product Image */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-xl aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-software.png"
                  alt="LightBurn Software Interface"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.9★</div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white border-y border-gray-100 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">72%</div>
              <div className="text-sm text-gray-600">Discount Today</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">1-30min</div>
              <div className="text-sm text-gray-600">Instant Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">30 Days</div>
              <div className="text-sm text-gray-600">Free Trial</div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivation Section - Why Upgrade */}
      <Section background="white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Gem className="h-4 w-4" />
            Why Professionals Choose LightBurn
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Struggling with Limited Software
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of laser engraving professionals who've upgraded their workflow
            and unlocked their machine's full potential with LightBurn Pro.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Work Faster',
                description: '3X faster workflow with advanced automation and batch processing',
                color: 'yellow',
              },
              {
                icon: Award,
                title: 'Better Results',
                description: 'Professional-grade output with precise control and optimization',
                color: 'blue',
              },
              {
                icon: TrendingUp,
                title: 'Grow Your Business',
                description: 'Scale production with multi-machine support and job management',
                color: 'green',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features Grid */}
      <Section background="white" spacing={false}>
        <div className="border-y border-gray-100 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Clock}
              title="INSTANT DELIVERY"
              description="1-30 minutes delivery time"
            />
            <FeatureCard
              icon={Shield}
              title="NO EXTRA CHARGES"
              description="No hidden fees"
            />
            <FeatureCard
              icon={Lock}
              title="SAFE PAYMENTS"
              description="Secure credit card processing"
            />
            <FeatureCard
              icon={Headphones}
              title="24/7 SUPPORT"
              description="Always available to help"
            />
          </div>
        </div>
      </Section>

      {/* Product Description - Dark Red Gradient Section */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #5A1E2E 0%, #8B2E41 50%, #A84655 100%)'
      }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom max-w-6xl relative z-10">
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center md:text-left">
            Layout, editing, and control software for your laser cutter with LightBurn
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-white text-base md:text-lg">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 flex-shrink-0 mt-1" />
                <p>Import artwork in a variety of common vector graphic and image formats.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 flex-shrink-0 mt-1" />
                <p>Arrange, edit, and even create new vector shapes within LightBurn's powerful editor.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 flex-shrink-0 mt-1" />
                <p>Apply settings like power, speed, number of passes, cut order, brightness & contrast, dithering mode, and many more!</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 flex-shrink-0 mt-1" />
                <p>LightBurn is a native application written for Windows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <TrustedPartners />

      {/* Product Showcase */}
      <Section background="default">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get LightBurn Pro Today</h2>
            <p className="text-xl text-gray-600">Limited time offer - Save 72% on your purchase</p>
          </div>
          <ProductCard product={product} featured={true} />
        </div>
      </Section>

      {/* Why Choose Section */}
      <Section background="default">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-12 text-3xl md:text-4xl font-bold">Why Choose LightBurn?</h2>
          <div className="space-y-4">
            {[
              'The Best Laser Engraving Software – Trusted by thousands of users worldwide',
              'Work For All Countries – No geographic restrictions',
              'Quick and Easy Installation – Get started in minutes',
              '30-Day Free Trial – Try it before you buy',
              'Secure Payment – Pay with PayPal, credit card, and more',
              '100% Satisfaction Guarantee or Your Money Back – Buy with confidence',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-5 rounded-xl bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-gray-700 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-red-100/50 rounded-2xl">
            <p className="text-2xl font-bold mb-4">Ready to take control of your laser?</p>
            <p className="text-gray-600 mb-6">Join 50,000+ professionals using LightBurn Pro</p>
            <Link href={`/product/${product.slug}`}>
              <Button variant="primary" size="lg" className="shadow-xl">
                Get Started Now - Save 72%
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

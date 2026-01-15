'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export default function ProductPage() {
    const params = useParams();
    const addItem = useCartStore((state) => state.addItem);
    const product = products.find((p) => p.slug === params.slug);

    if (!product) {
        return (
            <Section>
                <div className="text-center py-16">
                    <h1 className="text-3xl font-bold mb-4">Product not found</h1>
                    <Button variant="primary">
                        <a href="/">Return to Home</a>
                    </Button>
                </div>
            </Section>
        );
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
        });
    };

    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    return (
        <Section background="white">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Product Image */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                    {discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md font-bold shadow-lg">
                            SAVE {discount}%
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">{product.name}</h1>

                    {/* Pricing */}
                    <div className="flex items-center gap-4 mb-6 p-6 bg-gray-50 rounded-lg">
                        <div>
                            <span className="text-5xl font-bold text-gray-900">
                                €{product.price.toFixed(2)}
                            </span>
                            {product.originalPrice > product.price && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xl text-gray-500 line-through">
                                        €{product.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                                        {discount}% OFF
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-8">
                        <span
                            className={`inline-flex items-center gap-2 text-lg font-semibold px-4 py-2 rounded-md ${product.inStock
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {product.inStock ? (
                                <>
                                    <Check className="h-5 w-5" />
                                    In Stock - Ready for Instant Delivery
                                </>
                            ) : (
                                'Out of Stock'
                            )}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        variant="primary"
                        size="lg"
                        className="w-full mb-8"
                    >
                        Add to Cart
                    </Button>

                    {/* Description */}
                    <div className="mb-8 p-6 border rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Description</h2>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Features */}
                    <div className="mb-8 p-6 border rounded-lg bg-blue-50">
                        <h2 className="text-xl font-bold mb-4">Key Features</h2>
                        <ul className="space-y-3">
                            {product.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Compatibility */}
                    <div className="p-6 border rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Compatibility</h2>
                        <ul className="space-y-3">
                            {product.compatibility.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    );
}

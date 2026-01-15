export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    image: string;
    slug: string;
    inStock: boolean;
    features: string[];
    compatibility: string[];
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
}

export interface Feature {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

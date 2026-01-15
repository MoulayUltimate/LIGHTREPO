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

export const products: Product[] = [
    {
        id: 'lightburn-pro-de',
        name: 'LightBurn Pro Laser Engraving Software - Multilingual',
        description: 'Layout, editing, and control software for your laser cutter with LightBurn',
        price: 57.72,
        originalPrice: 209.00,
        image: '/product-featured.png',
        slug: 'lightburn-pro-de',
        inStock: true,
        features: [
            'Instant Delivery 1-30 min',
            'No Extra Charges',
            'Safe Payments - Credit Card',
            '24/7 Support Available',
        ],
        compatibility: [
            'Ruida (CO2)',
            'GRBL (Diode and CO2 lasers)',
            'Smoothieboard',
            'TopWisdom',
            'EZCad2 & EZCad2-Lite (Galvo fiber, CO2, and UV)',
        ],
    },
];

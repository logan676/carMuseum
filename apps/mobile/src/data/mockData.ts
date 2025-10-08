import type {
  Brand,
  CarModel,
  Dealership,
  GarageVehicle,
  NewsArticle,
  NewsCategory,
  QuickLink,
  RestorationProject,
  TimelineEntry,
} from '@autoverse/shared';

export type {
  Brand,
  CarModel,
  Dealership,
  GarageVehicle,
  NewsArticle,
  NewsCategory,
  QuickLink,
  RestorationProject,
  TimelineEntry,
} from '@autoverse/shared';

export const newsCategories: NewsCategory[] = ['All', 'Reviews', 'Industry', 'Electric', 'Concept'];

export const newsArticles: NewsArticle[] = [
  {
    id: 'article-1',
    category: 'Industry',
    title: 'Tesla’s New Model X Plaid Sets Record',
    summary: 'The Model X Plaid just smashed the Nürburgring record for electric SUVs with blistering performance.',
    image: 'https://images.unsplash.com/photo-1617813488747-15c369597f84?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2h ago',
  },
  {
    id: 'article-2',
    category: 'Reviews',
    title: 'First Drive: 2024 Porsche 911 GT3 RS',
    summary: 'Track-focused precision meets everyday usability in Porsche’s sharpest 911 yet.',
    image: 'https://images.unsplash.com/photo-1614543103133-3e3f316b026c?auto=format&fit=crop&w=800&q=80',
    publishedAt: '4h ago',
  },
  {
    id: 'article-3',
    category: 'Industry',
    title: 'Ford Announces New Electric Pickup Truck',
    summary: 'Ford introduces a dual-motor powerhouse aimed at redefining electric workhorse expectations.',
    image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b3f067?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Yesterday',
  },
  {
    id: 'article-4',
    category: 'Reviews',
    title: 'Review: 2023 BMW M3 Competition',
    summary: 'A potent blend of agility and power keeps the M3 Competition ahead of the performance sedan pack.',
    image: 'https://images.unsplash.com/photo-1617468365199-1eebaaaa1cad?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Yesterday',
  },
  {
    id: 'article-5',
    category: 'Electric',
    title: 'Lucid Reveals 900hp Luxury EV Concept',
    summary: 'Lucid Motors teases a flagship sedan concept featuring next-gen battery efficiency and luxury.',
    image: 'https://images.unsplash.com/photo-1617813536166-f939bf0dcd0e?auto=format&fit=crop&w=800&q=80',
    publishedAt: '3d ago',
  },
];

export const featuredModels: CarModel[] = [
  {
    id: 'model-911',
    name: 'Porsche 911',
    description: 'Iconic sports car',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'model-s-class',
    name: 'Mercedes-Benz S-Class',
    description: 'Luxury sedan',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'model-i8',
    name: 'BMW i8',
    description: 'Hybrid grand tourer',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80',
  },
];

export const quickLinks: QuickLink[] = [
  {
    id: 'link-encyclopedia',
    label: 'Encyclopedia',
    icon: 'book-outline',
    route: 'Encyclopedia',
  },
  {
    id: 'link-news',
    label: 'News',
    icon: 'newspaper-outline',
    route: 'News',
  },
  {
    id: 'link-garage',
    label: 'My Garage',
    icon: 'car-sport-outline',
    route: 'MyGarage',
  },
  {
    id: 'link-dealerships',
    label: 'Dealerships',
    icon: 'map-outline',
    route: 'FindDealerships',
  },
];

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'timeline-1',
    title: 'The Birth of the Automobile',
    period: '1886 – 1900',
    description: 'Explore how Karl Benz and innovators laid the foundation for modern mobility.',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80',
  },
];

export const restorationProjects: RestorationProject[] = [
  {
    id: 'project-camaro',
    title: '1969 Chevrolet Camaro',
    description: 'A frame-off restoration story of a muscle car legend.',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'project-356',
    title: '1957 Porsche 356A',
    description: 'From rust to glory: a detailed journey.',
    image: 'https://images.unsplash.com/photo-1517940883891-8f953ccf9d6b?auto=format&fit=crop&w=800&q=80',
  },
];

export const brands: Brand[] = [
  {
    id: 'brand-aurora',
    name: 'Aurora Motors',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'brand-stellar',
    name: 'Stellar Autos',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'brand-heritage',
    name: 'Heritage Classics',
    image: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'brand-momentum',
    name: 'Momentum EV',
    image: 'https://images.unsplash.com/photo-1533473358670-066b1fbed38d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'brand-vintage',
    name: 'Vintage Works',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'brand-nova',
    name: 'Nova Concepts',
    image: 'https://images.unsplash.com/photo-1589394816449-929f0c3841f5?auto=format&fit=crop&w=300&q=80',
  },
];

export const encyclopediaModels: CarModel[] = [
  {
    id: 'model-x',
    name: 'Model X',
    description: 'Electric performance SUV',
    image: 'https://images.unsplash.com/photo-1617815896214-3be0b5a69344?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'model-y',
    name: 'Model Y',
    description: 'Compact crossover',
    image: 'https://images.unsplash.com/photo-1453491945771-a1e904948959?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'model-z',
    name: 'Model Z',
    description: 'Futuristic concept coupe',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'model-a',
    name: 'Model A',
    description: 'Restored classic',
    image: 'https://images.unsplash.com/photo-1437957146754-f6377debe171?auto=format&fit=crop&w=900&q=80',
  },
];

export const garageVehicles: GarageVehicle[] = [
  {
    id: 'garage-model-3',
    name: 'Tesla Model 3',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'garage-bmw-3',
    name: 'BMW 3 Series',
    year: '2018',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  },
];

export const dealerships: Dealership[] = [
  {
    id: 'dealership-1',
    name: 'Auto World',
    address: '123 Main St, San Francisco',
    image: 'https://images.unsplash.com/photo-1589394816449-929f0c3841f5?auto=format&fit=crop&w=800&q=80',
    latitude: 37.78525,
    longitude: -122.4314,
  },
  {
    id: 'dealership-2',
    name: 'Heritage Garage',
    address: '525 Mission St, San Francisco',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
    latitude: 37.7893,
    longitude: -122.401,
  },
];

export type NewsCategory = 'All' | 'Reviews' | 'Industry' | 'Electric' | 'Concept';

export interface NewsArticle {
  id: string;
  category: NewsCategory;
  title: string;
  summary: string;
  image: string;
  publishedAt: string;
}

export interface CarModel {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface QuickLink {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  period: string;
  image: string;
  description: string;
}

export interface RestorationProject {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  image: string;
}

export interface GarageVehicle {
  id: string;
  name: string;
  year: string;
  image: string;
}

export interface Dealership {
  id: string;
  name: string;
  address: string;
  image: string;
  latitude: number;
  longitude: number;
}

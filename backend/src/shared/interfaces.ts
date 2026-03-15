export interface Build {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  specs: string[];
  color: string;
  popular?: boolean;
  category: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface ConfigRecommendation {
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  cooler: string;
  psu: string;
  price: number;
  fps: string;
  description: string;
  upgrades: string[];
}

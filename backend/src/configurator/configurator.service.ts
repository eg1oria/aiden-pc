import { Injectable } from '@nestjs/common';
import { RecommendDto } from './dto/recommend.dto';
import { ConfigRecommendation } from '../shared/interfaces';

@Injectable()
export class ConfiguratorService {
  getRecommendation(dto: RecommendDto): ConfigRecommendation {
    const { purpose, budget, priority } = dto;

    if (purpose === 'office' || budget <= 40000) {
      return {
        name: 'Office Starter',
        cpu: 'Intel Core i3-12100',
        gpu: 'Встроенная графика',
        ram: '16GB DDR4-3200',
        storage: '500GB NVMe SSD',
        cooler: 'Box Cooler',
        psu: '450W 80+ Bronze',
        price: Math.min(budget, 35000),
        fps: '—',
        description: 'Надёжная сборка для работы с документами, браузером и учёбы.',
        upgrades: ['Добавить SSD на 1TB (+3 000 ₽)', 'Поставить i5 для запаса (+6 000 ₽)'],
      };
    }

    if (budget <= 65000) {
      return {
        name: 'Start Gaming',
        cpu: 'Intel Core i5-12400F',
        gpu: 'GTX 1660 Super 6GB',
        ram: '16GB DDR4-3200',
        storage: '500GB NVMe SSD',
        cooler: priority === 'silence' ? 'be quiet! Pure Rock 2' : 'DeepCool AK400',
        psu: '550W 80+ Bronze',
        price: Math.min(budget, 55000),
        fps: '60-80 FPS в Full HD',
        description: 'Хорошая стартовая сборка для киберспортивных игр.',
        upgrades: [
          'RTX 4060 вместо 1660S (+12 000 ₽)',
          'SSD 1TB (+4 000 ₽)',
          '32GB RAM (+3 000 ₽)',
        ],
      };
    }

    if (budget <= 100000) {
      const isStream = purpose === 'streaming';
      return {
        name: isStream ? 'Stream Ready' : 'Gaming Core',
        cpu: isStream ? 'AMD Ryzen 7 5700X' : 'Intel Core i5-13400F',
        gpu: 'RTX 4060 8GB',
        ram: isStream ? '32GB DDR4-3600' : '16GB DDR4-3600',
        storage: '1TB NVMe SSD',
        cooler: priority === 'silence' ? 'Noctua NH-U12S' : 'DeepCool AK620',
        psu: '650W 80+ Gold',
        price: Math.min(budget, 90000),
        fps: '100-144 FPS в Full HD',
        description: isStream
          ? 'Сбалансированная сборка для одновременного стрима и игры.'
          : 'Оптимальная сборка для комфортной игры в Full HD.',
        upgrades: [
          'RTX 4060 Ti (+8 000 ₽)',
          'Перейти на DDR5 (+10 000 ₽)',
          'Кастомная СВО (+15 000 ₽)',
        ],
      };
    }

    if (budget <= 160000) {
      const isEditing = purpose === 'editing';
      return {
        name: isEditing ? 'Creator Pro' : 'Gaming Pro',
        cpu: isEditing ? 'AMD Ryzen 9 5900X' : 'Intel Core i7-14700F',
        gpu: 'RTX 4070 Super 12GB',
        ram: isEditing ? '64GB DDR4-3600' : '32GB DDR5-5600',
        storage: isEditing ? '2TB NVMe SSD' : '1TB NVMe SSD',
        cooler: priority === 'design' ? 'NZXT Kraken X63 RGB' : 'Thermalright Peerless Assassin',
        psu: '750W 80+ Gold',
        price: Math.min(budget, 145000),
        fps: isEditing ? 'DaVinci 4K timeline плавно' : '144+ FPS в QHD',
        description: isEditing
          ? 'Мощная станция для монтажа и рендеринга.'
          : 'Серьёзная игровая сборка для QHD-гейминга.',
        upgrades: [
          'RTX 4070 Ti Super (+15 000 ₽)',
          'i9-14900K (+12 000 ₽)',
          'Custom Loop (+30 000 ₽)',
        ],
      };
    }

    if (budget <= 250000) {
      return {
        name: 'Ultra Performance',
        cpu: 'Intel Core i9-14900K',
        gpu: 'RTX 4080 Super 16GB',
        ram: '64GB DDR5-6000',
        storage: '2TB NVMe SSD',
        cooler: priority === 'silence' ? 'Noctua NH-D15S' : 'ARCTIC Liquid Freezer II 360',
        psu: '850W 80+ Gold',
        price: Math.min(budget, 230000),
        fps: '144+ FPS в 4K',
        description: 'Топовая сборка для 4K-гейминга и профессиональной работы.',
        upgrades: ['RTX 4090 (+40 000 ₽)', 'Custom Water Loop (+50 000 ₽)', '4TB SSD (+10 000 ₽)'],
      };
    }

    return {
      name: 'Dream Machine',
      cpu: 'Intel Core i9-14900KS',
      gpu: 'RTX 4090 24GB',
      ram: '128GB DDR5-6400',
      storage: '4TB NVMe SSD',
      cooler: 'Custom Water Cooling Loop',
      psu: '1000W 80+ Platinum',
      price: Math.min(budget, 320000),
      fps: '200+ FPS в 4K Ultra',
      description: 'Абсолютный максимум. Кастомное водяное охлаждение, лучшие комплектующие.',
      upgrades: ['Hardline tubing (+20 000 ₽)', 'Custom cables (+8 000 ₽)'],
    };
  }

  getPresets() {
    return {
      purposes: [
        { id: 'gaming', label: 'Игры', description: 'Высокие FPS в AAA играх' },
        { id: 'streaming', label: 'Стриминг', description: 'Стрим + игра без просадок' },
        { id: 'editing', label: 'Монтаж', description: 'Видео, 3D, рендеринг' },
        { id: 'universal', label: 'Универсальный', description: 'Всё понемногу' },
        { id: 'office', label: 'Офис', description: 'Документы, браузер, учёба' },
      ],
      priorities: [
        { id: 'performance', label: 'Производительность' },
        { id: 'silence', label: 'Тишина' },
        { id: 'design', label: 'Дизайн' },
        { id: 'value', label: 'Цена / Качество' },
      ],
      budgetRange: { min: 20000, max: 500000 },
    };
  }
}

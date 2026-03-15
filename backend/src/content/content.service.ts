import { Injectable } from '@nestjs/common';
import { FAQ, REVIEWS } from '../shared/data';

@Injectable()
export class ContentService {
  getFaq() {
    return FAQ;
  }

  getReviews() {
    return REVIEWS;
  }

  getAdvantages() {
    return [
      {
        icon: '⚡',
        title: 'Сборка за 24 часа',
        description: 'Получите готовый ПК уже на следующий день.',
      },
      {
        icon: '🛡️',
        title: 'Гарантия 3 года',
        description: 'Полная гарантия на все комплектующие и работу.',
      },
      {
        icon: '🔧',
        title: 'Честные комплектующие',
        description: 'Только оригинальные компоненты от официальных дистрибьюторов.',
      },
      {
        icon: '📊',
        title: 'Стресс-тесты 24ч',
        description: 'Каждая сборка проходит полный цикл тестирования.',
      },
      {
        icon: '🎨',
        title: 'Кабель-менеджмент',
        description: 'Идеальная укладка кабелей в каждой сборке.',
      },
      {
        icon: '💬',
        title: 'Поддержка 24/7',
        description: 'Всегда на связи — поможем с настройкой и апгрейдом.',
      },
    ];
  }
}

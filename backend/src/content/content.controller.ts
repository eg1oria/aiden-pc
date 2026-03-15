import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('faq')
  faq() {
    return { faq: this.contentService.getFaq() };
  }

  @Get('reviews')
  reviews() {
    return { reviews: this.contentService.getReviews() };
  }

  @Get('advantages')
  advantages() {
    return { advantages: this.contentService.getAdvantages() };
  }
}

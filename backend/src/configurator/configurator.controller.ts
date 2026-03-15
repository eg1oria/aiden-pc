import { Controller, Post, Get, Body } from '@nestjs/common';
import { ConfiguratorService } from './configurator.service';
import { RecommendDto } from './dto/recommend.dto';

@Controller('configurator')
export class ConfiguratorController {
  constructor(private readonly configuratorService: ConfiguratorService) {}

  @Post('recommend')
  recommend(@Body() dto: RecommendDto) {
    return { recommendation: this.configuratorService.getRecommendation(dto) };
  }

  @Get('presets')
  presets() {
    return this.configuratorService.getPresets();
  }
}

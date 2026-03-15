import { Controller, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { BuildsService } from './builds.service';

@Controller('builds')
export class BuildsController {
  constructor(private readonly buildsService: BuildsService) {}

  @Get()
  findAll() {
    return { builds: this.buildsService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      throw new BadRequestException('Неверный ID');
    }
    const build = this.buildsService.findById(numId);
    if (!build) {
      throw new NotFoundException('Сборка не найдена');
    }
    return { build };
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return { builds: this.buildsService.findByCategory(category) };
  }
}

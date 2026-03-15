import { Injectable } from '@nestjs/common';
import { BUILDS } from '../shared/data';
import { Build } from '../shared/interfaces';

@Injectable()
export class BuildsService {
  findAll(): Build[] {
    return BUILDS;
  }

  findById(id: number): Build | undefined {
    return BUILDS.find((b) => b.id === id);
  }

  findByCategory(category: string): Build[] {
    return BUILDS.filter((b) => b.category === category);
  }
}

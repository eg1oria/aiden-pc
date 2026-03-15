import { IsEnum, IsNumber, Min, Max } from 'class-validator';

export class RecommendDto {
  @IsEnum(['gaming', 'streaming', 'editing', 'universal', 'office'], {
    message: 'Недопустимая цель использования',
  })
  purpose!: 'gaming' | 'streaming' | 'editing' | 'universal' | 'office';

  @IsNumber()
  @Min(20000)
  @Max(500000)
  budget!: number;

  @IsEnum(['performance', 'silence', 'design', 'value'], {
    message: 'Недопустимый приоритет',
  })
  priority!: 'performance' | 'silence' | 'design' | 'value';
}

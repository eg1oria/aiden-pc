import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно' })
  @MaxLength(100, { message: 'Имя слишком длинное' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Контакт обязателен' })
  @MaxLength(100, { message: 'Контакт слишком длинный' })
  contact!: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000, { message: 'Сообщение слишком длинное' })
  message?: string;
}

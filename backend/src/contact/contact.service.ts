import { Injectable, Logger } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  submit(dto: CreateContactDto): { success: boolean; message: string } {
    this.logger.log(`📩 Новая заявка: ${dto.name} | ${dto.contact} | ${dto.message || '—'}`);

    return {
      success: true,
      message: 'Заявка принята! Мы свяжемся с вами в ближайшее время.',
    };
  }
}

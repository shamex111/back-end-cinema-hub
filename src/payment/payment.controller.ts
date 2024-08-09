import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PaymentStatusDto } from './dto/payment-status.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  checkout(@Body() dto:PaymentDto,@CurrentUser('id') userId:string){
    return this.paymentService.checkout(dto,userId) 
  }

  /* Запросы для админа */

  @HttpCode(200)
  @Post('status')
  async updateStatus(@Body() dto:PaymentStatusDto) {
    return this.paymentService.updateStatus(dto)
  }
  @Get()
  @Auth('admin')
  async getAll() {
    return this.paymentService.getAll();
  }
  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deletePayment = await this.paymentService.delete(id);
    if (!deletePayment) throw new NotFoundException('Отзыв не найден!');
    return deletePayment;
  }
}

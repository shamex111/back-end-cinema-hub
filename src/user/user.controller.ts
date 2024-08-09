import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Get('profile/:name')
  async getByName(@Param('name') name:string) {
    return this.userService.getByName(name)
  }

  @Post('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toggleFavorite(
    @Body('movieId') movieId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.userService.toggleFavorite(movieId, userId);
  }

  /* Запросы для админа */

  @Get()
  @Auth('admin')
  async getAll(@Query('searchTerm') searchTerm?:string) {
    if(!searchTerm) {
      return this.userService.getAll();
    }
    return this.userService.getAll(searchTerm);
  }

  @Get('by-id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('user')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updateUser = this.userService.update(id, dto);
    if (!updateUser) throw new NotFoundException('Пользователь не найден!');
    return updateUser;
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deleteUser = this.userService.delete(id);
    if (!deleteUser) throw new NotFoundException('Пользователь не найден!');
    return deleteUser;
  }
}

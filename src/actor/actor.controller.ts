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
import { ActorService } from './actor.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { updateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    if (!searchTerm) {
      return this.actorService.getAll();
    }
    return this.actorService.getAll(searchTerm);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.getBySlug(slug);
  }
  /* Запросы для админа */

  @Get('by-id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.actorService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.actorService.create();
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: string, @Body() dto: updateActorDto) {
    const updateActor = this.actorService.update(id, dto);
    if (!updateActor) throw new NotFoundException('Актёр не найден!');
    return updateActor;
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deleteActor = this.actorService.delete(id);
    if (!deleteActor) throw new NotFoundException('Актёр не найден!');
    return deleteActor;
  }
}

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
import { GenreService } from './genre.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    if (!searchTerm) {
      return this.genreService.getAll();
    }
    return this.genreService.getAll(searchTerm);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.genreService.getBySlug(slug);
  }
  /* Запросы для админа */

  @Get('by-id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.genreService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.genreService.create();
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    const updateGenre = this.genreService.update(id, dto);
    if (!updateGenre) throw new NotFoundException('Жанр не найден!');
    return updateGenre;
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deleteGenre = this.genreService.delete(id);
    if (!deleteGenre) throw new NotFoundException('Жанр не найден!');
    return deleteGenre;
  }
}

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
import { MovieService } from './movie.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.movieService.getBySlug(slug);
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.movieService.getMostPopular();
  }

  @Get('by-actor/:id')
  @HttpCode(200)
  async getByActor(@Param('id') id: string) {
    return this.movieService.getByActor(id);
  }

  @Post('by-genres')
  @HttpCode(200)
  async getByGenres(@Body('genreIds') genreIds: string[]) {
    return this.movieService.getByGenres(genreIds);
  }

  @Put('update-count-views')
  async updateCountOpened(@Body('slug') slug:string) {
    return this.movieService.updateCountViews(slug)
  }
  /* Запросы для админа */

  @Get('by-id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.movieService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.movieService.create();
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    const updateMovie = this.movieService.update(id, dto);
    if (!updateMovie) throw new NotFoundException('Фильм не найден!');
    return updateMovie;
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deleteMovie = this.movieService.delete(id);
    if (!deleteMovie) throw new NotFoundException('Фильм не найден!');
    return deleteMovie;
  }
}

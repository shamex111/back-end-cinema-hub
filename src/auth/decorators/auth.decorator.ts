import { UseGuards, applyDecorators } from '@nestjs/common';
import { typeRole } from '../interfaces/auth.interface';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { OnlyAdminGuard } from '../guards/admin.guard';

export function Auth(role: typeRole = 'user') {
    return applyDecorators(role === 'admin' ? UseGuards(JwtAuthGuard,OnlyAdminGuard) : UseGuards(JwtAuthGuard))
}

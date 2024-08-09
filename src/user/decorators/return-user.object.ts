import { Prisma } from '@prisma/client';

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  createdAt: true,
  name: true,
  email: true,
  role: true,
  password: true,
  isHasPremium:true,
  avatarPath:true
};

export const returnShortUserObject: Prisma.UserSelect = {
  id: true,
  createdAt: true,
  name: true,
  role: true,
  favorites:true,
  reviews:true,
  isHasPremium:true,
  avatarPath:true
};
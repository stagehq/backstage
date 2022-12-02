import { MicroRequest } from 'apollo-server-micro/dist/types';
import { PrismaClient } from '@prisma/client';
import prisma from "../db/prisma";
import { ServerResponse } from 'http'

export interface Context {
  prisma: PrismaClient
  res: ServerResponse
  req: MicroRequest
}

export function createContext(req: MicroRequest, res: ServerResponse): Context {
  return { prisma, res, req }
}
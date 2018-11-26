import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Ii18n } from '../server/middlewares/i18next';

export interface Request extends ExpressRequest {
  i18n?: Ii18n;
}

export interface Response extends ExpressResponse {};

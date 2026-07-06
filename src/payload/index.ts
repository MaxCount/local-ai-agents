import { getPayload } from 'payload';
import configPromise from '../../payload.config';
import type { Payload } from 'payload';

let cachedPayload: Payload | null = null;

export const getPayloadClient = async (): Promise<Payload> => {
  if (!cachedPayload) {
    cachedPayload = await getPayload({
      config: configPromise,
    });
  }
  return cachedPayload;
};

export const initPayload = async (): Promise<Payload> => {
  return await getPayload({
    config: configPromise,
  });
};

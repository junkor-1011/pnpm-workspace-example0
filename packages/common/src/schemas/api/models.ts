import { z } from 'zod';

export const DummyGetResponseSchema = z.object({
  message: z.string(),
  ipv4: z.string(),
  date: z.date().optional(),
});
export type DummyGetResponse = z.infer<typeof DummyGetResponseSchema>;

export const DummyPostRequestSchema = z.object({
  user: z.string(),
});
export type DummyPostRequest = z.infer<typeof DummyPostRequestSchema>;

export const DummyPostResponseSchema = z.object({
  message: z.string(),
  // date: z.date().optional(),
  date: z
    .preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
      return arg;
    }, z.date())
    .optional(),
});
export type DummyPostResponse = z.infer<typeof DummyPostResponseSchema>;

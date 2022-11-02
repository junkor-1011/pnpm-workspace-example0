import { z } from 'zod';

export const DummyGetResponseSchema = z.object({
  message: z.string(),
  ipv4: z.string(),
  date: z.date().optional(),
});
export type DummyGetResponse = z.infer<typeof DummyGetResponseSchema>;

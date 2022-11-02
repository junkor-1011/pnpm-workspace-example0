import { z, ZodObject } from 'zod';

export const isValidSchema = <T extends ZodObject<any>>(
  target: unknown,
  schema: T,
): target is z.infer<typeof schema> => schema.safeParse(target).success;

export const assertBySchema: <T extends ZodObject<any>>(
  target: unknown,
  schema: T,
) => asserts target is z.infer<typeof schema> = (
  target,
  schema,
): asserts target is z.infer<typeof schema> => {
  schema.parse(target);
};

import { z } from 'zod';

export const FooSchema = z.object({
  username: z.string().describe('username'),
  email: z.string().email().optional().describe('email: optional'),
})
export type Foo = z.infer<typeof FooSchema>

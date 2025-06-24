import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1).max(200),
  username: z.string().min(1).max(100),
  role: z.enum(['Coach', 'Admin', 'User']),
  company: z.string().min(1).max(200).optional(),
  email: z.string().email(),
});
export type UserT = z.infer<typeof UserSchema>;

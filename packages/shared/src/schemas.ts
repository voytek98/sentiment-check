import { z } from 'zod';

export const InputValidationSchema = z
  .string()
  .min(1, 'Input cannot be empty')
  .max(500, 'Input cannot exceed 500 characters');

export type InputValidation = z.infer<typeof InputValidationSchema>;

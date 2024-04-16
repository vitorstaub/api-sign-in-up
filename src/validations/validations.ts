import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(3, "O usuário deve conter ao menos 3 caracteres")
    .regex(
      new RegExp("[A-ZÁÉÍÓÚÃÕÂÊÎÔÇ][a-záéíóúãõâêîôç]"), "A primeira do nome letra deve ser maiúscula"
    ),
  email: z.string().email(),
  password: z.string(),
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const registerUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;

export const loginUserSchema = userSchema.pick({
  email: true,
  password: true,
});
export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;

import { z } from "zod";

export const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().nonempty({ message: "Phone number should not be empty" }),
});

export type PersonalInfo = z.infer<typeof schema>;

export type PersonalInfoError = { [key: string]: string };

export const initError: PersonalInfoError = {};

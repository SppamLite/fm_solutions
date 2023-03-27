import { z, ZodError } from "zod";

export const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().nonempty({ message: "Phone number should not be empty" }),
});

export type PersonalInfo = z.infer<typeof schema>;

export type PersonalInfoError = { [key: string]: string };

export const getValidationError = (
  info: PersonalInfo,
): PersonalInfoError | null => {
  try {
    schema.parse(info);
    return null;
  } catch (error) {
    if (error instanceof ZodError<PersonalInfo>) {
      return error.issues.reduce(
        (acc: PersonalInfoError, issue) => {
          const issuePath = issue.path.join();
          acc[issuePath] = issue.message;
          return acc;
        },
        {},
      );
    } else {
      console.error("unknown error at step 1", error);
    }
    return null;
  }
};

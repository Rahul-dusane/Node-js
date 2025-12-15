import { email, z, url} from "zod";

export const adminRegistrationSchema = z.object({
    email: z.string().trim().email("Invalid Email Format ."),
    password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[!@#$%^&*(),.?":{}|<>]/,"Password must contain at least one special character"),
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
    role: z.string().trim().optional(),
    profile_image: z.string().url("Profile image must be a valid URL").optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
import { z } from 'zod';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#]).+$/;

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email')
    .pipe(z.email('Invalid email address')),
});

// Register Schema
const registerSchema = z.object({
  firstName: z
    .string('please enter your first name')
    .min(2)
    .nonempty('please enter your first name'),
  lastName: z
    .string('please enter your last name')
    .min(2)
    .nonempty('please enter your last name'),
  username: z
    .string('please enter your username')
    .nonempty('please enter your username'),
  email: emailSchema.shape.email,
  phone: z
    .string()
    .min(1, 'Please enter your phone number')
    .refine((value) => isValidPhoneNumber(value, 'EG'), {
      message: 'Invalid Egyptian phone number',
    })
    .transform((value) => {
      const parsed = parsePhoneNumber(value, 'EG');
      if (!parsed) throw new Error('Invalid phone number');

      const phone = `0${parsed.nationalNumber}`;

      if (!/^01[0125][0-9]{8}$/.test(phone)) {
        throw new Error('Invalid Egyptian mobile format');
      }

      return phone;
    }),

  password: z.string('Please enter your password').regex(
    passwordRegex,

    {
      message:
        'Password must be at least 8 characters long and contain at least one letter and one number',
    }
  ),
  rePassword: z.string('Please confirm your password').nonempty(),
});
// .refine((data) => data.password === data.rePassword, {
//   path: ["rePassword"],
//   message: "Passwords do not match",
// });

export type registerValues = z.infer<typeof registerSchema>;

// Login Schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email')
    .pipe(z.email('Invalid email address')),

  password: z.string().min(1, 'Please enter your password'),
});

export type loginValues = z.infer<typeof loginSchema>;

// OtpSchema
const otpSchema = z.object({
  resetCode: z
    .string('Please enter your otp')
    .nonempty('Please enter your otp')
    .length(6, 'Please enter a valid otp'),
});

export type otpValues = z.infer<typeof otpSchema>;

//new password schema

const newPasswordSchema = z
  .object({
    newPassword: z.string('Please enter your password').regex(passwordRegex),
    confirmPassword: z.string('Please confirm your password').nonempty(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type newPasswordValues = z.infer<typeof newPasswordSchema>;

export { newPasswordSchema };

export { otpSchema };
export default loginSchema;
export { registerSchema };

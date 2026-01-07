'use server';

import {
  newPasswordValues,
  otpValues,
  registerValues,
} from '../schemes/authschema';
import {
  forgotPasswordResponse,
  LoginResponse,
  NewPasswordResponse,
  VerifyOpt,
} from '../types/auth';

// Register
export async function registerActoin(values: registerValues) {
  const response = await fetch(`${process.env.API}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const payload: APIResponse<LoginResponse> = await response.json();
  console.log(payload);

  return payload;
}

// Forgot Password
export async function forgoPasswordAction(email: registerValues['email']) {
  const respone = await fetch(`${process.env.API}/auth/forgotPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const payload: APIResponse<forgotPasswordResponse> = await respone.json();
  console.log(payload);

  return payload;
}

// Verify OTP
export async function verifyOtp(restcode: otpValues) {
  const respone = await fetch(`${process.env.API}/auth/verifyResetCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restcode),
  });
  const payload: APIResponse<VerifyOpt> = await respone.json();
  console.log(payload);

  return payload;
}

// ChangePassword

export async function NewPaswordAction(
  values: Pick<newPasswordValues, 'newPassword'> & { email: string }
) {
  const respone = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
  const payload: APIResponse<NewPasswordResponse> = await respone.json();
  console.log(payload);

  return payload;
}

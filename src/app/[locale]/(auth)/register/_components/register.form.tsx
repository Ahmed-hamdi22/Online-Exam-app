'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { registerSchema, registerValues } from '@/lib/schemes/authschema';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FeedBack from '@/components/shared/feedback';
import { Loader } from 'lucide-react';
import { PhoneInput } from '@/components/ui/phone-input';
import { useRouter } from 'next/navigation';
import useRegister from '../_hook/use-register';
export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<registerValues>({
    defaultValues: {
      email: '',
      password: '',
      rePassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      username: '',
    },
    resolver: zodResolver(registerSchema),
  });

  // Mutation
  const { isPending, error, register } = useRegister();

  //
  const onSubmit: SubmitHandler<registerValues> = (values) => {
    register(values, {
      onSuccess: () => {
        router.push('/login');
      },

      onError: (err: unknown) => {
        console.log(err);
      },
    });
    console.log('values', values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md grid graid-cols-2 gap-4"
      >
        {/* Frirst Name*/}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>First Name</FormLabel>

              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Last Name</FormLabel>

              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* User Name */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className=" col-span-2">
              <FormLabel>User Name</FormLabel>

              <FormControl>
                <Input placeholder="Enter your user name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" col-span-2">
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className=" col-span-2">
              <FormLabel>Phone</FormLabel>

              <FormControl>
                <PhoneInput
                  placeholder="Enter your phone number"
                  {...field}
                  countries={['EG']}
                  international
                  defaultCountry="EG"
                />
                {/*  Selcet Country is disabled by default in Phone Input  CountrySelectProps >> disabled: true  line 75*/}
              </FormControl>
              <FormDescription className="italic">
                Only Egyptian numbers are allowed{' '}
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* PassWord */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className=" col-span-2">
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/*Confirm PassWord */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Confirm Password</FormLabel>

              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* FeedBack */}
        <FeedBack className="mt-4 col-span-2 ">{error?.message}</FeedBack>

        {/* Submit */}
        <Button
          disabled={
            isPending ||
            (form.formState.isSubmitting && !form.formState.isValid)
          }
          className="col-span-2 mt-10 text-white w-full bg-blue-600 hover:bg-blue-700 "
          type="submit"
        >
          {isPending || form.formState.isSubmitting ? <Loader /> : 'Register'}
        </Button>
      </form>
    </Form>
  );
}

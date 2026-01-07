"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { newPasswordSchema, newPasswordValues } from "@/lib/schemes/authschema";
import useNewPassword from "../../_hooks/useNewPasswors";
import { useRouter } from "next/navigation";
import FeedBack from "@/components/shared/feedback";
import { toast } from "sonner";

type NewPasswordStepProps = {
  email: string;
};

export default function NewPasswordStep({ email }: NewPasswordStepProps) {
  console.log(email);
  const route = useRouter();

  const form = useForm<newPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  //Mutation

  const { isPending, error, Restpassword } = useNewPassword();
  const onSubmit: SubmitHandler<newPasswordValues> = (values) => {
    Restpassword(
      {
        newPassword: values.newPassword,
        email: email,
      },
      {
        onSuccess: () => {
          console.log("succcccc");
          toast.success("Password reset successfully");
          route.push("/login");
        },
      }
    );
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* PassWord */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className=" col-span-2">
              <FormLabel> New Password</FormLabel>

              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* PassWord */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className=" col-span-2">
              <FormLabel> confirmPassword</FormLabel>

              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* FeedBack */}
        <FeedBack className="mb-6">{error?.message}</FeedBack>

        {/* Submit */}
        <Button
          disabled={
            isPending || (form.formState.isSubmitted && !form.formState.isValid)
          }
          type="submit"
          className=" text-white w-full bg-blue-600 hover:bg-blue-700"
        >
          Resat Password
        </Button>
      </form>
    </Form>
  );
}

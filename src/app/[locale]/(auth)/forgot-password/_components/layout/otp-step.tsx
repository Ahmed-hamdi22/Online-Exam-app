"use client";

import { otpSchema, otpValues } from "@/lib/schemes/authschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FeedBack from "@/components/shared/feedback";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useOtp from "../../_hooks/use-verify-otp";

type OtpStepProps = {
  setStep: (step: "email" | "otp" | "password") => void;
  email: string;
};
export default function OtpStep({ setStep, email }: OtpStepProps) {
  // Mutation
  const { isPending, error, code } = useOtp();

  // Form

  const form = useForm<otpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  const onSubmit: SubmitHandler<otpValues> = (values) => {
    code(
      {
        resetCode: values.resetCode,
        email: email,
      },
      {
        onSuccess: () => {
          setStep("password");
        },
      }
    );

    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col"
      >
        {/* OtpInput */}
        <FormField
          control={form.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="sr-only">Otp</FormLabel>

              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
          className=" text-white w-full bg-blue-600 hover:bg-blue-700 mt-9"
          type="submit"
        >
          Verify Code
        </Button>
      </form>
    </Form>
  );
}

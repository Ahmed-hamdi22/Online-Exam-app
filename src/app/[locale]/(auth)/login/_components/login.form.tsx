"use client";

import FeedbackMessage from "@/components/common/feedback-message";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const t = useTranslations();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const Schema = z.object({
    email: z.string().min(1, t("email-required")).email(t("email-invalid")),
    password: z
      .string()
      .nonempty(t("password-required"))
      .min(8, { message: t("password-is-too-short") })
      .regex(/[A-Z]/, t("password-uppercase"))
      .regex(/[a-z]/, t("password-must-contain-at-least-one-lowercase-letter"))
      .regex(/[0-9]/, t("password-must-contain-at-least-one-number")),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setError(null);
    setLoading(true);

    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    console.log("SIGNIN RESPONSE", response);

    setLoading(false);

    if (response?.ok) {
      router.replace(response.url || "/dashboard/subjects");
      return;
    }

    setError(response?.error || t("fallback-error-message"));
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <h3 className="text-2xl font-semibold mb-4">{t("login-title")}</h3>

          {/* Email Field */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  type="email"
                  placeholder={t("email-placeholder")}
                  className="mb-1 rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => {
              const [showPassword, setShowPassword] = useState(false);

              return (
                <FormItem className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder={t("password-placeholder")}
                    className="mb-1 rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                  />

                  {/* Eye Icon */}
                  <div
                    className="absolute bottom-3 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Link
            href="/forget-password"
            className="text-right text-blue-500 hover:underline text-sm mt-1 block"
          >
            {t("recover-password")}
          </Link>

          <FeedbackMessage>{error}</FeedbackMessage>

          <Button
            className="w-full mt-2  bg-[#122D9C] rounded-2xl"
            disabled={
              loading || (form.formState.isSubmitted && !form.formState.isValid)
            }
          >
            {loading ? <Loader /> : t("login")}
          </Button>
        </form>
      </Form>

      {/* Social Providers */}
      <div className="text-center mt-3">
        <p>{t("or-continue-with")}</p>
        <div className="flex justify-center mt-4">
          <div
            onClick={() =>
              signIn("google", { callbackUrl: "/dashboard/subjects" })
            }
            className="login-item flex justify-center items-center hover:shadow-lg border p-2 shadow-md rounded-lg cursor-pointer mx-1"
          >
            <img
              className="w-5 h-5"
              alt="google"
              src={"/images/Logo Google.png"}
            />
          </div>
          <div
            onClick={() =>
              signIn("facebook", { callbackUrl: "/dashboard/subjects" })
            }
            className="login-item flex justify-center items-center hover:shadow-lg border p-2 shadow-md rounded-lg cursor-pointer mx-1"
          >
            <img
              className="w-5 h-5"
              alt="facebook"
              src={"/images/Vector.png"}
            />
          </div>
          <div
            onClick={() =>
              signIn("twitter", { callbackUrl: "/dashboard/subjects" })
            }
            className="login-item flex justify-center items-center hover:shadow-lg border p-2 shadow-md rounded-lg cursor-pointer mx-1"
          >
            <img className="w-5 h-5" alt="twitter" src={"/images/Logo.png"} />
          </div>
          <div
            onClick={() =>
              signIn("github", { callbackUrl: "/dashboard/subjects" })
            }
            className="login-item flex justify-center items-center hover:shadow-lg border p-2 shadow-md rounded-lg cursor-pointer mx-1"
          >
            <img
              className="w-5 h-5"
              alt="github"
              src={"/images/Logo (1).png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

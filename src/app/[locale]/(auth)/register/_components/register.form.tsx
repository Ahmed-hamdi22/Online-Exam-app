// "use client";

// import FeedbackMessage from "@/components/common/feedback-message";
// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "@/i18n/routing";
// import { registerAction } from "@/lib/actions/auth.action";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
// import { useTranslations } from "next-intl";
// import Link from "next/link";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod";

// export default function RegisterForm() {
//   // Translation
//   const t = useTranslations();

//   // Navigation
//   const router = useRouter();

//   // State
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Form & Validation
//   const Schema = z
//     .object({
//       username: z
//         .string({ required_error: t("username-required") })
//         .min(1, t("username-required"))
//         .min(2, t("username-min")),
//       firstName: z
//         .string({ required_error: t("firstname-required") })
//         .min(1, t("firstname-required"))
//         .min(2, t("firstname-min")),
//       lastName: z
//         .string({ required_error: t("lastname-required") })
//         .min(1, t("lastname-required"))
//         .min(2, t("lastname-min")),
//       email: z
//         .string({ required_error: t("email-required") })
//         .min(1, t("email-required"))
//         .email(t("email-invalid")),

//         phone:z
//         .string({ required_error: t("phone-required") })
//         .min(1, t("phone-required")),

//       password: z
//         .string({ required_error: t("password-required") })
//         .min(1, t("password-required")),

//         rePassword: z.string({ required_error: t("password-confirm-required") }).min(1, t("password-confirm-required")),
//     })
//     .refine((values) => values.password === values.rePassword, {
//       message: t("password-confirm-mismatch"),
//       path: ["rePassword"],
//     });
//   type Inputs = z.infer<typeof Schema>;

//   const form = useForm<Inputs>({
//     defaultValues: {
//       username: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       phone: "",
//     },
//     resolver: zodResolver(Schema),
//   });

//   // Functions
//   const onSubmit: SubmitHandler<Inputs> = async (values) => {
//     setError(null);
//     setLoading(true);

//     const response = await registerAction(values);

//     setLoading(false);

//     if (response.message === "success") {
//       // Clear the form after successful registration
//       form.reset();
//        // If login was successful, redirect to the callback URL
//       router.push("/auth/login");
//       return;
//     }

//     if (Array.isArray(response.message)) {
//       response.message.forEach((error) => {
//         form.setError(error.field as keyof Inputs, {
//           message: error.errorMessage,
//           type: "ivnalid",
//         });
//         return;
//       });
//     } else {
//       setError(response.message);
//     }
//   };

//   return (

//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-4 flex flex-col gap-2.5 overflow-auto " >
//       <h3 className="text ">Sign up</h3>
//         {/* Username */}
//        <div className=" ">
//        <FormField

//           name="username"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem>
//               {/* Input */}
//               <Input {...field} placeholder={("User Name")} />

//               {/* Feedback */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//        </div>

//           {/* First name */}
//           <FormField
//             name="firstName"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 {/* Input */}
//                 <Input {...field} placeholder={("First Name")} />

//                 {/* Feedback */}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Last name */}
//           <FormField
//             name="lastName"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 {/* Input */}
//                 <Input {...field} placeholder={("Last Name")} />

//                 {/* Feedback */}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//         {/* Email */}
//         <FormField
//           name="email"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem>

//               {/* Input */}
//               <Input {...field} placeholder={t("email-placeholder")} />

//               {/* Feedback */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Password */}
//         <FormField
//           name="password"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem>

//               {/* Input */}
//               <Input type="password" {...field} placeholder={t("password-placeholder")} />

//               {/* Feedback */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Password Confirm */}
//         <FormField
//           name="rePassword"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem>

//               {/* Input */}
//               <Input {...field} placeholder={t("register-password-confirm-placeholder")} />

//               {/* Feedback */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* phone */}
//         <FormField
//           name="phone"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem>

//               {/* Input */}
//               <Input {...field} placeholder={("phone")} />

//               {/* Feedback */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="d-flex justify-content-between"><p>Already have an account? </p>
//         <Link href={"/auth/login"}>login</Link>
//         </div>

//         {/* Submit / Feedback */}
//         <div className="flex flex-col">
//           {/* Feedback */}
//           <FeedbackMessage>{error}</FeedbackMessage>

//           {/* providers */}
//           <Button className="rounded-5" disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{t("register-submit")}</Button>
//           <div className="text-center mt-3">
//               <p>Or continue with</p>
//               <div className="d-flex justify-content-center">

//         <div
//           onClick={() => signIn("google", { callbackUrl: "/dashboard/subjects" })}
//           className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
//         >
//           <img width={20} height={20} alt="google" src={"/Logo Google.png"} />
//         </div>
//         <div
//           onClick={() => signIn("facebook", { callbackUrl: "/dashboard/subjects" })}
//           className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
//         >
//           <img width={20} height={20} alt="fasbook" src={"/Vector.png"} />
//         </div>
//         <div
//           onClick={() => signIn("twitter", { callbackUrl: "/dashboard/subjects" })}
//           className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
//         >
//           <img width={20} height={20} alt="twitter" src={"/Logo.png"} />
//         </div>
//         <div
//           onClick={() => signIn("github", { callbackUrl: "/dashboard/subjects" })}
//           className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
//         >
//           <img width={20} height={20} alt="Apple" src={"/Logo (1).png"} />
//         </div>
//               </div>
//             </div>
//         </div>
//       </form>
//     </Form>

//   );
// }

"use client";

import FeedbackMessage from "@/components/common/feedback-message";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/routing";
import { registerAction } from "@/lib/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterForm() {
  const t = useTranslations();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const Schema = z
    .object({
      username: z.string().min(2, t("username-min")),
      firstName: z.string().min(2, t("firstname-min")),
      lastName: z.string().min(2, t("lastname-min")),
      email: z.string().min(1, t("email-required")).email(t("email-invalid")),
      phone: z.string().min(1, t("phone-required")),
      password: z.string().min(8, t("password-is-too-short")),
      rePassword: z.string().min(1, t("password-confirm-required")),
    })
    .refine((values) => values.password === values.rePassword, {
      message: t("password-confirm-mismatch"),
      path: ["rePassword"],
    });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setError(null);
    setLoading(true);

    const response = await registerAction(values);

    setLoading(false);

    if (response.message === "success") {
      form.reset();
      router.push("/auth/login");
      return;
    }

    if (Array.isArray(response.message)) {
      response.message.forEach((error) => {
        form.setError(error.field as keyof Inputs, {
          message: error.errorMessage,
          type: "invalid",
        });
      });
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <h3 className="text-2xl font-semibold mb-4">{t("sign-up")}</h3>

          {/* Username */}
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder={t("username-placeholder")}
                  className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name */}
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder={t("firstname-placeholder")}
                  className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder={t("lastname-placeholder")}
                  className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder={t("email-placeholder")}
                  className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder={t("phone-placeholder")}
                  className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
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
                    className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                  />
                  <div
                    className="absolute bottom-2 end-3 flex items-center cursor-pointer"
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

          {/* Confirm Password */}
          <FormField
            name="rePassword"
            control={form.control}
            render={({ field }) => {
              const [showPassword, setShowPassword] = useState(false);

              return (
                <FormItem className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder={t("register-password-confirm-placeholder")}
                    className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                  />
                  <div
                    className="absolute bottom-2  end-3 flex items-center cursor-pointer"
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

          <div className="text-sm mt-1 flex  justify-center">
            {t("already-have-account")}{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              {t("login")}
            </Link>
          </div>

          <FeedbackMessage>{error}</FeedbackMessage>

          <Button
            type="submit"
            className="w-full mt-2 bg-[#122D9C] rounded-2xl"
            disabled={loading || !form.formState.isValid}
          >
            {t("register-submit")}
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

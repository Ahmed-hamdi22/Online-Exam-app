// "use client";

// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import FeedbackMessage from "@/components/common/feedback-message";
// import { setNewPasswordAction } from "@/lib/actions/setNewPassword.action";

// export default function SetNewPasswordForm() {
//   // Translation
//   const t = useTranslations();

//   // Navigation
//   const router = useRouter();

//   // State
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Form & Validation
//   type Inputs = {
//     email: string;
//     newPassword:string
//   };

//   const form = useForm<Inputs>({
//     defaultValues: {
//       email: "",
//       newPassword:""
//     },
//   });

//   // Functions
//   const onSubmit: SubmitHandler<Inputs> = async ({ email , newPassword}) => {
//     setError(null);
//     setLoading(true);
//     const response = await setNewPasswordAction(email , newPassword);

//     setLoading(false);

//     if (response.message === "success") {
//       // Clear the form after successful registration
//       form.reset();
//      // If login was successful, redirect to the callback URL
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
//     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-4 flex flex-col gap-2.5">
//     <h3 className="text">Set a Password</h3>

//       {/* Email */}
//       <FormField
//         name="email"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>

//             {/* Input */}
//             <Input {...field} placeholder={t("email-placeholder")} />

//             {/* Feedback */}
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//      {/* newPassword */}
//      <FormField
//           name="newPassword"
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

//       {/* Submit / Feedback */}
//       <div className="flex flex-col mt-3 ">
//         {/* Feedback */}
//         <FeedbackMessage>{error}</FeedbackMessage>

//         {/* Submit */}
//         <Button className="rounded-5" disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{("sing in")}</Button>
//       </div>
//     </form>
//   </Form>
//   );
// }
// "use client";

// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import FeedbackMessage from "@/components/common/feedback-message";
// import { setNewPasswordAction } from "@/lib/actions/setNewPassword.action";
// import { Eye, EyeOff } from "lucide-react";

// export default function SetNewPasswordForm({
//   email,
//   onSuccess,
//   onBack,
// }: {
//   email: string;
//   onSuccess: () => void;
//   onBack: () => void;
// }) {
//   const t = useTranslations();
//   const router = useRouter();

//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   type Inputs = {
//     email: string;
//     newPassword: string;
//   };

//   const form = useForm<Inputs>({
//     defaultValues: {
//       email: "",
//       newPassword: "",
//     },
//   });

//   const onSubmit: SubmitHandler<Inputs> = async ({ email, newPassword }) => {
//     setError(null);
//     setLoading(true);

//     const response = await setNewPasswordAction(email, newPassword);

//     setLoading(false);

//     if (response.message === "success") {
//       form.reset();
//       router.push("/auth/login");
//       return;
//     }

//     if (Array.isArray(response.message)) {
//       response.message.forEach((error) => {
//         form.setError(error.field as keyof Inputs, {
//           message: error.errorMessage,
//           type: "invalid",
//         });
//       });
//     } else {
//       setError(response.message);
//     }
//   };

//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex flex-col gap-8 justify-center items-center w-full">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="flex flex-col w-full gap-4"
//         >
//           <h3 className="text-2xl font-semibold mb-4">
//             {t("set-new-password-title")}
//           </h3>

//           {/* Email Field */}
//           <FormField
//             name="email"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <Input
//                   {...field}
//                   placeholder={t("email-placeholder")}
//                   className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Password Field */}
//           <FormField
//             name="newPassword"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem className="relative">
//                 <Input
//                   {...field}
//                   type={showPassword ? "text" : "password"}
//                   placeholder={t("password-placeholder")}
//                   className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
//                 />
//                 <div
//                   className="absolute bottom-2 end-3 flex items-center cursor-pointer"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5 text-gray-500" />
//                   ) : (
//                     <Eye className="w-5 h-5 text-gray-500" />
//                   )}
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FeedbackMessage>{error}</FeedbackMessage>

//           <Button
//             className="w-full mt-2 bg-[#122D9C] rounded-2xl"
//             disabled={
//               loading || (form.formState.isSubmitted && !form.formState.isValid)
//             }
//           >
//             {t("set-password-submit")}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

// "use client";

// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import FeedbackMessage from "@/components/common/feedback-message";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { setNewPasswordAction } from "@/lib/actions/setNewPassword.action";
// import { Eye, EyeOff } from "lucide-react";
// import { useRouter } from "@/i18n/routing";

// export default function SetNewPasswordForm({
//   email,
//   onSuccess,
// }: {
//   email: string;
//   onSuccess: () => void;
// }) {
//   const t = useTranslations();

//   const router = useRouter();

//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const Schema = z
//     .object({
//       newPassword: z
//         .string()
//         .nonempty(t("password-required"))
//         .min(8, { message: t("password-is-too-short") })
//         .regex(/[A-Z]/, t("password-uppercase"))
//         .regex(
//           /[a-z]/,
//           t("password-must-contain-at-least-one-lowercase-letter"),
//         )
//         .regex(/[0-9]/, t("password-must-contain-at-least-one-number")),
//       confirmPassword: z.string().min(1, t("password-confirm-required")),
//     })
//     .refine((values) => values.newPassword === values.confirmPassword, {
//       message: t("password-confirm-mismatch"),
//       path: ["confirmPassword"],
//     });

//   type Inputs = z.infer<typeof Schema>;

//   const form = useForm<Inputs>({
//     resolver: zodResolver(Schema),
//   });

//   const onSubmit: SubmitHandler<Inputs> = async ({ newPassword }) => {
//     setError(null);
//     setLoading(true);

//     const response = await setNewPasswordAction(email, newPassword);

//     setLoading(false);

//     if (response.message === "success") {
//       form.reset();
//       router.push("/auth/login");
//       return;
//     }

//     if (Array.isArray(response.message)) {
//       response.message.forEach((error) => {
//         form.setError(error.field as keyof Inputs, {
//           message: error.errorMessage,
//           type: "invalid",
//         });
//       });
//     } else {
//       setError(response.message);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-8 justify-center items-center w-full">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="flex flex-col w-full gap-4"
//         >
//           <h3 className="text-2xl font-semibold mb-4">
//             {t("set-new-password-title")}
//           </h3>

//           {/* New Password Field */}
//           <FormField
//             name="newPassword"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem className="relative">
//                 <Input
//                   {...field}
//                   type={showPassword ? "text" : "password"}
//                   placeholder={t("password-placeholder")}
//                   className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
//                 />
//                 <div
//                   className="absolute bottom-2 end-3 flex items-center cursor-pointer"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5 text-gray-500" />
//                   ) : (
//                     <Eye className="w-5 h-5 text-gray-500" />
//                   )}
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Confirm Password Field */}
//           <FormField
//             name="confirmPassword"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem className="relative">
//                 <Input
//                   {...field}
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder={t("register-password-confirm-placeholder")}
//                   className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
//                 />
//                 <div
//                   className="absolute bottom-2 end-3 flex items-center cursor-pointer"
//                   onClick={() => setShowConfirmPassword((prev) => !prev)}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="w-5 h-5 text-gray-500" />
//                   ) : (
//                     <Eye className="w-5 h-5 text-gray-500" />
//                   )}
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FeedbackMessage>{error}</FeedbackMessage>

//           <Button
//             className="w-full mt-2 bg-[#122D9C] rounded-2xl"
//             disabled={
//               loading || (form.formState.isSubmitted && !form.formState.isValid)
//             }
//           >
//             {t("set-password-submit")}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FeedbackMessage from "@/components/common/feedback-message";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setNewPasswordAction } from "@/lib/actions/setNewPassword.action";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "@/i18n/routing";

export default function SetNewPasswordForm({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: () => void;
}) {
  const t = useTranslations();

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const Schema = z
    .object({
      newPassword: z
        .string()
        .nonempty(t("password-required"))
        .min(8, { message: t("password-is-too-short") })
        .regex(/[A-Z]/, t("password-uppercase"))
        .regex(
          /[a-z]/,
          t("password-must-contain-at-least-one-lowercase-letter"),
        )
        .regex(/[0-9]/, t("password-must-contain-at-least-one-number")),
      confirmPassword: z.string().min(1, t("password-confirm-required")),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      message: t("password-confirm-mismatch"),
      path: ["confirmPassword"],
    });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ newPassword }) => {
    setError(null);
    setLoading(true);

    const response = await setNewPasswordAction(email, newPassword);

    setLoading(false);

    if (response.message === "success") {
      form.reset();
      router.push("/auth/login");
      return;
    }

    setError(response.message);
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <h3 className="text-2xl font-semibold mb-4">
            {t("set-new-password-title")}
          </h3>

          {/* New Password Field */}
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
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
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="relative">
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("register-password-confirm-placeholder")}
                  className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                />
                <div
                  className="absolute bottom-2 end-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FeedbackMessage>{error}</FeedbackMessage>

          <Button
            className="w-full mt-2 bg-[#122D9C] rounded-2xl"
            disabled={
              loading || (form.formState.isSubmitted && !form.formState.isValid)
            }
          >
            {t("set-password-submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

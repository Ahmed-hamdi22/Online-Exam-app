// "use client";

// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { forgotPasswordAction } from "@/lib/actions/recoverPassword.action";
// import FeedbackMessage from "@/components/common/feedback-message";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// export default function ForgetPasswordForm({
//   onSuccess,
// }: {
//   onSuccess: (email: string) => void;
// }) {
//   const t = useTranslations();
//   const router = useRouter();

//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const Schema = z.object({
//     email: z.string().min(1, t("email-required")).email(t("email-invalid")),
//   });

//   type Inputs = z.infer<typeof Schema>;

//   const form = useForm<Inputs>({
//     resolver: zodResolver(Schema),
//   });

//   const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
//     setError(null);
//     setLoading(true);

//     const response = await forgotPasswordAction(email);
//     setLoading(false);

//     if (response.message === "success") {
//       form.reset();
//       onSuccess(email);
//       return;
//     }

//     if (response.message) {
//       response.message.forEach(
//         (error: { field: string; errorMessage: string }) => {
//           form.setError(error.field as keyof Inputs, {
//             message: error.errorMessage,
//             type: "invalid",
//           });
//         },
//       );
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
//             {t("forgetpass-title")}
//           </h3>

//           {/* Email Field */}
//           <FormField
//             name="email"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <Input
//                   {...field}
//                   type="email"
//                   placeholder={t("email-placeholder")}
//                   className="mb-1 rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FeedbackMessage>{error}</FeedbackMessage>

//           <Button
//             type="submit"
//             className="w-full mt-2 bg-[#122D9C] rounded-2xl"
//             disabled={
//               loading || (form.formState.isSubmitted && !form.formState.isValid)
//             }
//           >
//             {t("send-otp")}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import FeedbackMessage from "@/components/common/feedback-message";
import { forgotPasswordAction } from "@/lib/actions/recoverPassword.action";
import { useState } from "react";

export default function ForgetPasswordForm({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) {
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const Schema = z.object({
    email: z.string().min(1, t("email-required")).email(t("email-invalid")),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    setError(null);
    setLoading(true);

    const response = await forgotPasswordAction(email);
    setLoading(false);

    if (response.message === "success") {
      form.reset();
      onSuccess(email);
      return;
    }

    setError(response.message);
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4 max-w-md"
        >
          <h3 className="text-2xl font-semibold mb-4">
            {t("forgetpass-title")}
          </h3>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none"></div>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("email-placeholder")}
                      className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FeedbackMessage>{error}</FeedbackMessage>

          <Button
            type="submit"
            className="w-full bg-[#122D9C] rounded-2xl"
            disabled={
              loading || (form.formState.isSubmitted && !form.formState.isValid)
            }
          >
            {t("send-otp")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

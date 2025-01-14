// "use client";

// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import FeedbackMessage from "@/components/common/feedback-message";
// import { verifyCodeAction } from "@/lib/actions/verifyCode.action";

// export default function VervifyCodeForm() {
//   // Translation
//   const t = useTranslations();

//   // Navigation
//   const router = useRouter();

//   // State
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Form & Validation
//   type Inputs = {
//     resetCode: string;
//   };

//   const form = useForm<Inputs>({
//     defaultValues: {
//       resetCode: "",
//     },
//   });

//   // Functions
//   const onSubmit: SubmitHandler<Inputs> = async ({ resetCode }) => {
//     setError(null);
//     setLoading(true);
//     const response = await verifyCodeAction(resetCode);

//     setLoading(false);

//     if (response.status === "Success") {
//       // Clear the form after successful registration
//       form.reset();
//       router.push("/auth/setNewPassword");
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

//     <h3 className="text">Verify Code</h3>

//       {/* Email */}
//       <FormField
//         name="resetCode"
//         control={form.control}
//         render={({ field }) => (
//           <FormItem>

//             {/* Input */}
//             <Input {...field} placeholder={("Enter Code")} />

//             {/* Feedback */}
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Submit / Feedback */}
//       <div className="flex flex-col  mt-3">
//         {/* Feedback */}
//         <FeedbackMessage>{error}</FeedbackMessage>

//         {/* Submit */}
//         <Button className="rounded-5" disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{("send Code")}</Button>
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
// import { verifyCodeAction } from "@/lib/actions/verifyCode.action";
// import { forgotPasswordAction } from "@/lib/actions/recoverPassword.action";
// import { toast } from "sonner";

// export default function VerifyCodeForm({
//   email,
//   onSuccess,
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
//     resetCode: string;
//   };

//   const form = useForm<Inputs>({
//     defaultValues: {
//       resetCode: "",
//     },
//   });

//   const onSubmit: SubmitHandler<Inputs> = async ({ resetCode }) => {
//     setError(null);
//     setLoading(true);

//     const response = await verifyCodeAction(resetCode);

//     setLoading(false);

//     if (response.status === "Success") {
//       form.reset();
//       onSuccess();

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

//   const handleResendCode = async () => {
//     setError(null);
//     setLoading(true);

//     const response = await forgotPasswordAction(email);

//     setLoading(false);

//     if (response.message === "success") {
//       toast.success(t("resend-code-success"));
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
//           <h3 className="text-2xl font-semibold mb-4">{t("verify-title")}</h3>

//           <FormField
//             name="resetCode"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <Input
//                   {...field}
//                   placeholder={t("enter-code-placeholder")}
//                   className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
//                 />
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
//             {t("verify-submit")}
//           </Button>

//           <Button
//             type="button"
//             variant="ghost"
//             className="text-blue-500 hover:underline text-sm mt-2 capitalize"
//             disabled={loading}
//             onClick={handleResendCode}
//           >
//             {t("resend-code")}
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
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FeedbackMessage from "@/components/common/feedback-message";
import { verifyCodeAction } from "@/lib/actions/verifyCode.action";
import { forgotPasswordAction } from "@/lib/actions/recoverPassword.action";
import { toast } from "sonner";

export default function VerifyCodeForm({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const t = useTranslations();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  type Inputs = {
    resetCode: string;
  };

  const form = useForm<Inputs>({
    defaultValues: {
      resetCode: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ resetCode }) => {
    setError(null);
    setLoading(true);

    const response = await verifyCodeAction(resetCode);

    setLoading(false);

    if (response.status === "Success") {
      form.reset();
      onSuccess();
      return;
    }

    setError(response.message);
  };

  const handleResendCode = async () => {
    setError(null);
    setLoading(true);

    const response = await forgotPasswordAction(email);

    setLoading(false);

    if (response.message === "success") {
      toast.success(t("resend-code-success"));
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
          <h3 className="text-2xl font-semibold mb-4">{t("verify-title")}</h3>

          <FormField
            name="resetCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder={t("enter-code-placeholder")}
                  className="rounded-2xl h-10 border border-gray-300 focus:border-[#3366b8] focus:ring-0"
                />
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
            {t("verify-submit")}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="text-blue-500 hover:underline text-sm mt-2 capitalize"
            disabled={loading}
            onClick={handleResendCode}
          >
            {t("resend-code")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

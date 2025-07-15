import QuizApp from "@/components/QuizApp";

export default function QuizAppPage({
  params,
}: {
  params: { quizeId: string };
}) {
  return <QuizApp quizeId={params.quizeId} />;
}

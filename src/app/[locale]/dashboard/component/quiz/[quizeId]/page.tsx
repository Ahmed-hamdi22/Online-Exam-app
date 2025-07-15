import QuizApp from "../..";

export default function QuizAppPage({
  params,
}: {
  params: { quizeId: string };
}) {
  return <QuizApp quizeId={params.quizeId} />;
}

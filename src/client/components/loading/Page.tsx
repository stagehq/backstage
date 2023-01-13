import Spinner from "./Spinner";

export default function LoadingPage() {
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <Spinner color={"text-gray-400"} />
    </div>
  );
}

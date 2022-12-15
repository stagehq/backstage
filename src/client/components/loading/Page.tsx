import Spinner from "./Spinner";

export default function LoadingPage() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Spinner color={"text-gray-400"} />
    </div>
  );
}
import PacmanLoader from "react-spinners/PacmanLoader";
export default function LoadingPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-xl font-semibold text-white ">
      <PacmanLoader color="#36d7b7" />
      <p>stop starin me, while i'm loading</p>
    </div>
  );
}

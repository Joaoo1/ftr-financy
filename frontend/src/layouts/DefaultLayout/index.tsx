import Navbar from "./components/NavBar";

export const DefaultLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

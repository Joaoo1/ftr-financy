interface ErrorCardProps {
  message: string;
}

function ErrorCard({ message }: ErrorCardProps) {
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
      {message}
    </div>
  );
}

export { ErrorCard };

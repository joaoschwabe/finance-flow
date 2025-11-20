export function ErrorState({ error }: { error: Error }) {
  return (
    <div className="rounded-md border border-red-700 bg-red-900 p-4 text-red-100">
      <h3 className="mb-2 text-lg font-bold">Error</h3>
      <p>{error.message}</p>
    </div>
  );
}

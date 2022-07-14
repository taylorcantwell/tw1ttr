export function PrimaryLayoutContainer({ children }: { children: JSX.Element[] }) {
  return (
    <div className="grid md:grid-cols-[1fr,3fr] gap-5 container p-5 mt-10 mx-auto md:p-0">
      {children}
    </div>
  );
}

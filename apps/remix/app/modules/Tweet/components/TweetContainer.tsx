export function TweetContainer({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-[3fr,1fr] gap-5 container px-5 mx-auto">{children}</div>;
}

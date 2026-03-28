// app/alert/layout.tsx
export default function AlertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-full bg-transparent">{children}</div>;
}

// Dieses Layout isoliert das Payload Admin-Panel vom Haupt-Layout (Navbar/Footer)
export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

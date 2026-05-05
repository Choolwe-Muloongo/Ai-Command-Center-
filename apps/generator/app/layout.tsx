export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html><body style={{ fontFamily: "sans-serif", margin: 24 }}>{children}</body></html>;
}

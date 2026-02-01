import Providers from "./providers";

export const metadata = {
  title: "Philosopher Agent",
  description: "Adlerian-style chat assistant MVP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

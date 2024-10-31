import './globals.css';

export const metadata = {
  title: 'Halloween Hack 2024',
  description: 'Una experiencia escalofriante te espera...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-black min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
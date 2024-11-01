import './globals.css'

export const metadata = {
  title: 'Halloween Hack 2024',
  description: 'Una experiencia escalofriante te espera...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
import './globals.css';
import type { Metadata } from 'node_modules/next';

export const metadata: Metadata = {
  title: 'FF ARENA - Ultimate Free Fire Esports & Tournament Platform',
  description: 'Join daily Free Fire custom tournaments (Solo, Duo, Squad, Clash Squad). Win real cash prizes instantly credited to your wallet with 100% secure anti-cheat validation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-[#090a0f] text-gray-100 font-sans min-h-screen selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

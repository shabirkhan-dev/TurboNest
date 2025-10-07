import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "@rabtx/ui/globals.css";

const geistSans = Source_Code_Pro({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Source_Code_Pro({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Drive Connect",
	description: "Drive Connect",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}

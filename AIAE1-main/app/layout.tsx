import type { Metadata } from "next";
import "./globals.css";
import Layout from "./components/Layout";

// 定义应用程序的元数据，包括标题和描述
export const metadata: Metadata = {
  title: "AIAE",
  description: "AIAE Platform",
};

// 定义应用程序的根布局组件，接收子组件作为参数
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="font-sans">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}  

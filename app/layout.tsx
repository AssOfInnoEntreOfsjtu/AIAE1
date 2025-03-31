import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./components/Layout";

// 导入 Inter 字体，并指定只使用拉丁语子集
const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}  

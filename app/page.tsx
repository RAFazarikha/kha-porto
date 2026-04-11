import { redirect } from "next/navigation";

export default function RootPage() {
  // Secara otomatis me-lempar pengunjung ke versi bahasa Indonesia
  redirect("/en");
}
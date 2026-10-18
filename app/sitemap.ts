import { MetadataRoute } from "next";

const SITE_URL = "https://rachmadazizfazarikha.my.id";
const pages = ["", "/about", "/dashboard", "/projects", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["en", "id"].flatMap((lang) =>
    pages.map((page) => ({ url: `${SITE_URL}/${lang}${page}`, lastModified }))
  );
}

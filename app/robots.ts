import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots {
    return {
        rules:{
            userAgent: "*",
            allow: "/",
            disallow: ["/ai", "/chat","/create","/explore","/profile"]
        },
        sitemap: "https://neopal.vercel.app/sitemap.xml"
    };
}
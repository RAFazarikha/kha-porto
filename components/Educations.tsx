"use client"

import { useParams } from "next/navigation";
import { Reveal } from "@/components/Reveal"
import Image from "next/image"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Dot } from "lucide-react";

const educations = {
    id: {
        title: "Pendidikan",
        educations: [
            {
                school: "Universitas Trunojoyo Madura",
                degree: "S.Kom. Sistem Informasi",
                mark: "IPK 3,74",
                year: "Agu 2022 - Jul 2026",
                address: "Bangkalan, Jawa Timur, Indonesia",
                level: "Gelar Sarjana",
                logo: "/utm.png"
            },
            {
                school: "MAS Ihyaul Ulum Dukun",
                degree: "IPA",
                year: "2019 - 2022",
                address: "Gresik, Jawa Timur, Indonesia",
                level: "Sekolah Menengah Atas",
                logo: "/maiu.png",
                mark: null
            }
        ]
    },
    en: {
        title: "Education",
        educations: [
            {
                school: "Universitas Trunojoyo Madura",
                degree: "S.Kom. Information Systems",
                mark: "GPA 3.74",
                year: "Aug 2022 - Jul 2026",
                address: "Bangkalan, Jawa Timur, Indonesia",
                level: "Bachelor's Degree",
                logo: "/utm.png"
            },
            {
                school: "MAS Ihyaul Ulum Dukun",
                degree: "Science",
                year: "2019 - 2022",
                address: "Gresik, Jawa Timur, Indonesia",
                level: "Senior High School",
                logo: "/maiu.png",
                mark: null
            }
        ]
    }
};

export default function Educations() {
    const params = useParams();
    const lang = (params?.lang as "id" | "en") || "id";

    const currentEduData = educations[lang];

    return (
        <div className="flex flex-col">
            <ItemGroup className="gap-4">
                {Object.values(currentEduData.educations).map((education, i) => (
                    <Reveal key={education.school} delay={i * 0.08} role="listitem">
                    <Item variant="muted" render={
                    <a href="#">
                        <ItemMedia variant="image">
                            <Image
                                src={education.logo}
                                alt={education.school}
                                width={100}
                                height={100}
                                className="size-24"
                            />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="text-base">
                                {education.school}
                            </ItemTitle>
                            <ItemDescription className="flex flex-row text-sm">
                                {education.level}<Dot size={20} />{education.degree}{education.mark ? (
                                    <>
                                        <Dot size={20} /> {education.mark}
                                    </>
                                    ) : (
                                    education.mark
                                )}
                            </ItemDescription>
                            <ItemDescription className="flex flex-row text-xs">
                                {education.year}<Dot size={16} />{education.address}
                            </ItemDescription>
                        </ItemContent>
                    </a>
                    } />
                    </Reveal>
                ))}
            </ItemGroup>
        </div>
    )
}

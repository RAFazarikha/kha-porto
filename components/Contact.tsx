import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SiGmail } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6";

interface ContactProps {
  dict: Record<string, string>;
}

export default function Contact({ dict }: ContactProps) {

  return (
    <section id="about" className="transition-colors space-y-3 lg:space-y-5 mb-5">
      <div className="relative space-y-4 mx-2 md:ml-3 md:mr-0 py-7 lg:ml-5 px-4 sm:px-6 lg:px-8 border rounded-lg shadow">
        <div>
          <h1 className="text-2xl md:text-3xl tracking-tight text-primary">{dict.title}</h1>
          <p className="flex flex-row">
            {dict.subtitle}
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-2 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-1!">
                <CardHeader className="">
                    <h2 className="text-lg md:text-xl tracking-tight text-primary">
                        {dict.email}
                    </h2>
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <p className="w-1/2">
                        {dict.subTitleEmail}
                    </p>
                    <SiGmail className="size-18 md:size-24 text-primary" />
                </CardContent>
                <CardFooter className="">
                    <a
                        href="mailto:fazarikha923@gmail.com"
                        target="_blank"
                        className={buttonVariants({ variant: "secondary", size: "lg" })}
                    >
                        <span>{dict.ctaEmail}</span>
                        <ArrowUpRight />
                    </a>
                </CardFooter>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-1!">
                <CardHeader className="">
                    <h2 className="text-lg md:text-xl tracking-tight text-primary">
                        {dict.instagram}
                    </h2>
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <p className="w-1/2">
                        {dict.subTitleInstagram}
                    </p>
                    <FaInstagram className="size-18 md:size-24 lg:size-18 text-primary" />
                </CardContent>
                <CardFooter className="">
                    <a
                        href="https://www.instagram.com/fzrkha"
                        target="_blank"
                        className={buttonVariants({ variant: "secondary", size: "lg" })}
                    >
                        <span>{dict.ctaInstagram}</span>
                        <ArrowUpRight />
                    </a>
                </CardFooter>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-1!">
                <CardHeader className="">
                    <h2 className="text-lg md:text-xl tracking-tight text-primary">
                        {dict.linkedin}
                    </h2>
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <p className="w-1/2">
                        {dict.subTitleLinkedin}
                    </p>
                    <FaLinkedin className="size-18 md:size-24 lg:size-18 text-primary" />
                </CardContent>
                <CardFooter className="">
                    <a
                        href="https://www.linkedin.com/in/rachmad-aziz-fazarikha/"
                        target="_blank"
                        className={buttonVariants({ variant: "secondary", size: "lg" })}
                    >
                        <span>{dict.ctaLinkedin}</span>
                        <ArrowUpRight />
                    </a>
                </CardFooter>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-1!">
                <CardHeader className="">
                    <h2 className="text-lg md:text-xl tracking-tight text-primary">
                        {dict.tiktok}
                    </h2>
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <p className="w-1/2">
                        {dict.subTitleTiktok}
                    </p>
                    <FaTiktok className="size-18 md:size-24 lg:size-18 text-primary" />
                </CardContent>
                <CardFooter className="">
                    <a
                        href="https://www.tiktok.com/@fazarikha.24"
                        target="_blank"
                        className={buttonVariants({ variant: "secondary", size: "lg" })}
                    >
                        <span>{dict.ctaTiktok}</span>
                        <ArrowUpRight />
                    </a>
                </CardFooter>
            </Card>
            <Card className="md:col-span-2 lg:col-span-1 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-1!">
                <CardHeader className="">
                    <h2 className="text-lg md:text-xl tracking-tight text-primary">
                        {dict.github}
                    </h2>
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <p className="w-1/2">
                        {dict.subTitleGithub}
                    </p>
                    <FaGithub className="size-18 md:size-24 lg:size-18 text-primary" />
                </CardContent>
                <CardFooter className="">
                    <a
                        href="https://github.com/RAFazarikha"
                        target="_blank"
                        className={buttonVariants({ variant: "secondary", size: "lg" })}
                    >
                        <span>{dict.ctaGithub}</span>
                        <ArrowUpRight />
                    </a>
                </CardFooter>
            </Card>
        </div>
      </div>
    </section>
  );
}
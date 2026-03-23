import Link from "next/link";
import { FlaskConical, Mail, MapPin, Github, Twitter, Linkedin, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Lab: [
    { label: "About Us", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "Members", href: "/members" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Publications", href: "/publications" },
    { label: "Datasets", href: "/research#datasets" },
    { label: "Open Source", href: "https://github.com", external: true },
  ],
  Connect: [
    { label: "Contact Us", href: "/contact" },
    { label: "Join the Lab", href: "/contact#join" },
    { label: "Collaborate", href: "/contact#collaborate" },
    { label: "Media Inquiries", href: "/contact#media" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">
                <FlaskConical className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Applied<span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Applying state-of-the-art AI to bioinformatics, time series analysis, and materials
              design — advancing scientific discovery through rigorous research and open tools.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span>
                  School of Information and Communication Technology
                  <br />
                  Hanoi University of Science and Technology
                  <br />
                  1 Dai Co Viet, Hai Ba Trung, Hanoi, Vietnam
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-blue-400" />
                <a
                  href="mailto:thu.nguyenthi6@hust.edu.vn"
                  className="transition-colors hover:text-white"
                >
                  thu.nguyenthi6@hust.edu.vn
                </a>
              </div>
            </div>
            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all hover:bg-blue-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} AppliedAI-Lab. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

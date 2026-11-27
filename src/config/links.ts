import type { IconType } from "react-icons";
import { FaFileAlt, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiCheckmarx, SiGithub, SiHashnode } from "react-icons/si";

export type LinkItem = {
  label: string;
  href: string;
  shortcut: string;
  icon: IconType;
  color: string;
};

export const links: LinkItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/iknevo",
    shortcut: "ggh",
    icon: SiGithub,
    color: "#2dba4e",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-abdelhafiez",
    shortcut: "gli",
    icon: FaLinkedin,
    color: "#0a66c2",
  },
  {
    label: "Main portfolio",
    href: "https://nevo.is-a.dev",
    shortcut: "gmp",
    icon: SiHashnode,
    color: "#e34f26",
  },
  {
    label: "Blog",
    href: "https://nevo.is-a.dev/blog",
    shortcut: "gbl",
    icon: SiCheckmarx,
    color: "#e34f26",
  },
  {
    label: "Resume",
    href: "https://nevo.is-a.dev/resume",
    shortcut: "grs",
    icon: FaFileAlt,
    color: "#f9e2af",
  },
  {
    label: "Contact Me",
    href: "mailto:ahmed.abdelhafiez.work@outlook.com",
    shortcut: "gcm",
    icon: MdEmail,
    color: "#cba6f7",
  },
];

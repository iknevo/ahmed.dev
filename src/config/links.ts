import type { IconType } from "react-icons";
import { FaBriefcase, FaFileAlt, FaFolderOpen, FaLayerGroup, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiCheckmarx, SiGithub, SiHashnode } from "react-icons/si";

export type LinkItem = {
  label: string;
  href: string;
  shortcut: string;
  icon: IconType;
  color: string;
};

// Goes back to the home page; only active on sub-pages.
export const backShortcut = "gb";

export const links: LinkItem[] = [
  {
    label: "Projects",
    href: "/projects",
    shortcut: "gpr",
    icon: FaFolderOpen,
    color: "#89b4fa",
  },
  {
    label: "Skills",
    href: "/skills",
    shortcut: "gsk",
    icon: FaLayerGroup,
    color: "#a6e3a1",
  },
  {
    label: "Experience",
    href: "/experience",
    shortcut: "gex",
    icon: FaBriefcase,
    color: "#fab387",
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
    label: "Contact Me",
    href: "mailto:ahmed.abdelhafiez.work@outlook.com",
    shortcut: "gcm",
    icon: MdEmail,
    color: "#cba6f7",
  },
];

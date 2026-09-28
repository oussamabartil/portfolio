import { profile } from "@/data/profile";

export function Footer() {
  return <footer>© {new Date().getFullYear()} {profile.name} — {profile.location}</footer>;
}

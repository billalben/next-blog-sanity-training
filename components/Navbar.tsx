import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="container mx-auto flex max-w-4xl items-center justify-between py-5">
      <Link href="/" className="text-3xl font-bold">
        Billal<span className="text-primary">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  );
}

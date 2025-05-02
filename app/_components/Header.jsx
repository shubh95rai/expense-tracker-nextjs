import Image from "next/image";

export default function Header() {
  return (
    <div className="px-5 h-16 flex items-center justify-between border-b shadow fixed w-full">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={0}
        height={0}
        className="w-[160px] ml-4"
      />

      {/* <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link> */}
    </div>
  );
}

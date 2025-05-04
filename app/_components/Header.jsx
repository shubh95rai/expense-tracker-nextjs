import Image from "next/image";

export default function Header() {
  return (
    <div className="px-5 h-16 flex items-center justify-between border-b shadow fixed w-full">
      {/* <Image
        src="/logo.svg"
        alt="Logo"
        width={0}
        height={0}
        className="w-[160px]"
      /> */}

      <div className="flex items-center gap-2">
        <Image
          src="/logoSmall.svg"
          alt="Logo"
          width={0}
          height={0}
          priority
          className=" size-7"
        />
        <span className="font-bold text-2xl tracking-tight">
          Expense <span className="text-indigo-600">Tracker</span>
        </span>
      </div>

      {/* <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link> */}
    </div>
  );
}

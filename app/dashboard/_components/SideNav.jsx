"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuList = [
  {
    id: 1,
    name: "Dashboard",
    icon: <LayoutGrid />,
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Budgets",
    icon: <PiggyBank />,
    path: "/dashboard/budgets",
  },
  {
    id: 3,
    name: "Expenses",
    icon: <ReceiptText />,
    path: "/dashboard/expenses",
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="h-full p-5 border-r shadow">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={0}
          height={0}
          priority
          className="ml-4 w-[160px]"
        />
      </Link>

      <div className="mt-8 space-y-2">
        {menuList.map((menuItem) => {
          const isActive = pathname === menuItem.path;

          return (
            <Link
              href={menuItem.path}
              key={menuItem.id}
              className={cn(
                "flex items-center gap-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-indigo-600 hover:bg-indigo-100",
                isActive ? "text-indigo-600 bg-indigo-100" : ""
              )}
            >
              {menuItem.icon}
              {menuItem.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

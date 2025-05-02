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

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <div className="md:hidden px-5 h-16 shadow border-b flex items-center justify-between">
      <Link href="/">
        <Image
          src="/logoSmall.svg"
          alt="Logo"
          width={0}
          height={0}
          priority
          className=" w-[24px]"
        />
      </Link>

      <div className="flex gap-4 items-center">
        {menuList.map((menuItem) => {
          const isActive = pathname === menuItem.path;

          return (
            <Link
              href={menuItem.path}
              key={menuItem.id}
              className={cn(
                "flex items-center gap-2 text-gray-500 font-medium  cursor-pointer rounded-md hover:text-indigo-600",
                isActive ? "text-indigo-600" : ""
              )}
            >
              {menuItem.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { LucideProps } from "lucide-react";
import { motion } from "framer-motion";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;

    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;

            return (
              <Link
                key={item.url}
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary-crx/20 text-color-primary"
                    : "text-text-secondary-crx hover:bg-surface-light-crx hover:text-primary"
                }`}
              >
                <Icon size={24} />
                <span className="font-medium">{item.title}</span>
                {!!isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-1 h-6 bg-primary-crx rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </SidebarMenu>
    </SidebarGroup>
  );
}

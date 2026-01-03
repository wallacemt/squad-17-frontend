"use client";
import {
  AudioWaveform,
  BookmarkIcon,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  GridIcon,
  PieChart,
  SearchIcon,
  Settings2,
  SquareTerminal,
  StarIcon,
} from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useAuthContext } from "@/context/authContext";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Feed",
      url: "/",
      icon: GridIcon,
      isActive: true,
    },
    {
      title: "Watchlist",
      url: "/watchlist",
      icon: BookmarkIcon,
    },
    {
      title: "Pesquisa",
      url: "/search",
      icon: SearchIcon,
    },
    {
      title: "Tier Rank",
      url: "/tier-rank",
      icon: StarIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuthContext();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center p-4">
          <Link href="/">
            <Image src="/images/logo-full.png" width={200} height={25} alt="Critix Logo" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || data.user.name,
            email: user?.email || data.user.email,
            avatar: user?.profile?.avatarUrl || data.user.avatar,
          }}
          logout={logout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

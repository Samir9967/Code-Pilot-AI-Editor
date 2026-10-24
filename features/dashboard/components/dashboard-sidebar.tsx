"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Code2,
  Compass,
  Database,
  FlameIcon,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import path from "node:path/win32";
import React, { useState } from "react";

interface PlaygroundDataProps {
  id: string;
  name: string;
  icon: string;
  starred: boolean;
}

const lucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2,
};

export const DashboardSidebar = ({
  initialPlaygroundData,
}: {
  initialPlaygroundData: PlaygroundDataProps[];
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [starredPlaygrounds, setStarredPlayground] = useState(
    initialPlaygroundData.filter((p) => p.starred),
  );
  const [recentPlaygrounds, setRecentPlaygrounds] = useState(
    initialPlaygroundData,
  );
  return (
    <Sidebar variant="inset" collapsible="icon" className="border border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={60} width={60} />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/"}
                tooltip={"Home"}
                onClick={() => router.push("/")}
              >
                <Home className="size-4" />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/dashboard"}
                tooltip={"Home"}
                onClick={() => router.push("/")}
              >
                <LayoutDashboard className="size-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <Star className="size-4 mr-2" />
            Starred
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add Starred Project">
            <Plus className="size-4" />
          </SidebarGroupAction>

          <SidebarGroupContent>
            <SidebarMenu>
              {starredPlaygrounds.length === 0 &&
              recentPlaygrounds.length === 0 ? (
                <div className="text-center text-muted-foreground py-4 w-full">
                  Create Your Project
                </div>
              ) : (
                starredPlaygrounds.map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        isActive={pathname === `./playground/${playground.id}`}
                        tooltip={playground.name}
                        onClick={() =>
                          router.push(`/playground/${playground.id}`)
                        }
                      >
                        <IconComponent className="size-4" />
                        <span>{playground.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <History className="size-4 mr-2" />
            Recent
          </SidebarGroupLabel>
          <SidebarGroupAction title="Create new playground">
            <FolderPlus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {starredPlaygrounds.length === 0 && recentPlaygrounds.length === 0
                ? null
                : recentPlaygrounds.map((playground) => {
                    const IconComponent =
                      lucideIconMap[playground.icon] || Code2;
                    return (
                      <SidebarMenuItem key={playground.id}>
                        <SidebarMenuButton
                          isActive={pathname === `/playground/${playground.id}`}
                          tooltip={playground.name}
                          onClick={() =>
                            router.push(`/playground/${playground.id}`)
                          }
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{playground.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="View all"
                  onClick={() => router.push("/playgrounds")}
                >
                  <span className="text-sm text-muted-foreground">
                    View all Projects
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              onClick={() => router.push("/settings")}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

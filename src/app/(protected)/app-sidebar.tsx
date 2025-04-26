'use client'

import { Button } from "@/components/ui/button"
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton,  SidebarMenu } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Bot, CreditCard, LayoutDashboard, Presentation } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q/A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Buy More Credits",
    url: "/credits",
    icon: CreditCard,
  }
]

const projects = [
  {
    id: "1",
    name: "Project 1",
    icon: LayoutDashboard,
  },
]
export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        Logo
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2">
        <SidebarGroup>
          <SidebarGroupLabel>
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className={cn({
                    '!bg-primary !text-white': pathname === item.url
                  })}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>

                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup> 
          <SidebarGroupLabel>
            Your Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map(project =>{
                return(
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <div>
                        <div className={cn(
                        'rounded-sm border size-6 flex item-center justify-center text-sm bg-white text-primary',
                        {
                          'bg-primary text-white' : true
                        }
                        
)}>
                         {
                          project.name[0]
                        }
                        </div>
                        <span className="ml-2">{project.name}</span>  
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
              <div className="h-2"></div>
                <SidebarMenuItem>
                  <Link href='/create'>  
                  <Button size='sm' variant="outline" className="w-fit mt-2">
                Create Project 
              </Button>
              </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

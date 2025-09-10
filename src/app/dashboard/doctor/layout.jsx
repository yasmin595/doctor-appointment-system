"use client";
import { SidebarFooter, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LogOutIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";


const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Appointments",
        url: "/dashboard/doctor/doctor-appointments",
        icon: Inbox,
    },
]

export default function PatientLayout({ children }) {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return <div className="text-center mt-20">Loading...</div>;
    }
    if(!session ){
        redirect('/login')
    }
    if(session?.user?.role !== "Doctor"){
        redirect('/')
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" >
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Doctor Dashboard</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2 /> {session?.user?.name || "User"}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem onClick={() => { redirect('/dashboard/doctor/doctor-profile-details') }}>
                                        <span>Account</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { signOut();}}>
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <main className="w-full">
                <SidebarTrigger />
                <div className="w-11/12 mx-auto flex justify-end "><ModeToggle/></div>
                
                {children}
            </main>


        </SidebarProvider>


    );
}

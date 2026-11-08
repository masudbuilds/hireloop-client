import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

const DashboardLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <TooltipProvider>
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </TooltipProvider>
    </SidebarProvider>
  )
}

export default DashboardLayout

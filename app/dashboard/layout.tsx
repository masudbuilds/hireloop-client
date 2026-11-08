import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import {Toaster} from "@/components/ui/toast"


const DashboardLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <TooltipProvider>
        <main>
          <SidebarTrigger />
          {children}
        </main>
        <Toaster/>
      </TooltipProvider>
    </SidebarProvider>
  )
}

export default DashboardLayout

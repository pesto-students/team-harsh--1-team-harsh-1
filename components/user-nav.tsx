'use client';

import { LogOut, ShoppingBag } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export function UserNav({userName, userEmail}:{userName: string, userEmail: string}) {
  const router = useRouter();

  const onLogout = async () => {
    try {
      // setLoading(true);
      const response = await axios.get('/api/sign-out');
      localStorage.clear()
      router.push('/sign-in');
      toast.success(response.data.message);
    } catch (error: any) {
      console.log("Sign-up error", error);
      toast.error(error?.response?.data ?? error.message);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer hover:bg-accent hover:text-accent-foreground">
          {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={()=> router.push('/orders')} className="cursor-pointer">
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>My Orders</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
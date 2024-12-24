"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { checkAdmin } from '@/utils/adminCheck'

export const EditMenu = ({ className }: {className?: string}) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // on mount we check admin status
  useEffect(()=> {
    setIsAdmin(checkAdmin());
  }, [])

  return (
    <>
    {isAdmin && 
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full h-full p-0" >
            <Image src="/plus.svg" alt="plus icon" width="50" height="50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent>
          <DropdownMenuItem className="justify-center">
            <p>הוספת תרגיל חדש</p>
          </DropdownMenuItem>

          <DropdownMenuItem className="justify-center">
            <p>עריכת תרגיל זה</p>
          </DropdownMenuItem>

          <DropdownMenuItem className="justify-center">
            <p>מחיקת תרגיל זה</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>}
    </>
  )
}

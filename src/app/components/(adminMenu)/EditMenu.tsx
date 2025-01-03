import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Drill } from '@/app/lib/types'
import { DeleteDrillMenu } from "./DeleteDrillMenu"
import { AddDrillForm } from "./AddDrillForm"
import { EditDrillForm } from "./EditDrillForm"

type EditMenuProps = {
  className?: string;
} & Drill;

export const EditMenu = ({ className, ...drill }: EditMenuProps) => {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full h-full p-0" >
            <Image src="/plus.svg" alt="plus icon" width="50" height="50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-0">
          <DropdownMenuItem asChild>
            <AddDrillForm/>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <EditDrillForm {...drill} />
          </DropdownMenuItem>

          <DropdownMenuItem asChild >
            <DeleteDrillMenu id={drill.id} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

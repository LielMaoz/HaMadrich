import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Drill, ProfessionalContent } from '@/app/lib/types';
import { DeleteDrillMenu } from './DeleteDrillMenu';
import { AddDrillForm } from './AddDrillForm';
import { EditDrillForm } from './EditDrillForm';
import { EditContentForm } from './EditContentForm';
import { AddContentForm } from './AddContentForm';
import { DeleteContentMenu } from './DeleteContentMenu';

type EditMenuProps = {
  className?: string;
  data: Drill | ProfessionalContent;
};

export const EditMenu = ({ className, data }: EditMenuProps) => {
  const isDrill = (data: Drill | ProfessionalContent): data is Drill => {
    return (data as Drill).training_name !== undefined;
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full h-full p-0">
            <Image src="/plus.svg" alt="plus icon" width="50" height="50" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-0">
          {isDrill(data) ? (
            <>
              <DropdownMenuItem asChild>
                <AddDrillForm />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditDrillForm {...data} />
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DeleteDrillMenu id={data.id} />
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <AddContentForm />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditContentForm {...data} />
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DeleteContentMenu id={data.id} />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export const DeleteDrillMenu = ( { id }: { id: number }) => {
  const handleClick = () => {
    console.log(id);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full hover:bg-secondary/80">מחיקת תרגיל</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">האם אתה בטוח שאתה רוצה למחוק את התרגיל הזה?</AlertDialogTitle>

          <AlertDialogDescription className="text-right">
            לא ניתן לבטל פעולה זו. פעולה זו תמחק לצמיתות את התרגיל ותסיר את הנתונים מהשרתים שלנו.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>ביטול</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>המשך</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

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
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

export const DeleteDrillMenu = ({ id }: { id: number }) => {
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setMsg("");
    setLoading(true);

    try {
      const token = localStorage.getItem('jwtToken');
      const res = await fetch('/api/drills/edit', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      });
      if (res.ok) {
        setMsg("הפעולה בוצעה");
        await new Promise((res)=> setTimeout(res, 2000));
        window.location.reload();
      } else {
        setMsg("הפעולה נכשלה");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full hover:bg-secondary/80">
        מחיקת תרגיל
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            האם אתה בטוח שאתה רוצה למחוק את התרגיל הזה?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-right">
            לא ניתן לבטל פעולה זו. פעולה זו תמחק לצמיתות את התרגיל ותסיר את
            הנתונים מהשרתים שלנו.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <p className={`w-full flex justify-center items-center ${msg === "הפעולה בוצעה" ? "text-green-700" : "text-red-500"}`}>
            {msg}
          </p>
          <AlertDialogCancel>ביטול</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick} disabled={loading}>{loading ? <LoadingSpinner /> : 'המשך'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

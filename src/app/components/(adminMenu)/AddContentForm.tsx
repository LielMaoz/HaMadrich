'use client';
import {
  AlertDialog,
  //AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

// cheking the form imput
const formSchema = z.object({
  content_name: z.string().min(1, { message: 'יש להזין שם' }).max(255),
  description: z.string().default(''),
  preview_img: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 4 * 1024 * 1024, // Max size: 4MB
      { message: 'File size must be 4MB or less' }
    )
    .refine(
      (file) => ['image/jpeg', 'image/png'].includes(file.type), // Only JPEG or PNG
      { message: 'Only JPEG or PNG files are allowed' }
    )
    .optional(),
  link_description: z.string().default(''),
  link: z.string().default(''),
  visible: z.preprocess((value) => !value, z.boolean().default(true)),
});

export const AddContentForm = () => {
  const [msg, setMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content_name: '',
      description: '',
      link_description: '',
      link: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setMsg('');
    setLoading(true);
    // Create a FormData object to hold both JSON and file data
    const formData = new FormData();

    // Append the form values (except files) to the FormData
    Object.keys(values).forEach((key) => {
      if (key !== 'preview_img') {
        formData.append(key, values[key as keyof typeof values] as string);
      }
    });

    // Append the file
    if (values.preview_img) {
      formData.append('preview_img', values.preview_img);
    }
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await fetch('/api/professionalContent/edit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.ok) {
        // telling user his action is succsesful and refreshing screen after a delay
        setMsg('הפעולה בוצעה');
        await new Promise((res) => setTimeout(res, 2000));
        window.location.reload();
      } else {
        // telling user what is wrong
        const { error } = await res.json();
        setMsg(error || 'הפעולה נכשלה');
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
        הוספת תוכן חדש
      </AlertDialogTrigger>

      <AlertDialogContent className="h-3/4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            הוספת חומר מקצועי
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center">
            מלא את כל הפרטים לתוכן החדש
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            id="myForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto h-[95%] overflow-y-auto py-2 px-2"
          >
            <FormField
              control={form.control}
              name="content_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">שם</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="שם התוכן" {...field} />
                  </FormControl>
                  <FormDescription>השם שבו יופיע תוכן זה באתר</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* text field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>הסבר על התוכן</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="הסבר"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>הסבר שיוצג למשתמש</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* file upload */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="preview_img"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תמונת תצוגה של התוכן</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || null)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        תמונה זו תוצג לפני הכניסה לתוכן
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="link_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תיאור קישור 1</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="תיאור קישור" {...field} />
                  </FormControl>
                  <FormDescription>תיאור הקישור באתר</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>קישור 1</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="קישור 1" {...field} />
                  </FormControl>
                  <FormDescription>
                    הוסף את הקישור המתאים לתיאור שרשמת
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תיאור קישור 2</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="תיאור קישור" {...field} />
                  </FormControl>
                  <FormDescription>תיאור הקישור באתר</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>קישור 2</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="קישור 2" {...field} />
                  </FormControl>
                  <FormDescription>
                    הוסף את הקישור המתאים לתיאור שרשמת
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תיאור קישור 3</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="תיאור קישור" {...field} />
                  </FormControl>
                  <FormDescription>תיאור הקישור באתר</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>קישור 3</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="קישור 3" {...field} />
                  </FormControl>
                  <FormDescription>
                    הוסף את הקישור המתאים לתיאור שרשמת
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תיאור קישור 4</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="תיאור קישור" {...field} />
                  </FormControl>
                  <FormDescription>תיאור הקישור באתר</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>קישור 4</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="קישור 4" {...field} />
                  </FormControl>
                  <FormDescription>
                    הוסף את הקישור המתאים לתיאור שרשמת
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תיאור קישור 5</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="תיאור קישור" {...field} />
                  </FormControl>
                  <FormDescription>תיאור הקישור באתר</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>קישור 5</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="קישור 5" {...field} />
                  </FormControl>
                  <FormDescription>
                    הוסף את הקישור המתאים לתיאור שרשמת
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Switch for is visible or not */}
            <FormField
              control={form.control}
              name="visible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-start rounded-lg border p-4 gap-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel>מוסתר</FormLabel>
                    <FormDescription>מסתיר את התוכן ממשתמשים</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <AlertDialogFooter className="gap-2">
          <p
            className={`w-full flex justify-center items-center ${
              msg === 'הפעולה בוצעה' ? 'text-green-700' : 'text-red-500'
            }`}
          >
            {msg}
          </p>
          <AlertDialogCancel>ביטול</AlertDialogCancel>
          <Button type="submit" form="myForm" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'המשך'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

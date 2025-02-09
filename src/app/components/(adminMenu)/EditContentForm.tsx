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
import { ProfessionalContent } from '@/app/lib/types';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

// cheking the form imput
const formSchema = z.object({
  name: z.string().min(1, { message: 'יש להזין שם' }).max(255),
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
  link1description: z.string().default(''),
  link1: z.string().default(''),
  link2description: z.string().default(''),
  link2: z.string().default(''),
  link3description: z.string().default(''),
  link3: z.string().default(''),
  link4description: z.string().default(''),
  link4: z.string().default(''),
  link5description: z.string().default(''),
  link5: z.string().default(''),
  visible: z.preprocess((value) => !value, z.boolean().default(true)),
});

export const EditContentForm = ({ ...content }: ProfessionalContent) => {
  const [msg, setMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: content.name,
      description: content.description,
      link1description: content.link1description || '',
      link1: content.link1 || '',
      link2description: content.link2description || '',
      link2: content.link2 || '',
      link3description: content.link3description || '',
      link3: content.link3 || '',
      link4description: content.link4description || '',
      link4: content.link4 || '',
      link5description: content.link5description || '',
      link5: content.link5 || '',
      visible: !content.visible,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setMsg('');
    setLoading(true);

    const valuesWithId = {
      ...values,
      id: content.id,
    };
    if (values.preview_img) {
      // Create a FormData object to hold both JSON and file data
      const formData = new FormData();

      // Append the form values (except files) to the FormData
      Object.keys(valuesWithId).forEach((key) => {
        if (key !== 'range_img' && key !== 'preview_img') {
          formData.append(
            key,
            valuesWithId[key as keyof typeof valuesWithId] as string
          );
        }
      });

      // Append the files
      const previewImg = values.preview_img;

      if (previewImg) {
        if (previewImg) {
          formData.append('preview_img', previewImg);
        }
        try {
          const token = localStorage.getItem('jwtToken');
          const res = await fetch('/api/professionalContent/edit', {
            method: 'PUT',
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
      }
    } else {
      try {
        const token = localStorage.getItem('jwtToken');
        const res = await fetch('/api/professionalContent/edit', {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(valuesWithId),
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
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full hover:bg-secondary/80">
        שינוי תוכן
      </AlertDialogTrigger>

      <AlertDialogContent className="h-3/4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            שינוי תוכן
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center">
            באפשרותך לשנות את כל הפרטים של התוכן
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
              name="name"
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
              name="link1description"
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
              name="link1"
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
              name="link2description"
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
              name="link2"
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
              name="link3description"
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
              name="link3"
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
              name="link4description"
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
              name="link4"
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
              name="link5description"
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
              name="link5"
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

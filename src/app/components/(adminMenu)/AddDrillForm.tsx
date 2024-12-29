'use client'
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
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"

// cheking the form imput
const formSchema = z.object({
  training_name: z.string().min(1, {message: "יש להזין שם"}).max(255),
  drill_type: z.string().min(1, {message: "יש לבחור באחת מן האפשרויות"}).max(50),
  weapon_type: z.string().min(1, {message: "יש לבחור באחת מן האפשרויות"}).max(50),
  target_type: z.string().min(1, {message: "יש לבחור באחת מן האפשרויות"}).max(50),
  time_to_shoot: z.preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value),
    z.number().nonnegative().default(0)
  ),
  ammo: z.preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value),
    z.number().nonnegative().default(0)
  ),
  distance: z.preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value),
    z.number().nonnegative().default(0)
  ),
  description: z.string().default(""),
  range_img: z.instanceof(File, { message: "יש לעלות תמונה" }).refine(
    (file) => file.size <= 4 * 1024 * 1024, // Max size: 4MB
    { message: "File size must be 4MB or less" }
  ).refine(
    (file) => ["image/jpeg", "image/png"].includes(file.type), // Only JPEG or PNG
    { message: "Only JPEG or PNG files are allowed" }
  ),
  preview_img: z.instanceof(File).refine(
    (file) => file.size <= 4 * 1024 * 1024, // Max size: 4MB
    { message: "File size must be 4MB or less" }
  ).refine(
    (file) => ["image/jpeg", "image/png"].includes(file.type), // Only JPEG or PNG
    { message: "Only JPEG or PNG files are allowed" }
  ).optional(),
  visible: z.preprocess((value) => !value , z.boolean().default(true))
});


export const AddDrillForm = () => {
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      training_name: "",
      drill_type: "",
      weapon_type: "",
      target_type: "",
      time_to_shoot: 0,
      ammo: 0,
      distance: 0,
      description: "",
    },
  })

  const onSubmit = async (values: z.infer < typeof formSchema > ) => {
    // add fetch when backend is done
    console.log(values);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full hover:bg-secondary/80">הוספת תרגיל חדש</AlertDialogTrigger>

      <AlertDialogContent className="h-3/4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">יצירת תרגיל</AlertDialogTitle>

          <AlertDialogDescription className="text-center">
            ענה מלא את כל הפרטים הבאים למקצה החדש
          </AlertDialogDescription>
        </AlertDialogHeader>

        
        <Form {...form}>
          <form id="myForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto h-[95%] overflow-y-auto py-2 px-2" >
            <FormField
              control={form.control}
              name="training_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">שם המקצה</FormLabel>
                  <FormControl>
                    <Input 
                    type="text" 
                    placeholder="שם המקצה"
                    {...field} />
                  </FormControl>
                  <FormDescription>
                    השם שבו יופיע מקצה זה באתר
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* the 3 types: drill_type, weapon_type, target_type all are select */}
            <div className="grid grid-cols-12 gap-4"> 
              <div className="col-span-4">         
                <FormField
                  control={form.control}
                  name="drill_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סוג מקצה</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר סוג מקצה" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="יבש">יבש</SelectItem>
                          <SelectItem value="חי">חי</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                  
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="weapon_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סוג נשק</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר סוג נשק" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="אקדח">אקדח</SelectItem>
                          <SelectItem value="נשק ארוך">נשק ארוך</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
          
              <div className="col-span-4">  
                <FormField
                  control={form.control}
                  name="target_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סוג מטרה</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר סוג מטרה" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="איפוסון">איפוסון</SelectItem>
                          <SelectItem value="הישגית">הישגית</SelectItem>
                          <SelectItem value="גוף">גוף</SelectItem>
                          <SelectItem value="רחפן">רחפן</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* the 3 numbers: time_to_shoot, ammo, distance all are numbers */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="time_to_shoot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>זמן לירי</FormLabel>
                      <FormControl>
                        <Input 
                        placeholder="0"
                        min="0"
                        step="1"
                        type="number"
                        {...field} />
                      </FormControl>
                      <FormDescription>הזמן הוא בשניות</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
          
              <div className="col-span-4">   
                <FormField
                  control={form.control}
                  name="ammo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תחמושת</FormLabel>
                      <FormControl>
                        <Input 
                        placeholder="0"
                        min="0"
                        step="1" 
                        type="number"
                        {...field} />
                      </FormControl>
                      <FormDescription>התחמושת היא בכדורים</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
          
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מרחק למטרה</FormLabel>
                      <FormControl>
                        <Input 
                        placeholder="0"
                        min="0"
                        step="1"
                        type="number"
                        {...field} />
                      </FormControl>
                      <FormDescription>המרחק הוא במטרים</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* text field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>הסבר על המקצה</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="הסבר"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>הסבר על המקצה</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* file upload */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">   
                <FormField
                  control={form.control}
                  name="range_img"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תמונת מקצה</FormLabel>
                      <FormControl>
                        <Input 
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
                      </FormControl>
                      <FormDescription>תמונה זו תוצג לצד המקצה</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
          
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="preview_img"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תמונת תצוגה מקדימה של מקצה</FormLabel>
                      <FormControl>
                        <Input 
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
                      </FormControl>
                      <FormDescription>תמונה זו תוצג לכניסת המקצה, אם לא תעלה תמונה זו אז תוצג תמונת מקצה</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
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
                    <FormDescription>מסתיר את המקצה ממשתמים</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        
        <AlertDialogFooter className="gap-2">
              <AlertDialogCancel>ביטול</AlertDialogCancel>
              <Button type="submit" form="myForm">המשך</Button>
            </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

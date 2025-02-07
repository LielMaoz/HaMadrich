import { revalidatePath } from 'next/cache';

// will revalidate the server-side cache, may throw error so use inside a try/catch block
export const revalidate = (url: string) => {
  const baseUrl = 'http://localhost:3000';
  
  revalidatePath(`${baseUrl}${url}`);
}

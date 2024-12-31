import { Drill } from "../lib/types";
import Image from 'next/image';

export function DrillCard(): JSX.Element {
        // Sample data
        const drill = {
          weaponType: 'רובה',
          name: 'רד חפה',
          rangeImg: '/images/homepage/dry-drill-exercises.png',
          previewImg: '/images/homepage/dry-drill-exercises.png',
          distance: 100,
          time: '1:00',
          ammo: 6,
          target: 'מטרת גוף/ פלאח',
          description: 'מתחילים במצב עמידה באחיז Low Ready, לאחר התקלה משחררים שני כדורים במצב כריעה אל עבר המטרה השמאלית, לאחר מכן חוזרים למצב עמידה.יש לבצע עבור שלוש המטרות.',
        };
        
//export function DrillCard({ drill }: { drill: Drill }): JSX.Element{
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100 text-black">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">{drill.name}</h1>
              
                <div className="flex flex-col md:flex-row items-center">
                  {/* exercise details */}
                  <div className="md:w-1/2 flex justify-center mb-4 md:mb-0 pl-4 pr-6 ">
                    <ul className="space-y-2">
                        <li><strong>טווח:</strong> {drill.distance} מטרים</li>
                        <li><strong>זמן:</strong> {drill.time}</li>
                        <li><strong>תחמושת:</strong> {drill.ammo} כדורים</li>
                        <li><strong>סוג מטרה:</strong> {drill.target}</li>
                        <li><strong>תיאור:</strong> {drill.description}</li>
                    </ul>
                </div>

                <div className="md:w-1/2 flex justify-center">
                  <Image
                    src={drill.rangeImg}
                    alt="תמונה של מגרש הירי"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-lg"
                  />
                  </div>
                </div>
              </div>
            </div>
          );
        }
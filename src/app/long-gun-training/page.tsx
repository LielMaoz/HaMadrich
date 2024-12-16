'use client'

import { useState } from 'react'
import { DrillCard } from '@/components/drill-card'
import { Drill } from '@/types/drill'

export default function LongGunTraining() {
  const [filteredDrills, setFilteredDrills] = useState<Drill[]>(longGunDrills)

  // function handleDrillClick(drill: Drill) {
  //   console.log(`Selected drill: ${drill.id} - ${drill.training_name}`)
  //   // Here you can add navigation to a detailed drill page if needed
  // }

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            אימון נשק ארוך
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            התמקצע בפעולות רובה מתקדמות ודיוק לטווח ארוך
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDrills.map((drill) => (
            <DrillCard key={drill.id} drill={drill} onClick={handleDrillClick} />
          ))}
        </div>

        {filteredDrills.length === 0 && (
          <p className="text-center text-xl text-zinc-600 mt-8">לא נמצאו תרגילי נשק ארוך.</p>
        )}
      </div>
    </div>
  )
}


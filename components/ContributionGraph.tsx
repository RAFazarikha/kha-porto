interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

export default function ContributionGraph({ weeks }: { weeks: Week[] }) {
  // Fungsi untuk menentukan level warna Tailwind berdasarkan jumlah kontribusi
  const getTailwindColor = (count: number) => {
    if (count === 0) return "bg-slate-800"; // Warna kotak kosong (belum ada kontribusi)
    if (count > 0 && count <= 3) return "bg-emerald-900"; // Sedikit kontribusi
    if (count > 3 && count <= 6) return "bg-emerald-700"; // Lumayan
    if (count > 6 && count <= 10) return "bg-emerald-500"; // Banyak
    return "bg-emerald-400"; // Sangat banyak (> 10)
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm text-slate-400 mb-3 font-semibold">Riwayat Kontribusi (1 Tahun Terakhir)</h3>
      
      {/* Container utama dengan horizontal scroll jika layar terlalu kecil */}
      <div className="flex gap-1 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700">
        
        {/* Looping untuk setiap minggu (kolom) */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            
            {/* Looping untuk setiap hari dalam minggu tersebut (baris) */}
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm transition-colors duration-200 hover:ring-1 hover:ring-white ${getTailwindColor(
                  day.contributionCount
                )}`}
                // Tooltip bawaan HTML saat kotak di-hover
                title={`${day.contributionCount} contributions on ${day.date}`}
              />
            ))}
            
          </div>
        ))}
        
      </div>
    </div>
  );
}
'use client';

export default function AdminDashboardPage() {
  return (
    <div className="mt-8 text-2xl font-bold text-red-600">
      adoptions page
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-center">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 aspect-square overflow-hidden rounded-lg shadow-md flex items-center justify-center">
              <img src="/Cat 1.jpeg" alt="Cat 1" className="w-full h-full object-cover"/>
            </div>
            <span className="mt-2 text-lg font-semibold">Name: Whiskers</span>
            <span className="mt-2 text-lg font-semibold">Age: 8yrs</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 aspect-square overflow-hidden rounded-lg shadow-md flex items-center justify-center">
              <img src="/Ham 1.jpg" alt="Ham 1" className="w-full h-full object-cover"/>
            </div>
            <span className="mt-2 text-lg font-semibold">Name: Hammy</span>
            <span className="mt-2 text-lg font-semibold">Age: 2yrs</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 aspect-square overflow-hidden rounded-lg shadow-md flex items-center justify-center">
              <img src="/LIzy 1.jpg" alt="Lizy 1" className="w-full h-full object-cover"/>
            </div>
            <span className="mt-2 text-lg font-semibold">Name: Lizy</span>
            <span className="mt-2 text-lg font-semibold">Age: 1yrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
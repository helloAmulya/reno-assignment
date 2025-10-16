import prisma from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
};

async function getSchools(): Promise<School[]> {
  const schools = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      image: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
  return schools;
}

export default async function ShowSchoolsPage() {
  const schools = await getSchools();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">School Portal</h1>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link href="/addSchool" className="text-gray-600 hover:text-indigo-600">Add School</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Schools</h2>
          <Link href="/addSchool">
            <div className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer">Add New School</div>
          </Link>
        </div>
        {schools.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Schools Found</h2>
            <p className="text-gray-500 mb-8">It looks like no schools have been added yet. Be the first to add one!</p>
            <Link href="/addSchool">
              <div className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105 cursor-pointer">Add a School</div>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {schools.map((school) => (
              <div key={school.id} className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-56 w-full">
                  <Image
                    src={school.image}
                    alt={`Image of ${school.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 truncate mb-2">{school.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{school.address}</p>
                  <p className="text-gray-600 text-sm">{school.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>


      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 School Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
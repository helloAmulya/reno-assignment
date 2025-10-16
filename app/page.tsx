
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">School Portal</h1>
          <nav className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
            <Link href="/addSchool" className="text-gray-600 hover:text-indigo-600 text-base md:text-lg font-medium transition-colors duration-300">Add School</Link>
            <Link href="/showSchools" className="text-gray-600 hover:text-indigo-600 text-base md:text-lg font-medium transition-colors duration-300">Show Schools</Link>
          </nav>
        </div>
      </header>


      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center flex-grow">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight">Welcome to the Future of School Management</h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto">Your one-stop solution for adding and viewing school information with ease.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/addSchool" className="inline-block bg-indigo-600 text-white py-3 px-6 md:px-8 rounded-full text-base md:text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg">Add a School</Link>
          <Link href="/showSchools" className="inline-block bg-gray-200 text-gray-800 py-3 px-6 md:px-8 rounded-full text-base md:text-lg font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-lg">View Schools</Link>
        </div>
      </main>


      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-900 mb-8">Developed as part of Reno Assignment by Amulya Ratna</h3>
        </div>
      </section>


      <footer className="bg-gray-800 text-white py-6 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base">&copy; 2025 School Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Inputs = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

export default function AddSchoolPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{message: string, type: "success" | "error"} | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    setFeedback(null);

    const imageFile = data.image[0];
    if (!imageFile) {
      setFeedback({ message: "Image is required.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imageUploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const imageResult = await imageUploadResponse.json();

      if (!imageUploadResponse.ok) {
        throw new Error(imageResult.error || "Image upload failed");
      }

      const imageUrl = imageResult.imagePath;

      const {  ...rest } = data;
      const schoolData = { ...rest, image: imageUrl };

      const schoolResponse = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schoolData),
      });

      const schoolResult = await schoolResponse.json();

      if (!schoolResponse.ok) {
        throw new Error(schoolResult.error || "Failed to create school");
      }

      setFeedback({ message: "School added successfully!", type: "success" });
      reset();
      setTimeout(() => router.push("/showSchools"), 2000);

    } catch (error: unknown) {
        if (error instanceof Error) {
            setFeedback({ message: error.message, type: "error" });
        } else {
            setFeedback({ message: "An unknown error occurred", type: "error" });
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">School Portal</h1>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link href="/showSchools" className="text-gray-600 hover:text-indigo-600">Show Schools</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">Add a New School</h1>
            {feedback && (
              <div className={`p-4 mb-6 text-base rounded-lg ${feedback.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {feedback.message}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                  <input id="name" {...register("name", { required: "School name is required" })} className="mt-1 block w-full p-3 bg-gray-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g. Springfield Elementary" />
                  {errors.name && <p className="text-red-600 text-xs mt-2">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input id="address" {...register("address", { required: "Address is required" })} className="mt-1 block w-full p-3 bg-gray-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="123 Main Street" />
                  {errors.address && <p className="text-red-600 text-xs mt-2">{errors.address.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input id="city" {...register("city", { required: "City is required" })} className="mt-1 block w-full p-3 bg-gray-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Springfield" />
                  {errors.city && <p className="text-red-600 text-xs mt-2">{errors.city.message}</p>}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input id="state" {...register("state", { required: "State is required" })} className="mt-1 block w-full p-3 bg-gray-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Illinois" />
                  {errors.state && <p className="text-red-600 text-xs mt-2">{errors.state.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input id="contact" type="tel" {...register("contact", { required: "Contact number is required" })} className="mt-1 block w-full p-3 bg-gray-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="555-1234" />
                  {errors.contact && <p className="text-red-600 text-xs mt-2">{errors.contact.message}</p>}
                </div>
                <div>
                  <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input id="email_id" type="email" {...register("email_id", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} className="mt-1 block w-full p-3 bg-gray-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="principal@example.com" />
                  {errors.email_id && <p className="text-red-600 text-xs mt-2">{errors.email_id.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">School Image</label>
                <input id="image" type="file" accept="image/*" {...register("image", { required: "Image is required" })} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer"/>
                {errors.image && <p className="text-red-600 text-xs mt-2">{errors.image.message}</p>}
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 transition-colors duration-300">
                  {isSubmitting && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  )}
                  {isSubmitting ? "Submitting..." : "Add School"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>


      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 School Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

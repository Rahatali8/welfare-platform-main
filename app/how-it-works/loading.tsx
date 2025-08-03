import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-8 w-32 mx-auto mb-6" />
            <Skeleton className="h-16 w-full mb-6" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Skeleton */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="space-y-12">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-8 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-full mb-6" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((_, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <Skeleton className="h-4 w-4 rounded-full mt-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-4 w-48 mt-6" />
                </div>
                <div>
                  <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

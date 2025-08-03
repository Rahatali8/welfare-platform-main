import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HelpLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Skeleton className="h-6 w-24 mx-auto mb-4 bg-blue-100" />
            <Skeleton className="h-12 w-96 mx-auto mb-6 bg-blue-100" />
            <Skeleton className="h-6 w-[600px] mx-auto mb-8 bg-blue-100" />
            <Skeleton className="h-12 w-[500px] mx-auto bg-blue-100" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Quick Help Skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Categories Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <Skeleton className="h-16 w-16 mb-4" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

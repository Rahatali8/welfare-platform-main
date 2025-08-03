import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FAQLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Skeleton className="h-6 w-16 mx-auto mb-4 bg-blue-100" />
            <Skeleton className="h-12 w-96 mx-auto mb-6 bg-blue-100" />
            <Skeleton className="h-6 w-[600px] mx-auto mb-8 bg-blue-100" />
            <Skeleton className="h-12 w-[500px] mx-auto bg-blue-100" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* FAQ Items Skeleton */}
            <div className="lg:col-span-3">
              <Skeleton className="h-6 w-64 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-5 w-5" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

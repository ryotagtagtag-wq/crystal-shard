import Link from "next/link"

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-semibold">
                Crystal Shard
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/dashboard/developer" 
                  className="{ /* アクティブ時のスタイル */ }"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                >
                  ダッシュボード
                </Link>
                <Link 
                  href="/docs" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  ドキュメント
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="pb-16">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </>
  )
}

import Link from "next/link"

export default function DeveloperDashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">開発者ダッシュボード</h1>
      <p className="mb-4">
        ここでアプリケーションを管理し、ポイントシステムの設定を行います。
      </p>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* アプリケーション統計カード */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">アプリケーション統計</h3>
          <div className="space-y-4">
            <p className="text-gray-500">総アプリケーション数: <span className="font-medium">0</span></p>
            <p className="text-gray-500">承認済みアプリケーション数: <span className="font-medium">0</span></p>
            <p className="text-gray-500">本日新規登録: <span className="font-medium">0</span></p>
          </div>
          <Link 
            href="/dashboard/developer/applications" 
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            アプリケーション管理を見る
          </Link>
        </div>
        
        {/* ポイント統計カード */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">ポイント統計</h3>
          <div className="space-y-4">
            <p className="text-gray-500">総ポイント発行量: <span className="font-medium">0</span></p>
            <p className="text-gray-500">本日発行ポイント: <span className="font-medium">0</span></p>
            <p className="text-gray-500">アクティブユーザー数: <span className="font-medium">0</span></p>
          </div>
          <Link 
            href="/dashboard/developer/points" 
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ポイント詳細を見る
          </Link>
        </div>
        
        {/* セキュリティ状況カード */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">セキュリティ状況</h3>
          <div className="space-y-4">
            <p className="text-gray-500">不正アクセス試行: <span className="font-medium">0</span></p>
            <p className="text-gray-500">ブロックされたIP: <span className="font-medium">0</span></p>
            <p className="text-gray-500">平均応答時間: <span className="font-medium">0ms</span></p>
          </div>
          <Link 
            href="/dashboard/developer/security" 
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            セキュリティレポートを見る
          </Link>
        </div>
      </div>
    </>
  )
}

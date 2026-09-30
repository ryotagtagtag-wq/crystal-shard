export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Crystal Shard
          </h1>
          <p className="mt-4 text-center text-gray-600">
            アプリケーションにポイントシステムを簡単・安全に組み込む
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/dashboard/developer" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              開発者はこちら
            </a>
            <a 
              href="/docs" 
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              ドキュメントを見る
            </a>
          </div>
        </div>
      </header>
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Crystal Shardとは</h2>
            <p className="text-gray-600">
              Crystal Shardは、任意のウェブアプリケーションにポイント・クレジットシステムを
              簡単かつ安全に組み込むためのプラットフォームです。Next.jsとVercelを使用した
              フルスタックソリューションにより、アプリケーション開発者はポイント管理の
              煩雑さから解放され、コア機能に集中できます。
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">主な特徴</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">シンプルな統合</h3>
                <p className="text-gray-600">
                  アプリケーションのバックエンドから安全にAPIを呼び出すだけで、
                  ポイントの付与・消費・残高確認が可能です。
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">高度なセキュリティ</h3>
                <p className="text-gray-600">
                  アプリケーションシークレットは決してクライアントに露出せず、
                  HMAC-SHA256署名によるリクエスト正当性検証を実装しています。
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">柔軟なボーナスシステム</h3>
                <p className="text-gray-600">
                  デイリーログインボーナス、達成ボーナス、紹介ボーナスなど、
                  カスタマイズ可能なボーナス機能を標準装備しています。
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">始め方</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>開発者ダッシュボードでアプリケーションを登録</li>
              <li>承認後、アプリケーションIDとシークレットを取得</li>
              <li>アプリケーションのバックエンドでシークレットを環境変数に設定</li>
              <li>APIを呼び出してポイントシステムを統合</li>
            </ol>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2026 Crystal Shard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

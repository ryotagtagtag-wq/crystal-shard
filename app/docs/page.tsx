export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">ドキュメント</h1>
          <nav className="mt-4 flex space-x-4 text-sm font-medium">
            <a 
              href="/docs/getting-started" 
              className="text-blue-600 hover:text-blue-800"
            >
              始め方
            </a>
            <a 
              href="/docs/api-reference" 
              className="text-gray-600 hover:text-gray-800"
            >
              APIリファレンス
            </a>
            <a 
              href="/docs/security-guide" 
              className="text-gray-600 hover:text-gray-800"
            >
              セキュリティガイド
            </a>
            <a 
              href="/docs/integration-examples" 
              className="text-gray-600 hover:text-gray-800"
            >
              統合例
            </a>
          </nav>
        </div>
      </header>
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose lg:prose-xl bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Crystal Shard ドキュメントへようこそ</h1>
            <p className="text-gray-600">
              ここではCrystal Shardの使用方法について詳しく説明しています。
              各セクションを順に読み進めるか、興味のあるトピックからお読みください。
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">はじめに</h2>
            <p className="text-gray-600">
              Crystal Shardは、アプリケーションにポイントシステムを組み込むための
              安全で簡単なプラットフォームです。アプリケーションシークレットを
              クライアントに露出させることなく、ポイントの付与・消費・管理が可能です。
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">セキュリティについて</h2>
            <p className="text-gray-600">
              Crystal Shardのセキュリティモデルは以下の原則に基づいています：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>アプリケーションシークレットは決してクライアントサイドに露出しない</li>
              <li>すべてのAPIリクエストはHMAC-SHA256署名による正当性検証が必要</li>
              <li>リプレイ攻撃を防止するためノンスとタイムスタンプを使用</li>
              <li>レート制限により不正なトラフィックを防止</li>
              <li>信頼スコアシステムにより不審なアプリケーションを制限</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">次のステップ</h2>
            <p className="text-gray-600">
              実際の統合方法については、
              <a href="/docs/integration-examples" className="text-blue-600 hover:text-blue-800 underline">
                統合例セクション
              </a>
              をご参照ください。ここでは様々なフレームワーク・プラットフォームでの
              具体的な実装方法をサンプルコードとともに説明しています。
            </p>
          </article>
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

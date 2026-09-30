export default function UserDashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">ポイントダッシュボード</h1>
      <p className="mb-4">
        ここではあなたのポイント残高と取引履歴を確認できます。
      </p>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* 残高サマリー */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">ポイント残高</h3>
          <div className="space-y-4">
            <p className="text-gray-500">合計ポイント: <span className="text-2xl font-bold">0</span> ポイント</p>
            <p className="text-gray-500">本日獲得: <span className="font-medium">0</span> ポイント</p>
            <p className="text-gray-500">本日消費: <span className="font-medium">0</span> ポイント</p>
          </div>
        </div>
        
        {/* 最近の取引 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">最近の取引</h3>
          <div className="space-y-4">
            <p className="text-gray-500">取引データがありません</p>
          </div>
        </div>
        
        {/* ボーナス状況 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">獲得可能ボーナス</h3>
          <div className="space-y-4">
            <p className="text-gray-500">デイリーボーナス: <span className="font-medium">未獲得</span></p>
            <p className="text-gray-500">達成ボーナス: <span className="font-medium">0/5 達成</span></p>
            <p className="text-gray-500">紹介ボーナス: <span className="font-medium">0人紹介</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

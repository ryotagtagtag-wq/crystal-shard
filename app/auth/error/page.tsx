export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">エラーが発生しました</h1>
        <p className="mt-4 text-gray-600">
          申し訳ございません。予期しないエラーが発生しました。
          しばらく時間をおいて再度お試しください。
        </p>
        <a 
          href="/" 
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ホームに戻る
        </a>
      </div>
    </div>
  )
}

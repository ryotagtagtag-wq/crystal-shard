import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <Image 
          src="/logo.png" 
          alt="Crystal Shard Logo" 
          width={120} 
          height={120} 
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Crystal Shard
        </h1>
        <p className="text-center text-gray-600">
          アプリケーションにサインインしてポイントを管理
        </p>
        <button
          onClick={() => signIn("firebase", { callbackUrl: "/dashboard/user" })}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Firebaseでサインイン
        </button>
        <p className="text-xs text-gray-500 text-center">
          デモ目的のため、Firebase認証は簡略化されています。実際の実装では
          適切なFirebaseプロジェクト設定が必要です。
        </p>
      </div>
    </div>
  )
}

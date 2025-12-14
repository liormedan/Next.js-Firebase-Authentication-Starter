"use client";

export default function DebugPage() {
  const envVars = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const allSet = Object.values(envVars).every(
    (val) => val && !val.includes("your_") && val.trim() !== ""
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Firebase Configuration Debug
          </h1>

          <div
            className={`p-4 rounded-lg mb-6 ${
              allSet
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            <p className="font-semibold">
              {allSet
                ? "✅ All environment variables are set!"
                : "❌ Some environment variables are missing or invalid"}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Environment Variables Status:
            </h2>
            {Object.entries(envVars).map(([key, value]) => {
              const isValid =
                value && !value.includes("your_") && value.trim() !== "";
              return (
                <div
                  key={key}
                  className={`p-4 rounded border ${
                    isValid
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {key}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        isValid
                          ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                          : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {isValid ? "✓ Set" : "✗ Missing"}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-gray-600 dark:text-gray-400 break-all">
                    {value || "(empty)"}
                  </div>
                </div>
              );
            })}
          </div>

          {!allSet && (
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                How to Fix:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Create a file named <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.env.local</code> in the root directory
                </li>
                <li>
                  Add your Firebase configuration (get it from{" "}
                  <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    Firebase Console
                  </a>
                  )
                </li>
                <li>Restart your development server</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


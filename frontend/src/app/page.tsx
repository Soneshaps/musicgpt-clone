export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-6">MusicGPT</h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered voice and music generation platform
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <p className="text-gray-700">
            Welcome to MusicGPT! This is a simple placeholder page. More
            features will be added soon.
          </p>
        </div>
      </main>

      <footer className="w-full p-4 border-t border-gray-200 text-center text-gray-600">
        <p>© {new Date().getFullYear()} MusicGPT - All rights reserved</p>
      </footer>
    </div>
  );
}

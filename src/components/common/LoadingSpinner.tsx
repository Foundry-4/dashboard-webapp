export const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-600" />
    </div>
  </div>
); 
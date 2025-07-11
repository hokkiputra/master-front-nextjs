export default function AuthSessionStatus({
  status,
  className = '',
}: {
  status: string | null
  className?: string
}) {
  return status ? (
    <div className={`mb-4 font-medium text-sm text-green-600 ${className}`}>
      {status}
    </div>
  ) : null
}

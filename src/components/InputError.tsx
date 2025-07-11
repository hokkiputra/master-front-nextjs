export default function InputError({ messages }: { messages?: string[] }) {
  return (
    <>
      {messages && messages.length > 0 && (
        <div className="text-sm text-red-600 mt-1">
          {messages.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}
    </>
  )
}

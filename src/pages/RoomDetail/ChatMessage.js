export default function ChatMessage({ sender, message }) {
  return (
    <>
      {sender ? (
        <div className="flex justify-end">
          <p className="text-left text-base p-2 w-max max-w-[75%] rounded-lg bg-[#ffd803]">{message}</p>
        </div>
      ) : (
        <div className="flex flex-start">
          <p className="text-left text-base p-2 w-max max-w-[75%] rounded-lg bg-[#fffffe]">{message}</p>
        </div>
      )}
    </>
  );
}

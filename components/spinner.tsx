export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="size-6 animate-spin rounded-full border-[3px] border-solid border-custom-blue border-t-transparent"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  )
}

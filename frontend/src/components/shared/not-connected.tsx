type NotConnectedProps = {
  message: string
}

const NotConnected = ({ message }: NotConnectedProps) => {
  return (
    <div className="h-screen flex flex-col items-center py-36">
      <h1 className="text-3xl font-bold text-white">Not connected</h1>
      <p className="text-white">{message}</p>
    </div>
  )
}

export default NotConnected

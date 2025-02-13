export default function Marketplace() {
  return (
    <div className="w-full h-screen bg-stone-700 p-6 flex flex-row gap-16">
      <div className="w-1/2 flex flex-col gap-16">
        <div className="w-full flex flex-col gap-4">
          <h2>Recent collections :</h2>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <p>Collection 1</p>
                <p className="text-sm">by Nathe</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p>Collection 2</p>
                <p className="text-sm">by Nathe</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p>Collection 3</p>
                <p className="text-sm">by Nathe</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <h2>History :</h2>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <p>Collection 1</p>
                <p className="text-sm">by Nathe</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p>Collection 2</p>
                <p className="text-sm">by Nathe</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p>Collection 3</p>
                <p className="text-sm">by Nathe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-16">
        <h2>Best selling sample of the day :</h2>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <p>Collection 1</p>
              <p className="text-sm">by Nathe</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Collection 2</p>
              <p className="text-sm">by Nathe</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Collection 3</p>
              <p className="text-sm">by Nathe</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

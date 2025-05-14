import Link from "next/link"

const Footer = () => {
  return (
    <footer className="w-screen h-72 flex flex-row justify-between bg-stone-800 p-10 px-48">
      <div className="w-3/4 flex flex-col justify-start gap-6">
        <div>
          <h1><strong>Omegaloops</strong></h1>
          <p>Transforming the sample industry by enabling tokenization and trading of audio samples</p>
        </div>
        <div className="w-full flex flex-row px-4">
          <div className="w-1/6 flex flex-col gap-2">
            <Link href="/">Home</Link>
            <Link href="/marketplace">Marketplace</Link>
            <Link href="/whitepaper">Whitepaper</Link>
          </div>
          <div className="w-1/6 flex flex-col gap-2">
            <Link href="/">About</Link>
            <Link href="/">FAQ</Link>
            <Link href="/">Blog</Link>
          </div>
          <div className="w-1/6 flex flex-col gap-2">
            <Link href="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-full flex justify-end items-end">
        <p>&copy; Omageloops {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer

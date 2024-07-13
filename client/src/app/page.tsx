import Link from "next/link";
import Image from "next/image"; import ToggleTheme from "@/components/ToggleTheme";
import logo from "@/assets/logo_1.svg"

export default function Home() {
  return (
    <div className="px-5 bg-white text-black">
      <nav className="flex justify-between items-center mt-5 px-8">
        <div className="relative left-20">
          <Image src={logo} alt="Facottry Logo" width={100} height={100} />
        </div>
        <div className="flex gap-2 items-center">
          <ul className="flex gap-2">
            <ToggleTheme />
            <Link
              href="/auth/login"
              className="font-semibold hover:bg-gray-100 transition-all border rounded-md p-2 text-primary600"
            >
              Login
            </Link>
            <Link
              href="/dashboard/home"
              className="font-semibold hover:bg-gray-100 transition-all border rounded-md p-2 text-primary600"
            >
              Dashboard
            </Link>
          </ul>
        </div>
      </nav>
      <div className="flex flex-row justify-center items-center p-10">
        <div className="max-w-xl text-left">
        <h1 className="relative text-6xl font-bold text-left" style={{ top: '-100px' }}>Welcome to Facottry Analytics</h1>
          <p className="relative text-lg mt-3 text-gray-400 text-left" style={{ top: '-100px' }}>
            Facottry Analytics is a dashboard that helps you to monitor your factory activities.
          </p>
        </div>
        <div className="relative bottom-20 m-10" style={{right:'-100px'}}>
          <img src="https://img.freepik.com/free-vector/site-stats-concept-illustration_114360-1434.jpg" alt="Factory Image" width={500} height={500} />
        </div>
      </div>
    </div>
  );
}

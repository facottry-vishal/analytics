import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-5">
      <nav className="flex justify-between items-center mt-5">
        <div>
          <h1 className="font-bold text-xl">Facottry Analytics</h1>
        </div>

        <div className="flex gap-2 items-center">
          <ul className="flex gap-2">
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

      <hr className="my-5" />

      <div className="flex">
        <div>
          <h1 className="text-3xl font-bold">Welcome to Facottry Analytics</h1>
          <p className="text-lg mt-3">
            Facottry Analytics is a dashboard that helps you to monitor your
            factory activities.
          </p>
        </div>
      </div>
    </div>
  );
}

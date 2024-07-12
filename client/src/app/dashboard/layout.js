import { axios_analytics } from "@/lib/axios";
import { redirect } from "next/navigation";

const checkAuth = async () => {
  try {
    const response = await axios_analytics.get("/");
    console.log(response.data);
    return { isAuthenticated: true, user: response.data}
  } catch (error) {
    console.log(error.response.data);
    return { isAuthenticated: false, user: null }
  }
};

const getAdmin = async () => {
  try {
    const response = await axios_analytics.get("/get-admin");
    return response;
  } catch (error) {
    return error.response;
  }
}

export default async function DashboardLayout({ children }) {
  // const isAuth = await checkAuth();
  const isAuthenticated = true;
  // const admin = await getAdmin();

  if (!isAuthenticated) {
    return <main>Unauthorized</main>;
  } else {
    return <main>{children}</main>;
  }
}
import { redirect } from "next/navigation";
import { loginStatus } from "@/app/_data/loginStatus";

// force user to login if they do not login yet
export const checkLoginStatus = () => {
  let isLogin = loginStatus;

  if(isLogin) return;
  redirect('/login')
}

export const goToDashboard = () => {
  let isLogin = loginStatus;

  if(!isLogin) return;
  redirect('/')
}
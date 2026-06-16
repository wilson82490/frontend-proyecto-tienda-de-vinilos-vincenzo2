import { redirect } from "react-router-dom";

function adminLoader() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return redirect("/auth/login");
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return redirect("/auth/login");
  }

  if (!user) {
    return redirect("/auth/login");
  }

  if (!user.admin) {
    return redirect("/");
  }
}

export default adminLoader;

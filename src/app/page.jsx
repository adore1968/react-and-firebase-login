"use client";
import Loader from "@/components/Loader";
import UserCard from "@/components/UserCard";
import { useAppContext } from "@/context/AppContext";

function HomePage() {
  const { isLoading, user } = useAppContext();

  if (isLoading) return <Loader />;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <UserCard user={user} />
    </section>
  );
}

export default HomePage;

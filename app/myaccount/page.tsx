'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { fetchData } from "../requests";
import { useAuth } from "../providers/AuthProviderClient";
import { Boxes, Loader2, UserIcon } from "lucide-react";
import Profilecard, { UserType } from "../components/profilecard";
import OrdersCard from "../components/ordersCard";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [data, setData] = useState<UserType>({
    username:''
  });
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchData("userInfo", {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => {
      setData(response as UserType);
      setIsLoading(false);
    });
  }, [token]);

  const navItems = [
    { label: "Profile", icon: UserIcon },
    { label: "Orders", icon: Boxes },
  ];

 

  const leftSideItems = [Profilecard, OrdersCard];
  const ActiveComponent = leftSideItems[index];

  return (
    <div className="min-h-screen flex items-start justify-between bg-muted px-4 py-5">
      <div className="flex-grow mr-4">
        {isLoading ? (
          <Loader2 className="animate-spin" size={32} />
        ) : (
          <ActiveComponent data={data} />
        )}
      </div>

      <aside className="p-5 w-1/5">
        {navItems.map((item, idx) => (
          <div
            key={item.label}
            onClick={() => setIndex(idx)}
            className={cn("w-full p-5 flex justify-start items-center cursor-pointer hover:bg-gray-300 ", index==idx ? "bg-gray-300" : "bg-white")}
          >
            <item.icon />
            <p className="mx-2"> {item.label}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}

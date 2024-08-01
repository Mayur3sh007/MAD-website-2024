"use client";

import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useTheme } from "next-themes";
import ProtectionProvider from "@/providers/ProtectionProvider";
import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import MobileHeader from "@/components/Mobile-Header";

export default function Home({
  admin,
  committee,
  hod,
  principal,
  student,
  railway,
  examdept
}: {
  admin: React.ReactNode;
  committee: React.ReactNode;
  hod: React.ReactNode;
  principal: React.ReactNode;
  student: React.ReactNode;
  railway: React.ReactNode;
  examdept:React.ReactNode;
}) {
  const { theme } = useTheme();
  const { user } = useUser();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async ({ uid }: { uid: string }) => {
      const officailLoginRef = doc(db, "OfficialLogin", uid);
      const docSnap = await getDoc(officailLoginRef);
      setUserType(docSnap.data()?.type);
    };

    fetchUserType({ uid: user?.uid || "" });
  }, []);

  return (
    <ProtectionProvider>
      <div className={`min-h-screen w-full ${theme}`}>
        <Header userType={userType ? userType : ""} />
        <MobileHeader userType={userType ? userType : ""} />
        <div className="min-h-screen flex flex-col mt-4">
          {userType == "admin" && admin}
          {userType == "committee" && committee}
          {userType == "hod" && hod}
          {userType == "principal" && principal}
          {userType == "student" && student}
          {userType == "railway" && railway}
          {userType == "examdept" && examdept}
        </div>
      </div>
    </ProtectionProvider>
  );
}

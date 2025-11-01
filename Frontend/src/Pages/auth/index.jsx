import React from "react";
import authImg from "@assets/auth/auth.jpg";
import { Link } from "react-router-dom";
import AuthSwitcher from "./components/AuthSwitcher";

export default function Auth() {
  return (

    <div className="min-h-screen w-full flex flex-col bg-white overflow-x-hidden">
      <main className="flex-1">
        <div className="w-full mx-auto flex flex-col md:flex-row">
          {/* LEFT column */}
          <section className="flex-1 px-5 pt-12 md:px-12 lg:px-8 xl:px-0 xl:pl-[70px]">
            <Link to="/welcome" className="w-max">
              <div className="flex h-fit w-fit items-center hover:cursor-pointer">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997Z" fill="#A3AED0"/>
                </svg>
                <p className="ml-3 text-sm text-gray-600">Back to Dashboard</p>
              </div>
            </Link>

            
            <div className="mt-4 rounded-lg mr-10 px-4">
              <AuthSwitcher />
            </div>
          </section>

          {/* RIGHT image (hidden on small screens) */}
          <aside className="hidden md:block basis-[42vw] 2xl:basis-[44vw]">
            <div
              className="h-screen min-h-full bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
              style={{ backgroundImage: `url(${authImg})` }}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

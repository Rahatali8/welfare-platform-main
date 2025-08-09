


import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/components/providers/auth-provider";
import { useState } from "react";
import { User, BadgeCheck, IdCard, ShieldCheck, UserCircle } from "lucide-react";

// Utility to generate a pastel color from a string
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 80%)`;
}

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  // Get first letter of name for fallback
  const initial = user.fullName?.charAt(0)?.toUpperCase() || "U";
  const cnic = user.cnic || "N/A";

  return (
    <>
      <button
        className="flex items-center focus:outline-none rounded-full p-0.5 transition"
        onClick={() => setOpen(true)}
        style={{ background: stringToColor(user.fullName || user.cnic || "U") }}
      >
        <Avatar>
          <AvatarFallback
            className="text-lg md:text-xl"
            style={{ background: stringToColor(user.fullName || user.cnic || "U") }}
          >
            {initial}
          </AvatarFallback>
        </Avatar>
      </button>

      {/* Sliding Card */}

      <div
        className={`fixed top-0 right-0 h-full w-80 z-[9999] bg-gray-100 transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: "-4px 0 24px 0 rgba(0,0,0,0.08)" }}
      >
        <div className="relative flex flex-col items-center p-0 h-full">
          {/* VIP Card Content */}
          <div className="w-full max-w-xs rounded-2xl shadow-lg mt-10 mb-4 flex flex-col items-center overflow-visible relative" style={{paddingTop: 0, background: 'transparent'}}>
            {/* Close button inside card */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-20 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow transition"
              aria-label="Close profile card"
            >
              &times;
            </button>
            {/* Blue Top Section */}
            <div className="w-full h-24 bg-blue-600 rounded-t-2xl flex justify-center items-center relative">
              {/* Avatar Overlapping */}
              <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 z-10">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarFallback
                    className="text-3xl"
                    style={{ background: stringToColor(user.fullName || user.cnic || "U") }}
                  >
                    {initial}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            {/* Details Section */}
            <div className="flex flex-col pt-14 pb-6 px-4 w-full">
              <div className="font-bold text-2xl text-gray-900 mb-1 flex items-center gap-2">
                <UserCircle className="w-6 h-6 text-blue-600" />
                {user.fullName}
              </div>
              <div className="text-sm text-gray-500 mb-2 capitalize flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                {user.role}
              </div>
              <div className="w-full border-b border-gray-200 my-2"></div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-3 text-base text-gray-700">
                  <IdCard className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500">CNIC Number</div>
                    <div className="font-mono font-semibold tracking-wider">{cnic}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-base text-gray-700">
                  <BadgeCheck className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-xs text-gray-500">Account Status</div>
                    <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">Active</span>
                  </div>
                </div>
                {/* Add more fields if available in user object */}
                {user.address && (
                  <div className="flex items-center gap-3 text-base text-gray-700">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                    <div>
                      <div className="text-xs text-gray-500">Address</div>
                      <div className="font-medium">{user.address}</div>
                    </div>
                  </div>
                )}
                {user.city && (
                  <div className="flex items-center gap-3 text-base text-gray-700">
                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4.5 8-10V5a2 2 0 00-2-2H6a2 2 0 00-2 2v7c0 5.5 8 10 8 10z" /></svg>
                    <div>
                      <div className="text-xs text-gray-500">City</div>
                      <div className="font-medium">{user.city}</div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={logout}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-lg shadow"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for closing */}
      {open && (
        <div
          className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

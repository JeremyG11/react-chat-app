import React from "react";

export default function ChatUsersList() {
  return (
    <div className="my-4 border-r">
      <ul className="max-w-md divide-y divide-gray-200 ">
        <li className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-600 truncate">
                Nyagoa John
              </p>
              <p className="text-xs text-gray-500 truncate">nyagoa@gmail.com</p>
            </div>
            <div className="inline-flex items-center text-xs font-medium text-gray-500">
              1:44 PM
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

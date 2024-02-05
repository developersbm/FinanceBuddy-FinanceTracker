import React from "react";

export default function Home() {
  return (
    <div>
      <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">BudgetBuddy</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Home</a></li>
          <li><a>Home</a></li>
          <li>
            <details>
              <summary>
                Account
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}

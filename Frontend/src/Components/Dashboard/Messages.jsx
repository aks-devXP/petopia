import React, { useState } from "react";

const Messages = () => {
  const [checkedItems, setCheckedItems] = useState({
    emailReminder: false,
    phoneReminder: false,
    callReminder: false,
    promotions: false,
    news: false,
  });

  const handleCheckboxChange = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the checkbox value
    }));
  };

  return (
    <div className='bg-n-6 p-6 rounded-3xl shadow'>
      <h2 className='text-2xl font-semibold mb-6'>Messages Preferences</h2>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checkedItems.emailReminder}
            onChange={() => handleCheckboxChange("emailReminder")}
            className="w-5 h-5"
          />
          <span className={checkedItems.emailReminder ? "font-bold" : ""}>Email Reminder</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checkedItems.phoneReminder}
            onChange={() => handleCheckboxChange("phoneReminder")}
            className="w-5 h-5"
          />
          <span className={checkedItems.phoneReminder ? "font-bold" : ""}>Message Reminder</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checkedItems.callReminder}
            onChange={() => handleCheckboxChange("callReminder")}
            className="w-5 h-5"
          />
          <span className={checkedItems.callReminder ? "font-bold" : ""}>Call Reminder</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checkedItems.promotions}
            onChange={() => handleCheckboxChange("promotions")}
            className="w-5 h-5"
          />
          <span className={checkedItems.promotions ? "font-bold" : ""}>Promotions and Offers</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checkedItems.news}
            onChange={() => handleCheckboxChange("news")}
            className="w-5 h-5"
          />
          <span className={checkedItems.news ? "font-bold" : ""}>Latest News</span>
        </label>

        <div className='mt-5 cursor-pointer bg-n-6 border-2 w-fit px-5 py-2 hover:bg-black rounded-full'>
          <button className='text-lg'>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;

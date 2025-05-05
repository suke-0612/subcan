import React from "react";

interface GoogleCalendarButtonProps {
  title: string;
  description?: string;
  location?: string;
  startTime: Date;
  endTime: Date;
}

const formatDate = (date: Date): string => {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
};

const GoogleCalendarButton: React.FC<GoogleCalendarButtonProps> = ({
  title,
  description,
  location,
  startTime,
  endTime,
}) => {
  const handleClick = () => {
    const baseUrl = "https://www.google.com/calendar/render";
    const details = {
      action: "TEMPLATE",
      text: title,
      dates: `${formatDate(startTime)}/${formatDate(endTime)}`,
      details: description || "",
      location: location || "",
    };

    const query = new URLSearchParams(details).toString();
    const url = `${baseUrl}?${query}`;
    window.open(url, "_blank");
  };

  return (
    <button
      style={{
        backgroundColor: "white",
        border: "3px solid #3C6E71",
        borderRadius: "7px ",
        width: 300,
        height: 40,
        fontSize: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Googleカレンダーに追加
    </button>
  );
};

export default GoogleCalendarButton;

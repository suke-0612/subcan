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
      onClick={handleClick}
      style={{
        backgroundColor: "#3C6E71",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
      onMouseOver={(e) =>
        ((e.target as HTMLButtonElement).style.backgroundColor = "#345c5e")
      }
      onMouseOut={(e) =>
        ((e.target as HTMLButtonElement).style.backgroundColor = "#3C6E71")
      }
    >
      Googleカレンダーに追加
    </button>
  );
};

export default GoogleCalendarButton;

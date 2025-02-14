import CarPermitManagementComponent from "../components/CarPermitManagement/CarPermitManagementComponent";

// Events data
const events = [
  {
    eventName: "Event 1",
    eventCode: "E001",
    eventYear: "2025",
    eventStartDate: "2-march",
    eventEndDate: "5-march",
  },
  {
    eventName: "Event 2",
    eventCode: "E002",
    eventYear: "2025",
    eventStartDate: "10-march",
    eventEndDate: "15-march",
  },
  {
    eventName: "Event 3",
    eventCode: "E003",
    eventYear: "2025",
    eventStartDate: "18-march",
    eventEndDate: "20-march",
  },
];

export default function CarPermitManagementPage() {
  return (
    <>
      <CarPermitManagementComponent events={events} />
    </>
  );
}

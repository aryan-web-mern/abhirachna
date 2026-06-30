import moment from "moment";
import { data } from "react-router-dom";

const keyToTitleMap = {
  requirements: "Job Requirements",
  responsibilities: "Responsibilities",
  perksAndBenefits: "Perks and Benefits",
  bonus: "Bonus",
};

// export const jobDetailsData = (dataFromBackend) => {
// 	const data = Object.entries(dataFromBackend)
// 		.filter(([key]) => Object.keys(keyToTitleMap).includes(key))
// 		.map(([key, value]) => {
// 			if (value.length > 0) {
// 				return {
// 					title: keyToTitleMap[key] || key,
// 					description: value
// 				}
// 			}
// 			return null;
// 		}
// 		);
// 	const extraFields = [ dataFromBackend?.jobLocation ? {
// 		title: "📍",
// 		details: [
// 			dataFromBackend?.jobLocation
// 		],
// 		description: [],
// 	} : null,
// 	dataFromBackend?.salary ?
// 	{
// 		title: "💰",
// 		details: [dataFromBackend?.salary],
// 		description: [],
// 	} : null]
// 	data.push(...extraFields)
// 	return data;
// }

export const getfuture7Dates = () => {
  const next7Days = Array.from({ length: 7 }, (_, i) =>
    moment().add(i, "days").format("ddd  DD MMM")
  );
  return next7Days;
};

export const getTimeList = () => {
  const now = moment();
  const minutes = now.minutes();
  const remainder = minutes % 30 === 0 ? 0 : 30 - (minutes % 30);
  const nextSlot = now
    .clone()
    .add(remainder, "minutes")
    .set({ second: 0, millisecond: 0 });

  const nineAM = moment().set({
    hour: 9,
    minute: 30,
    second: 0,
    millisecond: 0,
  });
  const sixPM = moment().set({
    hour: 18,
    minute: 30,
    second: 0,
    millisecond: 0,
  });

  const startTime = moment.max(nextSlot, nineAM);
  const endTime = sixPM;

  const timeSlots = [];
  let current = startTime.clone();

  while (current <= endTime) {
    timeSlots.push(current.format("hh:mm A"));
    current.add(30, "minutes");
  }

  return timeSlots;
};

export const times = [
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
];

export const apartmentSizeRanges = {
  StudioRoom: [
    { id: 1, label: "300 sq ft-350 sq ft", value: "300-350" },
    { id: 2, label: "350 sq ft-400 sq ft", value: "351-400" },
    { id: 3, label: "400 sq ft-450 sq ft", value: "401-450" },
    { id: 4, label: "I Am Not Sure", value: "300-450" },
  ],
  "1BHK": [
    { id: 1, label: "450 sq ft-500 sq ft", value: "450-500" },
    { id: 2, label: "500 sq ft-550 sq ft", value: "501-550" },
    { id: 3, label: "550 sq ft-600 sq ft", value: "551-600" },
    { id: 4, label: "I Am Not Sure", value: "450-600" },
  ],
  "2BHK": [
    { id: 1, label: "600 sq ft-700 sq ft", value: "600-700" },
    { id: 2, label: "700 sq ft-800 sq ft", value: "701-800" },
    { id: 3, label: "800 sq ft-900 sq ft", value: "801-900" },
    { id: 4, label: "I Am Not Sure", value: "600-900" },
  ],
  "3BHK": [
    { id: 1, label: "900 sq ft-1100 sq ft", value: "900-1100" },
    { id: 2, label: "1100 sq ft-1300 sq ft", value: "1101-1300" },
    { id: 3, label: "1300 sq ft-1500 sq ft", value: "1301-1500" },
    { id: 4, label: "1500 sq ft-1700 sq ft", value: "1501-1700" },
    { id: 4, label: "1500 sq ft-1700 sq ft", value: "1501-1700" },
    { id: 4, label: "1700 sq ft-1900 sq ft", value: "1701-1900" },
    // { id: 5, label: "1300 sq ft-1400 sq ft", value: "1301-1400" },
    { id: 6, label: "I Am Not Sure", value: "900-1400" },
  ],
  "4+BHK": [
    { id: 1, label: "1400 sq ft-1600 sq ft", value: "1400-1600" },
    { id: 2, label: "1600 sq ft-1800 sq ft", value: "1601-1800" },
    { id: 3, label: "1800 sq ft-2000 sq ft", value: "1801-2000" },
    { id: 4, label: "2000 sq ft-2200 sq ft", value: "2001-2200" },
    { id: 5, label: "I Am Not Sure", value: "1400-2200" },
  ],
  PENTHOUSE: [
    { id: 1, label: "2200 sq ft-2500 sq ft", value: "2200-2500" },
    { id: 2, label: "2500 sq ft-2800 sq ft", value: "2501-2800" },
    { id: 3, label: "2800 sq ft-3100 sq ft", value: "2801-3100" },
    { id: 4, label: "3100 sq ft-3500 sq ft", value: "3101-3500" },
    { id: 5, label: "I Am Not Sure", value: "2200-3500" },
  ],
};

export const JobDetailDataSet = [
  { key: "requirements", label: "Job Requirements" },
  { key: "responsibilities", label: "Responsibilities" },
  { key: "perksAndBenefits", label: "Perks & Benefits" },
  { key: "bonus", label: "Bonus" },
  { key: "jobLocation", label: "Salary & Location" },
];

export const SalaryLocDataSet = [
  { key: "jobLocation", label: "Location", icon: "📍" },
  { key: "salary", label: "Salary", icon: "💰" },
];

export const getEstQueSerial = [
  "Flooring Work",
  "Wall Tiles Work",
  "Door & Windows",
  "False Ceiling Work",
  "Electrical Work",
  "Wooden Work",
  "Wall Treatments",
  "Paint Work",
  "Plumbing & Sanitory Work",
  "Decore / Curtains",
];

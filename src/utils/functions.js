const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const bucketUrl = import.meta.env.VITE_BUCKET_URL;

export const showImageUrl = (image) => {
  return `${bucketUrl}?key=${image}`;
};

export function testimonialsGridChunk(data) {
  const chunkPattern = [6, 2, 6];
  const result = [];
  let i = 0;
  let patternIndex = 0;
  const dataa = data.filter((d) => d?.image || d?.text || d?.video);
  let obj = {};
  while (i < dataa.length) {
    let size = chunkPattern[patternIndex % chunkPattern.length];
    // If not enough items left for a full chunk, just take the rest
    if (i + size > dataa.length) {
      break;
    }

    result.push(dataa.slice(i, i + size));
    i += size;
    patternIndex++;
  }
  const newArr = [];
  for (let i = 0; i < result.length; i += 3) {
    newArr.push(result.slice(i, i + 3));
  }
  return newArr;
}

export function setAwsImageURL(url) {
  return `${apiBaseUrl}/s3/getimage?key=${url}`;
}

export const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};

export const blockKeys = (e) => {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (keysToBlock.includes(e.key)) {
    e.preventDefault();
  }
};

// To get formatted time
export const getFormattedTime = (isoString) => {
  const date = new Date(isoString);

  // Get UTC time in milliseconds
  const utcMillis = date.getTime() + date.getTimezoneOffset() * 60000;

  // Add IST offset: 5 hours 30 minutes = 330 minutes
  const istMillis = utcMillis + 330 * 60000;

  const istDate = new Date(istMillis);

  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${minutes?.toString().padStart(2, "0")} ${period}`;
};

// formatEstimateRange
export const formatEstimateRange = (minEstimate, maxEstimate) => {
  const formatToLacs = (value) => {
    if (value == null) return "Not Estimated"; // ✅ handle null or undefined immediately

    let result;
    if (value >= 100000) {
      result = (value / 100000).toFixed(1);
      result = result.endsWith(".0") ? parseInt(result) : result;
      return `${result} lacs`;
    } else if (value >= 1000) {
      result = (value / 1000).toFixed(1);
      result = result.endsWith(".0") ? parseInt(result) : result;
      return `${result}K`;
    } else {
      return value.toString();
    }
  };

  const formattedMin = formatToLacs(minEstimate);
  const formattedMax = formatToLacs(maxEstimate);

  if (formattedMax && formattedMin) {
    return `${formattedMin} - ${formattedMax}`;
  }
  return "Not Estimated";
};

export const getCurrentTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const API_ROUTES = {
  // Jobs or careers Routes
  FETCH_JOBS_List: "website/careers/get-all-jobs?limit=1000",
  FETCH_JOB_DETAIL: "/website/careers/get-job/",
  APPLY_JOB: "/website/careers/apply-job",

  // Blogs Routes
  FETCH_BLOGS_LIST: "/website/blog",
  FETCH_BLOG_DETAILS: "website/blog/",
  SAVE_BLOG: "/website/blog/save/",
  LIKE_BLOG: "/website/blog/like/",
  FETCH_SAVED_BLOGS: "/website/blog/get-all/saved?filter=save",
  FETCH_LIKED_BLOGS: "/website/blog/get-all/saved?filter=like",

  // Testimonials
  FETCH_TESTIMONIALS: "website/testmonials/get-all",
  CREATE_TESTIMONIAL: "/website/testmonials/create",

  // Gallery
  GET_ALL_GALLERY: "/website/gallery/get-all",
  GET_ALL_SAVED_GALLERY: "/website/gallery/get-filtered-gallery",
  LIKE_GALLERY_IMAGE: "/website/gallery/like/",
  SAVE_GALLERY_IMAGE: "/website/gallery/save/",
  GET_GALLERY_BY_ID: "/website/gallery/",

  // Support
  SEND_SUPPORT_MSG: "/website/support/send-msg",
  SCHEDULE_MEETING: "/website/support/schedule-meeting",

  // Estimate
  SEND_ESTIMATE: "/estimate/create-lead-with-estimate",
  GET_ESTIMATE_QUESTIONS: "/estimate/get-all-design-options",
  GET_ESTIMATE_BUDGET: "/estimate/getestimate",

  //Auth
  SEND_OTP: "/auth/sendUserOtp",
  USER_LOGIN: "/auth/loginUser",
  CHECK_AUTH: "/auth/checkAuth",
  LOG_OUT: "/auth/logoutEmloyee",
  RESEND_OTP: "/auth/resendUserOtp",

  // Profile
  UPDATE_FORM_DATA: "/auth/upate-user-profile",

  // Lead
  GET_LEADS_DATA: "/lead/get-all-leads-user",
  SINGLE_LEAD_DATA: "/lead/get-lead-by-id",
  GET_LEAD_FOLDERS: "/folder/get-folders-by-leadid",
  GET_FOLDER_FILES: "/comment/get-documents-by-folderId",
  GET_LEAD_LINKS: "/comment/get-unique-links",
  GET_LEAD_IMAGES: "/comment/get-all-images",
};

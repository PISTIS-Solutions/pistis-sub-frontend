export const baseURL = "https://lms-backend-1-9kcc.onrender.com/api/v2/auth";

export const urls = {
  signin: `${baseURL}/jwt/create/`,
  signup: `${baseURL}/users/`,
  getStudents: `${baseURL}/courses-and-students/`,
  activateEmail: `${baseURL}/users/activation/`,
  resendToken: `${baseURL}/users/resend_activation/`,
  plans: `${baseURL}/subscriptions/payment-plans/`,
  subStatus: `${baseURL}/students/StudentSubscriptionDetails/`,
  refreshToken: `${baseURL}/jwt/refresh/`,
  makeIntermediatePayment: `${baseURL}/subscriptions/make-payment-intermediate/`,
};

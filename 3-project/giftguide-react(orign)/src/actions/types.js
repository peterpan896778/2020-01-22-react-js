const types = {
  USER: {
    ADD: "USER.ADD",
    REQUEST: "USER.REQUEST",
    REQUEST_SUCCESS: "USER.REQUEST_SUCCESS",
    REQUEST_FAILURE: "USER.REQUEST_FAILURE",
    REQUEST_TEST_INFO: "USER.REQUEST_TEST_INFO",
    REQUEST_TEST_INFO_SUCCESS: "USER.REQUEST_TEST_INFO_SUCCESS",
    REQUEST_TEST_INFO_FAILURE: "USER.REQUEST_TEST_INFO_FAILURE",
    UPDATE: "USER.UPDATE",
    UPDATE_SUCCESS: "USER.UPDATE_SUCCESS",
    UPDATE_SETTING: "USER.UPDATE_SETTING",
    UPDATE_FAILURE: "USER.UPDATE_FAILURE",
    UPDATE_CURRENT_TEST: "USER.UPDATE_CURRENT_TEST",
    UPDATE_CURRENT_TEST_SUCCESS: "USER.UPDATE_CURRENT_TEST_SUCCESS",
    FETCH_PAYMENTS: "USER.FETCH_PAYMENTS",
    FETCH_PAYMENTS_SUCCESS: "USER.FETCH_PAYMENTS_SUCCESS",
    FETCH_PAYMENTS_FAILURE: "USER.FETCH_PAYMENTS_FAILURE",
    SIGN_OUT: "USER.SIGN_OUT",
    SIGN_OUT_SUCCESS: "USER.SIGN_OUT_SUCCESS",
    SIGN_OUT_FAILURE: "USER.SIGN_OUT_FAILURE",
    TIME_ON_PLATFORM: "USER.TIME_ON_PLATFORM",
    TIME_ON_PLATFORM_SUCCESS: "USER.TIME_ON_PLATFORM_SUCCESS",
    TIME_ON_PLATFORM_FAILURE: "USER.TIME_ON_PLATFORM_FAILURE",
    UPDATE_PAYMENT_SOURCE: "USER.UPDATE_PAYMENT_SOURCE",
    UPDATE_PAYMENT_SOURCE_SUCCESS: "USER.UPDATE_PAYMENT_SOURCE_SUCCESS",
    UPDATE_PAYMENT_SOURCE_FAILURE: "USER.UPDATE_PAYMENT_SOURCE_FAILURE",
    UPDATE_PASSWORD: "USER.UPDATE_PASSWORD",
    UPDATE_PASSWORD_SUCCESS: "USER.UPDATE_PASSWORD_SUCCESS",
    UPDATE_PASSWORD_FAILURE: "USER.UPDATE_PASSWORD_FAILURE",
    UPDATE_PLAN: "USER.UPDATE_PLAN",
    UPDATE_PLAN_SUCCESS: "USER.UPDATE_PLAN_SUCCESS",
    UPDATE_PLAN_FAILURE: "USER.UPDATE_PLAN_FAILURE",
    SUBMIT_FEEDBACK: "USER.SUBMIT_FEEDBACK",
    SUBMIT_FEEDBACK_SUCCESS: "USER.SUBMIT_FEEDBACK_SUCCESS",
    SUBMIT_FEEDBACK_FAILURE: "USER.SUBMIT_FEEDBACK_FAILURE",
    CANCEL_PLAN: "USER.CANCEL_PLAN",
    CANCEL_PLAN_SUCCESS: "USER.CANCEL_PLAN_SUCCESS",
    CANCEL_PLAN_FAILURE: "USER.CANCEL_PLAN_FAILURE",
    OLD_REQUEST: "USER.OLD_REQUEST"
  },
  BANNER: {
    BANNER_DISPLAY: "BANNER.BANNER_DISPLAY",
    BANNER_DISMISS: "BANNER.BANNER_DISMISS"
  },
  DIAGNOSTIC: {
    REQUEST: "DIAGNOSTIC.REQUEST",
    REQUEST_RESULT: "DIAGNOSTIC.REQUEST_RESULT",
    SINGLE_REQUEST: "DIAGNOSTIC.SINGLE_REQUEST",
    SINGLE_REQUEST_RESULT: "DIAGNOSTIC.SINGLE_REQUEST_RESULT",
    CREATE_PDF: "DIAGNOSTIC.CREATE_PDF"
  },
  SKILL: {
    REQUEST: "SKILL.REQUEST",
    REQUEST_RESULT: "SKILL.REQUEST_RESULT",
    WEAKEST_REQUEST: "SKILL.WEAKEST_REQUEST",
    WEAKEST_REQUEST_RESULT: "SKILL.WEAKEST_REQUEST_RESULT",
    RESET_WEAKEST: "SKILL.RESET_WEAKEST"
  },
  TOPIC: {
    USER_REQUEST: "TOPIC.USER_REQUEST",
    USER_REQUEST_RESULT: "TOPIC.USER_REQUEST_RESULT",
    REQUEST: "TOPIC.REQUEST",
    REQUEST_RESULT: "TOPIC.REQUEST_RESULT",
    WEAKEST_REQUEST: "TOPIC.WEAKEST_REQUEST",
    WEAKEST_REQUEST_RESULT: "TOPIC.WEAKEST_REQUEST_RESULT",
    RESET_WEAKEST: "TOPIC.RESET_WEAKEST"
  },
  STUDY_ARTICLE: {
    REQUEST: "STUDY_ARTICLE.REQUEST",
    REQUEST_RESULT: "STUDY_ARTICLE.REQUEST_RESULT"
  },
  NEXTUP: {
    REQUEST: "NEXTUP.REQUEST",
    REQUEST_RESULT: "NEXTUP.REQUEST_RESULT"
  },
  SIMULATION: {
    REQUEST: "SIMULATION.REQUEST",
    REQUEST_RESULT: "SIMULATION.REQUEST_RESULT"
  }
};

export default types;

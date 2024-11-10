export const SOCKET_EVENTS = {
  ADD_PARTICIPANT: "add_participant",
  JOIN_REQUEST: "join_request",
  JOIN_REQUEST_ACTION: "join_request_action",
  JOIN_REQUEST_RESPONSE: "join_request_response",
};

export const JOIN_REQUEST_ACTION = {
  ACCEPT: "accept",
  DECLINE: "decline",
};

export const DROPDOWN_OPTIONS = [
  { label: "Add Participants", action: SOCKET_EVENTS.ADD_PARTICIPANT },
  { label: "Notifications", action: "notifications" }, 
];
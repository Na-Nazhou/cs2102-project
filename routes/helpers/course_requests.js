function courseRequestsPath(requester_id) {
  return `/users/${encodeURIComponent(requester_id)}/course_requests`;
}

function courseRequestPath(requester_id, semester_name, module_code) {
  return `${courseRequestsPath(requester_id)}/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}`;
}

function courseRequestUpdatePath(requester_id, semester_name, module_code) {
  return `${courseRequestPath(requester_id, semester_name, module_code)}`;
}

module.exports = {
  courseRequestsPath,
  courseRequestPath,
  courseRequestUpdatePath
};
/**
 * @typedef {Object} ScoreBreakdown
 * @property {number} severity
 * @property {number} contextualRisk
 * @property {number} independentReports
 * @property {number} age
 * @property {string[]} riskFactors  Human-readable reasons, e.g. "Near a school"
 *
 * @typedef {Object} Issue
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'pothole'|'streetlight'|'water_leak'|'garbage'} category
 * @property {'open'|'acknowledged'|'in_progress'|'resolved'} status
 * @property {number} lat
 * @property {number} lng
 * @property {string} address
 * @property {number} priorityScore   0-100
 * @property {'critical'|'high'|'medium'|'low'} priorityLevel
 * @property {ScoreBreakdown} breakdown
 * @property {number} reportCount     Independent reports merged into this issue
 * @property {string|null} photoUrl
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string|null} resolvedAt
 *
 * @typedef {Object} IssueUpdate
 * @property {string} id
 * @property {string} status
 * @property {string} note
 * @property {string} createdAt
 *
 * @typedef {Object} SubmitReportInput
 * @property {string} category
 * @property {string} description
 * @property {number} lat
 * @property {number} lng
 * @property {string} address
 * @property {string} severityHint
 * @property {File|null} photo
 *
 * @typedef {Object} SubmitReportResult
 * @property {string} issueId
 * @property {boolean} merged   true when the report was attached to an existing issue
 * @property {number} reportCount
 */
export {};

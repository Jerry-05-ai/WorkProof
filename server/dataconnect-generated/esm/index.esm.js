import { getDataConnect } from 'firebase-admin/data-connect';

export const connectorConfig = {
  serviceId: 'workproof-8634e-service',
  location: 'us-east4'
};

function resolveDataConnect(dcOrApp) {
  // Accepts either a Firebase Admin `App`, or an already-resolved `DataConnect` instance.
  if (dcOrApp && typeof dcOrApp.executeGraphql === 'function') return dcOrApp;
  return getDataConnect(connectorConfig, dcOrApp);
}

const getUserByEmailQuery = "query GetUserByEmail($email: String!) @auth(level: NO_ACCESS) {\n  users(where: { email: { eq: $email }, deletedAt: { isNull: true } }, limit: 1) {\n    id\n    email\n    passwordHash\n    fullName\n    phone\n    role\n    isActive\n    lastLogin\n    createdAt\n    updatedAt\n    company {\n      id\n    }\n    employeeRef {\n      id\n    }\n  }\n}";
export async function getUserByEmail(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getUserByEmailQuery, { variables, operationName: 'GetUserByEmail' });
}
getUserByEmail.operationName = 'GetUserByEmail';

const getUserByIdQuery = "query GetUserById($id: UUID!) @auth(level: NO_ACCESS) {\n  user(id: $id) {\n    id\n    email\n    passwordHash\n    fullName\n    phone\n    role\n    isActive\n    lastLogin\n    createdAt\n    updatedAt\n    company {\n      id\n    }\n    employeeRef {\n      id\n    }\n  }\n}";
export async function getUserById(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getUserByIdQuery, { variables, operationName: 'GetUserById' });
}
getUserById.operationName = 'GetUserById';

const getCompanyByIdQuery = "query GetCompanyById($id: UUID!) @auth(level: NO_ACCESS) {\n  company(id: $id) {\n    id\n    name\n    email\n    phone\n    website\n    industry\n    size\n    country\n    city\n    description\n    status\n    isVerified\n    deletedAt\n    admin {\n      id\n    }\n  }\n}";
export async function getCompanyById(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getCompanyByIdQuery, { variables, operationName: 'GetCompanyById' });
}
getCompanyById.operationName = 'GetCompanyById';

const getCompanyByNameQuery = "query GetCompanyByName($name: String!) @auth(level: NO_ACCESS) {\n  companies(where: { name: { eq: $name }, deletedAt: { isNull: true } }, limit: 1) {\n    id\n    name\n  }\n}";
export async function getCompanyByName(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getCompanyByNameQuery, { variables, operationName: 'GetCompanyByName' });
}
getCompanyByName.operationName = 'GetCompanyByName';

const getCompanyByEmailQuery = "query GetCompanyByEmail($email: String!) @auth(level: NO_ACCESS) {\n  companies(where: { email: { eq: $email }, deletedAt: { isNull: true } }, limit: 1) {\n    id\n    email\n  }\n}";
export async function getCompanyByEmail(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getCompanyByEmailQuery, { variables, operationName: 'GetCompanyByEmail' });
}
getCompanyByEmail.operationName = 'GetCompanyByEmail';

const getEmployeeByIdQuery = "query GetEmployeeById($id: UUID!) @auth(level: NO_ACCESS) {\n  employee(id: $id) {\n    id\n    userId\n    companyId\n    firstName\n    lastName\n    email\n    phone\n    jobTitle\n    department\n    employmentType\n    employmentStatus\n    startDate\n    endDate\n    managerId\n    profilePhoto\n    location\n    isVerified\n    verifiedAt\n    verifiedById\n    createdAt\n    updatedAt\n    deletedAt\n    user {\n      id\n    }\n    company {\n      id\n      name\n    }\n    manager {\n      id\n    }\n  }\n}";
export async function getEmployeeById(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getEmployeeByIdQuery, { variables, operationName: 'GetEmployeeById' });
}
getEmployeeById.operationName = 'GetEmployeeById';

const getEmployeeByEmailQuery = "query GetEmployeeByEmail($email: String!) @auth(level: NO_ACCESS) {\n  employees(where: { email: { eq: $email }, deletedAt: { isNull: true } }, limit: 1) {\n    id\n    userId\n    companyId\n    firstName\n    lastName\n    email\n    phone\n    jobTitle\n    department\n    employmentType\n    employmentStatus\n    startDate\n    endDate\n    managerId\n    profilePhoto\n    location\n    isVerified\n    verifiedAt\n    verifiedById\n    createdAt\n    updatedAt\n    deletedAt\n    user {\n      id\n    }\n  }\n}";
export async function getEmployeeByEmail(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getEmployeeByEmailQuery, { variables, operationName: 'GetEmployeeByEmail' });
}
getEmployeeByEmail.operationName = 'GetEmployeeByEmail';

const listEmployeesByCompanyQuery = "query ListEmployeesByCompany(\n  $companyId: UUID!\n  $search: String\n  $department: String\n  $employmentStatus: String\n  $isVerified: Boolean\n  $limit: Int\n  $offset: Int\n) @auth(level: NO_ACCESS) {\n  employees(\n    where: {\n      _and: [\n        { companyId: { eq: $companyId } }\n        { deletedAt: { isNull: true } }\n        { department: { eq: $department } }\n        { employmentStatus: { eq: $employmentStatus } }\n        { isVerified: { eq: $isVerified } }\n        {\n          _and: [\n            {\n              _or: [\n                { firstName: { contains: $search } }\n                { lastName: { contains: $search } }\n                { email: { contains: $search } }\n              ]\n            }\n          ]\n        }\n      ]\n    }\n    orderBy: { createdAt: DESC }\n    limit: $limit\n    offset: $offset\n  ) {\n    id\n    userId\n    companyId\n    firstName\n    lastName\n    email\n    phone\n    jobTitle\n    department\n    employmentType\n    employmentStatus\n    startDate\n    endDate\n    managerId\n    profilePhoto\n    location\n    isVerified\n    verifiedAt\n    verifiedById\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}";
export async function listEmployeesByCompany(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listEmployeesByCompanyQuery, { variables, operationName: 'ListEmployeesByCompany' });
}
listEmployeesByCompany.operationName = 'ListEmployeesByCompany';

const searchEmployeesQuery = "query SearchEmployees($companyId: UUID!, $search: String!) @auth(level: NO_ACCESS) {\n  employees(\n    where: {\n      _and: [\n        { companyId: { eq: $companyId } }\n        {\n          _and: [\n            {\n              _or: [\n                { firstName: { contains: $search } }\n                { lastName: { contains: $search } }\n                { email: { contains: $search } }\n              ]\n            }\n          ]\n        }\n      ]\n    }\n    limit: 10\n  ) {\n    id\n    email\n    firstName\n    lastName\n  }\n}";
export async function searchEmployees(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(searchEmployeesQuery, { variables, operationName: 'SearchEmployees' });
}
searchEmployees.operationName = 'SearchEmployees';

const getSkillByNameQuery = "query GetSkillByName($name: String!) @auth(level: NO_ACCESS) {\n  skills(where: { name: { eq: $name } }, limit: 1) {\n    id\n    name\n    category\n  }\n}";
export async function getSkillByName(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getSkillByNameQuery, { variables, operationName: 'GetSkillByName' });
}
getSkillByName.operationName = 'GetSkillByName';

const listSkillsByEmployeeQuery = "query ListSkillsByEmployee($employeeId: UUID!) @auth(level: NO_ACCESS) {\n  employeeSkills(where: { employeeId: { eq: $employeeId } }, orderBy: { createdAt: ASC }) {\n    id\n    employeeId\n    skillId\n    proficiencyLevel\n    initialLevel\n    isVerified\n    verifiedBy\n    verificationDate\n    lastAssessed\n    yearsExperience\n    createdAt\n    updatedAt\n  }\n}";
export async function listSkillsByEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listSkillsByEmployeeQuery, { variables, operationName: 'ListSkillsByEmployee' });
}
listSkillsByEmployee.operationName = 'ListSkillsByEmployee';

const getEmployeeSkillByPairQuery = "query GetEmployeeSkillByPair($employeeId: UUID!, $skillId: UUID!) @auth(level: NO_ACCESS) {\n  employeeSkills(where: { employeeId: { eq: $employeeId }, skillId: { eq: $skillId } }, limit: 1) {\n    id\n  }\n}";
export async function getEmployeeSkillByPair(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getEmployeeSkillByPairQuery, { variables, operationName: 'GetEmployeeSkillByPair' });
}
getEmployeeSkillByPair.operationName = 'GetEmployeeSkillByPair';

const listProjectsByEmployeeQuery = "query ListProjectsByEmployee($employeeId: UUID!, $companyId: UUID!) @auth(level: NO_ACCESS) {\n  projects(\n    where: { employeeId: { eq: $employeeId }, companyId: { eq: $companyId } }\n    orderBy: { createdAt: DESC }\n  ) {\n    id\n    employeeId\n    companyId\n    name\n    description\n    role\n    technologies\n    startDate\n    endDate\n    status\n    contributionSummary\n    performanceRating\n    isVerified\n    verifiedById\n    verificationDate\n    createdAt\n    updatedAt\n  }\n}";
export async function listProjectsByEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listProjectsByEmployeeQuery, { variables, operationName: 'ListProjectsByEmployee' });
}
listProjectsByEmployee.operationName = 'ListProjectsByEmployee';

const listProjectsByCompanyQuery = "query ListProjectsByCompany($companyId: UUID!) @auth(level: NO_ACCESS) {\n  projects(where: { companyId: { eq: $companyId } }, orderBy: { createdAt: DESC }) {\n    id\n    employeeId\n    companyId\n    name\n    status\n    performanceRating\n    isVerified\n    createdAt\n  }\n}";
export async function listProjectsByCompany(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listProjectsByCompanyQuery, { variables, operationName: 'ListProjectsByCompany' });
}
listProjectsByCompany.operationName = 'ListProjectsByCompany';

const listBehaviorRatingsQuery = "query ListBehaviorRatings($employeeId: UUID!, $companyId: UUID!) @auth(level: NO_ACCESS) {\n  employeeBehaviorRatings(\n    where: { employeeId: { eq: $employeeId }, companyId: { eq: $companyId } }\n    orderBy: [{ reviewDate: DESC }, { id: DESC }]\n  ) {\n    id\n    employeeId\n    companyId\n    category\n    rating\n    reviewerId\n    reviewDate\n    comments\n    createdAt\n  }\n}";
export async function listBehaviorRatings(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listBehaviorRatingsQuery, { variables, operationName: 'ListBehaviorRatings' });
}
listBehaviorRatings.operationName = 'ListBehaviorRatings';

const latestBehaviorRatingsQuery = "query LatestBehaviorRatings($employeeId: UUID!, $companyId: UUID!) @auth(level: NO_ACCESS) {\n  employeeBehaviorRatings(\n    where: { employeeId: { eq: $employeeId }, companyId: { eq: $companyId } }\n    orderBy: [{ reviewDate: DESC }, { id: DESC }]\n  ) {\n    id\n    category\n    rating\n    reviewDate\n  }\n}";
export async function latestBehaviorRatings(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(latestBehaviorRatingsQuery, { variables, operationName: 'LatestBehaviorRatings' });
}
latestBehaviorRatings.operationName = 'LatestBehaviorRatings';

const listAchievementsQuery = "query ListAchievements($employeeId: UUID!, $companyId: UUID!) @auth(level: NO_ACCESS) {\n  achievements(\n    where: { employeeId: { eq: $employeeId }, companyId: { eq: $companyId } }\n    orderBy: { createdAt: DESC }\n  ) {\n    id\n    employeeId\n    companyId\n    title\n    description\n    date\n    category\n    evidenceUrl\n    isVerified\n    verifiedById\n    verificationDate\n    createdAt\n    updatedAt\n  }\n}";
export async function listAchievements(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listAchievementsQuery, { variables, operationName: 'ListAchievements' });
}
listAchievements.operationName = 'ListAchievements';

const listPerformanceReviewsQuery = "query ListPerformanceReviews($employeeId: UUID!, $companyId: UUID!) @auth(level: NO_ACCESS) {\n  performanceReviews(\n    where: { employeeId: { eq: $employeeId }, companyId: { eq: $companyId } }\n    orderBy: { reviewDate: DESC }\n  ) {\n    id\n    employeeId\n    companyId\n    reviewerId\n    period\n    rating\n    comments\n    strengths\n    areasForImprovement\n    goalsCompleted\n    goalsPending\n    reviewDate\n    createdAt\n    reviewer {\n      id\n      fullName\n      email\n    }\n  }\n}";
export async function listPerformanceReviews(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listPerformanceReviewsQuery, { variables, operationName: 'ListPerformanceReviews' });
}
listPerformanceReviews.operationName = 'ListPerformanceReviews';

const getLatestPerformanceReviewQuery = "query GetLatestPerformanceReview($employeeId: UUID!, $companyId: UUID!) @auth(level: NO_ACCESS) {\n  performanceReviews(\n    where: { employeeId: { eq: $employeeId }, companyId: { eq: $companyId } }\n    orderBy: { reviewDate: DESC }\n    limit: 1\n  ) {\n    id\n    rating\n    reviewDate\n  }\n}";
export async function getLatestPerformanceReview(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getLatestPerformanceReviewQuery, { variables, operationName: 'GetLatestPerformanceReview' });
}
getLatestPerformanceReview.operationName = 'GetLatestPerformanceReview';

const listMonthlyReportsQuery = "query ListMonthlyReports($employeeId: UUID!, $companyId: UUID!) @auth(level: NO_ACCESS) {\n  monthlyProgressReports(\n    where: { employeeId: { eq: $employeeId }, companyId: { eq: $companyId } }\n    orderBy: [{ year: DESC }, { month: DESC }]\n  ) {\n    id\n    employeeId\n    companyId\n    month\n    year\n    performanceScore\n    behaviorScore\n    skillsImproved\n    skillsNeedingDevelopment\n    projectsCompleted\n    projectsInProgress\n    achievements\n    managerFeedback\n    employeeResponse\n    goalsCompleted\n    goalsPending\n    growthPercentage\n    promotionReadiness\n    nextRole\n    isAiGenerated\n    reportData\n    generatedDate\n    createdAt\n  }\n}";
export async function listMonthlyReports(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listMonthlyReportsQuery, { variables, operationName: 'ListMonthlyReports' });
}
listMonthlyReports.operationName = 'ListMonthlyReports';

const getMonthlyReportByKeyQuery = "query GetMonthlyReportByKey($employeeId: UUID!, $companyId: UUID!, $month: String!, $year: Int!) @auth(level: NO_ACCESS) {\n  monthlyProgressReports(\n    where: {\n      employeeId: { eq: $employeeId }\n      companyId: { eq: $companyId }\n      month: { eq: $month }\n      year: { eq: $year }\n    }\n    limit: 1\n  ) {\n    id\n    employeeId\n    companyId\n    month\n    year\n    performanceScore\n    behaviorScore\n    projectsCompleted\n    projectsInProgress\n    growthPercentage\n    promotionReadiness\n    nextRole\n    isAiGenerated\n    reportData\n    generatedDate\n  }\n}";
export async function getMonthlyReportByKey(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getMonthlyReportByKeyQuery, { variables, operationName: 'GetMonthlyReportByKey' });
}
getMonthlyReportByKey.operationName = 'GetMonthlyReportByKey';

const getPrivacyByEmployeeQuery = "query GetPrivacyByEmployee($employeeId: UUID!) @auth(level: NO_ACCESS) {\n  employee(id: $employeeId) {\n    privacySettings {\n      id\n      employee { id }\n      company { id }\n      profileVisibility\n      namePublic\n      photoPublic\n      rolePublic\n      skillsPublic\n      skillLevelsPublic\n      skillGrowthPublic\n      projectsPublic\n      projectDescriptionsPublic\n      achievementsPublic\n      experiencePublic\n      performanceSummaryPublic\n      monthlyProgressPublic\n      behaviorSummaryPublic\n      isEmployeeControlled\n      ownershipTransferredAt\n      publishedAt\n      lastModifiedAt\n      createdAt\n      updatedAt\n    }\n  }\n}";
export async function getPrivacyByEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getPrivacyByEmployeeQuery, { variables, operationName: 'GetPrivacyByEmployee' });
}
getPrivacyByEmployee.operationName = 'GetPrivacyByEmployee';

const getEmployeeEmploymentStatusQuery = "query GetEmployeeEmploymentStatus($employeeId: UUID!) @auth(level: NO_ACCESS) {\n  employee(id: $employeeId) {\n    id\n    employmentStatus\n  }\n}";
export async function getEmployeeEmploymentStatus(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getEmployeeEmploymentStatusQuery, { variables, operationName: 'GetEmployeeEmploymentStatus' });
}
getEmployeeEmploymentStatus.operationName = 'GetEmployeeEmploymentStatus';

const getPublicProfileByEmployeeQuery = "query GetPublicProfileByEmployee($employeeId: UUID!) @auth(level: NO_ACCESS) {\n  publicProfiles(where: { employeeId: { eq: $employeeId } }, limit: 1) {\n    id\n    employeeId\n    companyId\n    slug\n    isPublic\n    viewCount\n    lastViewedAt\n    createdAt\n  }\n}";
export async function getPublicProfileByEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getPublicProfileByEmployeeQuery, { variables, operationName: 'GetPublicProfileByEmployee' });
}
getPublicProfileByEmployee.operationName = 'GetPublicProfileByEmployee';

const getPublicProfileBySlugQuery = "query GetPublicProfileBySlug($slug: String!) @auth(level: NO_ACCESS) {\n  publicProfiles(where: { slug: { eq: $slug } }, limit: 1) {\n    id\n    employeeId\n    companyId\n    slug\n    isPublic\n    viewCount\n    lastViewedAt\n    createdAt\n  }\n}";
export async function getPublicProfileBySlug(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getPublicProfileBySlugQuery, { variables, operationName: 'GetPublicProfileBySlug' });
}
getPublicProfileBySlug.operationName = 'GetPublicProfileBySlug';

const checkSlugExistsQuery = "query CheckSlugExists($slug: String!) @auth(level: NO_ACCESS) {\n  publicProfiles(where: { slug: { eq: $slug } }, limit: 1) {\n    id\n  }\n}";
export async function checkSlugExists(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(checkSlugExistsQuery, { variables, operationName: 'CheckSlugExists' });
}
checkSlugExists.operationName = 'CheckSlugExists';

const listPublicProfilesQuery = "query ListPublicProfiles @auth(level: NO_ACCESS) {\n  publicProfiles(where: { isPublic: { eq: true } }) {\n    id\n    employeeId\n    companyId\n    slug\n    isPublic\n    viewCount\n    lastViewedAt\n    employee {\n      id\n      userId\n      companyId\n      firstName\n      lastName\n      email\n      phone\n      jobTitle\n      department\n      employmentType\n      employmentStatus\n      startDate\n      endDate\n      managerId\n      profilePhoto\n      location\n      isVerified\n      verifiedAt\n      verifiedById\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n}";
export async function listPublicProfiles(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listPublicProfilesQuery, { variables, operationName: 'ListPublicProfiles' });
}
listPublicProfiles.operationName = 'ListPublicProfiles';

const getVerificationCorrectionByIdQuery = "query GetVerificationCorrectionById($id: UUID!) @auth(level: NO_ACCESS) {\n  verificationCorrection(id: $id) {\n    id\n    employeeId\n    companyId\n    fieldName\n    oldValue\n    newValue\n    reason\n    status\n    requestedById\n    reviewedById\n    createdAt\n    updatedAt\n  }\n}";
export async function getVerificationCorrectionById(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getVerificationCorrectionByIdQuery, { variables, operationName: 'GetVerificationCorrectionById' });
}
getVerificationCorrectionById.operationName = 'GetVerificationCorrectionById';

const listVerificationCorrectionsByEmployeeQuery = "query ListVerificationCorrectionsByEmployee($employeeId: UUID!, $status: String) @auth(level: NO_ACCESS) {\n  verificationCorrections(\n    where: { employeeId: { eq: $employeeId }, status: { eq: $status } }\n    orderBy: { createdAt: DESC }\n  ) {\n    id\n    employeeId\n    companyId\n    fieldName\n    oldValue\n    newValue\n    reason\n    status\n    requestedById\n    reviewedById\n    createdAt\n  }\n}";
export async function listVerificationCorrectionsByEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listVerificationCorrectionsByEmployeeQuery, { variables, operationName: 'ListVerificationCorrectionsByEmployee' });
}
listVerificationCorrectionsByEmployee.operationName = 'ListVerificationCorrectionsByEmployee';

const listVerificationCorrectionsByCompanyQuery = "query ListVerificationCorrectionsByCompany($companyId: UUID!, $status: String) @auth(level: NO_ACCESS) {\n  verificationCorrections(\n    where: { companyId: { eq: $companyId }, status: { eq: $status } }\n    orderBy: { createdAt: DESC }\n  ) {\n    id\n    employeeId\n    companyId\n    fieldName\n    oldValue\n    newValue\n    reason\n    status\n    requestedById\n    reviewedById\n    createdAt\n  }\n}";
export async function listVerificationCorrectionsByCompany(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listVerificationCorrectionsByCompanyQuery, { variables, operationName: 'ListVerificationCorrectionsByCompany' });
}
listVerificationCorrectionsByCompany.operationName = 'ListVerificationCorrectionsByCompany';

const getJobOpportunityByIdQuery = "query GetJobOpportunityById($id: UUID!) @auth(level: NO_ACCESS) {\n  jobOpportunity(id: $id) {\n    id\n    recruiterId\n    employeeId\n    title\n    companyName\n    description\n    status\n    message\n    salaryRange\n    location\n    sentAt\n    viewedAt\n    respondedAt\n    createdAt\n    employee {\n      id\n      firstName\n      lastName\n      jobTitle\n    }\n    recruiter {\n      id\n      fullName\n      email\n    }\n  }\n}";
export async function getJobOpportunityById(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getJobOpportunityByIdQuery, { variables, operationName: 'GetJobOpportunityById' });
}
getJobOpportunityById.operationName = 'GetJobOpportunityById';

const listJobOpportunitiesByRecruiterQuery = "query ListJobOpportunitiesByRecruiter($recruiterId: UUID!) @auth(level: NO_ACCESS) {\n  jobOpportunities(\n    where: { recruiterId: { eq: $recruiterId } }\n    orderBy: { createdAt: DESC }\n  ) {\n    id\n    recruiterId\n    employeeId\n    title\n    companyName\n    description\n    status\n    message\n    salaryRange\n    location\n    sentAt\n    viewedAt\n    respondedAt\n    createdAt\n    employee {\n      id\n      firstName\n      lastName\n      jobTitle\n    }\n  }\n}";
export async function listJobOpportunitiesByRecruiter(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listJobOpportunitiesByRecruiterQuery, { variables, operationName: 'ListJobOpportunitiesByRecruiter' });
}
listJobOpportunitiesByRecruiter.operationName = 'ListJobOpportunitiesByRecruiter';

const listJobOpportunitiesByEmployeeQuery = "query ListJobOpportunitiesByEmployee($employeeId: UUID!) @auth(level: NO_ACCESS) {\n  jobOpportunities(\n    where: { employeeId: { eq: $employeeId } }\n    orderBy: { createdAt: DESC }\n  ) {\n    id\n    recruiterId\n    employeeId\n    title\n    companyName\n    description\n    status\n    message\n    salaryRange\n    location\n    sentAt\n    viewedAt\n    respondedAt\n    createdAt\n    recruiter {\n      id\n      fullName\n    }\n  }\n}";
export async function listJobOpportunitiesByEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listJobOpportunitiesByEmployeeQuery, { variables, operationName: 'ListJobOpportunitiesByEmployee' });
}
listJobOpportunitiesByEmployee.operationName = 'ListJobOpportunitiesByEmployee';

const countJobOpportunitiesByStatusQuery = "query CountJobOpportunitiesByStatus($recruiterId: UUID!) @auth(level: NO_ACCESS) {\n  jobOpportunities(where: { recruiterId: { eq: $recruiterId } }) {\n    id\n    status\n  }\n}";
export async function countJobOpportunitiesByStatus(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(countJobOpportunitiesByStatusQuery, { variables, operationName: 'CountJobOpportunitiesByStatus' });
}
countJobOpportunitiesByStatus.operationName = 'CountJobOpportunitiesByStatus';

const listEmploymentLinksByPersonQuery = "query ListEmploymentLinksByPerson($personEmail: String!) @auth(level: NO_ACCESS) {\n  employmentLinks(\n    where: { personEmail: { eq: $personEmail } }\n    orderBy: [{ isCurrent: DESC }, { startedAt: DESC }, { id: DESC }]\n  ) {\n    id\n    personEmail\n    userId\n    employeeId\n    companyId\n    jobTitle\n    department\n    startedAt\n    leftAt\n    isCurrent\n    source\n    createdAt\n    company {\n      id\n      name\n    }\n  }\n}";
export async function listEmploymentLinksByPerson(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listEmploymentLinksByPersonQuery, { variables, operationName: 'ListEmploymentLinksByPerson' });
}
listEmploymentLinksByPerson.operationName = 'ListEmploymentLinksByPerson';

const getEmploymentLinkByEmployeeQuery = "query GetEmploymentLinkByEmployee($employeeId: UUID!) @auth(level: NO_ACCESS) {\n  employmentLinks(where: { employeeId: { eq: $employeeId } }, limit: 1) {\n    id\n    personEmail\n    userId\n    employeeId\n    companyId\n    jobTitle\n    department\n    startedAt\n    leftAt\n    isCurrent\n    source\n    createdAt\n  }\n}";
export async function getEmploymentLinkByEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getEmploymentLinkByEmployeeQuery, { variables, operationName: 'GetEmploymentLinkByEmployee' });
}
getEmploymentLinkByEmployee.operationName = 'GetEmploymentLinkByEmployee';

const getCurrentEmploymentLinkQuery = "query GetCurrentEmploymentLink($personEmail: String!) @auth(level: NO_ACCESS) {\n  employmentLinks(\n    where: { personEmail: { eq: $personEmail }, isCurrent: { eq: true } }\n    orderBy: { id: DESC }\n    limit: 1\n  ) {\n    id\n    personEmail\n    userId\n    employeeId\n    companyId\n    jobTitle\n    department\n    startedAt\n    leftAt\n    isCurrent\n    source\n    createdAt\n  }\n}";
export async function getCurrentEmploymentLink(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getCurrentEmploymentLinkQuery, { variables, operationName: 'GetCurrentEmploymentLink' });
}
getCurrentEmploymentLink.operationName = 'GetCurrentEmploymentLink';

const listNotificationsByUserQuery = "query ListNotificationsByUser($userId: UUID!, $limit: Int!) @auth(level: NO_ACCESS) {\n  notifications(where: { userId: { eq: $userId } }, orderBy: { createdAt: DESC }, limit: $limit) {\n    id\n    userId\n    type\n    title\n    message\n    isRead\n    link\n    metadata\n    readAt\n    createdAt\n  }\n}";
export async function listNotificationsByUser(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listNotificationsByUserQuery, { variables, operationName: 'ListNotificationsByUser' });
}
listNotificationsByUser.operationName = 'ListNotificationsByUser';

const listUnreadNotificationsByUserQuery = "query ListUnreadNotificationsByUser($userId: UUID!, $limit: Int!) @auth(level: NO_ACCESS) {\n  notifications(\n    where: { userId: { eq: $userId }, isRead: { eq: false } }\n    orderBy: { createdAt: DESC }\n    limit: $limit\n  ) {\n    id\n    userId\n    type\n    title\n    message\n    isRead\n    link\n    metadata\n    readAt\n    createdAt\n  }\n}";
export async function listUnreadNotificationsByUser(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listUnreadNotificationsByUserQuery, { variables, operationName: 'ListUnreadNotificationsByUser' });
}
listUnreadNotificationsByUser.operationName = 'ListUnreadNotificationsByUser';

const getNotificationByIdQuery = "query GetNotificationById($id: UUID!) @auth(level: NO_ACCESS) {\n  notification(id: $id) {\n    id\n    userId\n    type\n    title\n    message\n    isRead\n    link\n    metadata\n    readAt\n    createdAt\n  }\n}";
export async function getNotificationById(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getNotificationByIdQuery, { variables, operationName: 'GetNotificationById' });
}
getNotificationById.operationName = 'GetNotificationById';

const countUnreadNotificationsQuery = "query CountUnreadNotifications($userId: UUID!) @auth(level: NO_ACCESS) {\n  notifications(where: { userId: { eq: $userId }, isRead: { eq: false } }) {\n    id\n  }\n}";
export async function countUnreadNotifications(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(countUnreadNotificationsQuery, { variables, operationName: 'CountUnreadNotifications' });
}
countUnreadNotifications.operationName = 'CountUnreadNotifications';

const listAuditLogsQuery = "query ListAuditLogs(\n  $action: String\n  $role: String\n  $entityType: String\n  $userId: UUID\n  $dateFrom: Timestamp\n  $dateTo: Timestamp\n  $limit: Int\n  $offset: Int\n) @auth(level: NO_ACCESS) {\n  auditLogs(\n    where: {\n      action: { eq: $action }\n      role: { eq: $role }\n      entityType: { eq: $entityType }\n      userId: { eq: $userId }\n      createdAt: { ge: $dateFrom, le: $dateTo }\n    }\n    orderBy: { createdAt: DESC }\n    limit: $limit\n    offset: $offset\n  ) {\n    id\n    userId\n    role\n    action\n    entityType\n    entityId\n    details\n    ipAddress\n    userAgent\n    createdAt\n    user {\n      id\n      fullName\n      email\n    }\n  }\n}";
export async function listAuditLogs(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listAuditLogsQuery, { variables, operationName: 'ListAuditLogs' });
}
listAuditLogs.operationName = 'ListAuditLogs';

const countAuditLogsQuery = "query CountAuditLogs(\n  $action: String\n  $role: String\n  $entityType: String\n  $userId: UUID\n  $dateFrom: Timestamp\n  $dateTo: Timestamp\n) @auth(level: NO_ACCESS) {\n  auditLogs(\n    where: {\n      action: { eq: $action }\n      role: { eq: $role }\n      entityType: { eq: $entityType }\n      userId: { eq: $userId }\n      createdAt: { ge: $dateFrom, le: $dateTo }\n    }\n  ) {\n    id\n  }\n}";
export async function countAuditLogs(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(countAuditLogsQuery, { variables, operationName: 'CountAuditLogs' });
}
countAuditLogs.operationName = 'CountAuditLogs';

const listInternalProjectsByCompanyQuery = "query ListInternalProjectsByCompany($companyId: UUID!) @auth(level: NO_ACCESS) {\n  internalProjects(\n    where: { companyId: { eq: $companyId }, deletedAt: { isNull: true } }\n    orderBy: { createdAt: DESC }\n  ) {\n    id\n    companyId\n    name\n    description\n    department\n    clientName\n    startDate\n    endDate\n    priority\n    status\n    projectLead\n    requiredRoles\n    openPositions\n    filledPositions\n    tasksCompleted\n    tasksRemaining\n    progress\n    assignedRecruiters\n    assignedEmployees\n    documents\n    createdById\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}";
export async function listInternalProjectsByCompany(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listInternalProjectsByCompanyQuery, { variables, operationName: 'ListInternalProjectsByCompany' });
}
listInternalProjectsByCompany.operationName = 'ListInternalProjectsByCompany';

const getInternalProjectByIdQuery = "query GetInternalProjectById($id: UUID!, $companyId: UUID!) @auth(level: NO_ACCESS) {\n  internalProject(id: $id) {\n    id\n    companyId\n    name\n    description\n    department\n    clientName\n    startDate\n    endDate\n    priority\n    status\n    projectLead\n    requiredRoles\n    openPositions\n    filledPositions\n    tasksCompleted\n    tasksRemaining\n    progress\n    assignedRecruiters\n    assignedEmployees\n    documents\n    createdById\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}";
export async function getInternalProjectById(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getInternalProjectByIdQuery, { variables, operationName: 'GetInternalProjectById' });
}
getInternalProjectById.operationName = 'GetInternalProjectById';

const getInvitationByTokenQuery = "query GetInvitationByToken($tokenHash: String!, $now: Timestamp!) @auth(level: NO_ACCESS) {\n  employeeInvitations(\n    where: { tokenHash: { eq: $tokenHash }, status: { eq: \"pending\" }, expiresAt: { gt: $now } }\n    limit: 1\n  ) {\n    id\n    companyId\n    email\n    tokenHash\n    firstName\n    lastName\n    jobTitle\n    department\n    status\n    invitedById\n    expiresAt\n    acceptedAt\n    createdAt\n  }\n}";
export async function getInvitationByToken(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getInvitationByTokenQuery, { variables, operationName: 'GetInvitationByToken' });
}
getInvitationByToken.operationName = 'GetInvitationByToken';

const checkPendingInvitationQuery = "query CheckPendingInvitation($companyId: UUID!, $email: String!, $now: Timestamp!) @auth(level: NO_ACCESS) {\n  employeeInvitations(\n    where: { companyId: { eq: $companyId }, email: { eq: $email }, status: { eq: \"pending\" }, expiresAt: { gt: $now } }\n    limit: 1\n  ) {\n    id\n  }\n}";
export async function checkPendingInvitation(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(checkPendingInvitationQuery, { variables, operationName: 'CheckPendingInvitation' });
}
checkPendingInvitation.operationName = 'CheckPendingInvitation';

const getSavedCandidateQuery = "query GetSavedCandidate($recruiterId: UUID!, $employeeId: UUID!) @auth(level: NO_ACCESS) {\n  savedCandidates(\n    where: { recruiterId: { eq: $recruiterId }, employeeId: { eq: $employeeId } }\n    limit: 1\n  ) {\n    _id\n    recruiterId\n    employeeId\n    notes\n    savedAt\n    createdAt\n  }\n}";
export async function getSavedCandidate(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(getSavedCandidateQuery, { variables, operationName: 'GetSavedCandidate' });
}
getSavedCandidate.operationName = 'GetSavedCandidate';

const listSavedCandidatesByRecruiterQuery = "query ListSavedCandidatesByRecruiter($recruiterId: UUID!) @auth(level: NO_ACCESS) {\n  savedCandidates(\n    where: { recruiterId: { eq: $recruiterId } }\n    orderBy: { savedAt: DESC }\n  ) {\n    _id\n    recruiterId\n    employeeId\n    notes\n    savedAt\n    createdAt\n    employee {\n      id\n      firstName\n      lastName\n      jobTitle\n      location\n      email\n    }\n  }\n}";
export async function listSavedCandidatesByRecruiter(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(listSavedCandidatesByRecruiterQuery, { variables, operationName: 'ListSavedCandidatesByRecruiter' });
}
listSavedCandidatesByRecruiter.operationName = 'ListSavedCandidatesByRecruiter';

const companyEmployeeStatsQuery = "query CompanyEmployeeStats($companyId: UUID!) @auth(level: NO_ACCESS) {\n  employees(where: { companyId: { eq: $companyId }, deletedAt: { isNull: true } }) {\n    id\n    employmentStatus\n    isVerified\n    department\n  }\n}";
export async function companyEmployeeStats(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(companyEmployeeStatsQuery, { variables, operationName: 'CompanyEmployeeStats' });
}
companyEmployeeStats.operationName = 'CompanyEmployeeStats';

const companySkillDistributionQuery = "query CompanySkillDistribution($companyId: UUID!) @auth(level: NO_ACCESS) {\n  employeeSkills(where: { employeeId: { eq: $companyId } }, limit: 100) {\n    id\n    skillId\n  }\n}";
export async function companySkillDistribution(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(companySkillDistributionQuery, { variables, operationName: 'CompanySkillDistribution' });
}
companySkillDistribution.operationName = 'CompanySkillDistribution';

const adminDashboardStatsQuery = "query AdminDashboardStats @auth(level: NO_ACCESS) {\n  companies(where: { deletedAt: { isNull: true } }) {\n    id\n    status\n    industry\n    createdAt\n  }\n  employees(where: { deletedAt: { isNull: true } }) {\n    id\n    employmentStatus\n  }\n  users(where: { deletedAt: { isNull: true } }) {\n    id\n    role\n  }\n  publicProfiles(where: { isPublic: { eq: true } }) {\n    id\n  }\n}";
export async function adminDashboardStats(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(adminDashboardStatsQuery, { variables, operationName: 'AdminDashboardStats' });
}
adminDashboardStats.operationName = 'AdminDashboardStats';

const findPlatformAdminsQuery = "query FindPlatformAdmins @auth(level: NO_ACCESS) {\n  users(where: { role: { eq: \"platform_admin\" }, isActive: { eq: true }, deletedAt: { isNull: true } }) {\n    id\n  }\n}";
export async function findPlatformAdmins(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(findPlatformAdminsQuery, { variables, operationName: 'FindPlatformAdmins' });
}
findPlatformAdmins.operationName = 'FindPlatformAdmins';

const adminListCompaniesQuery = "query AdminListCompanies($status: String) @auth(level: NO_ACCESS) {\n  companies(where: { deletedAt: { isNull: true }, status: { eq: $status } }, orderBy: { createdAt: DESC }) {\n    id\n    name\n    email\n    phone\n    website\n    industry\n    size\n    country\n    city\n    description\n    status\n    isVerified\n    createdAt\n    admin {\n      id\n      fullName\n      email\n    }\n  }\n}";
export async function adminListCompanies(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(adminListCompaniesQuery, { variables, operationName: 'AdminListCompanies' });
}
adminListCompanies.operationName = 'AdminListCompanies';

const allOpportunityStatusesQuery = "query AllOpportunityStatuses @auth(level: NO_ACCESS) {\n  jobOpportunities {\n    id\n    status\n  }\n}";
export async function allOpportunityStatuses(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(allOpportunityStatusesQuery, { variables, operationName: 'AllOpportunityStatuses' });
}
allOpportunityStatuses.operationName = 'AllOpportunityStatuses';

const topSkillsQuery = "query TopSkills($limit: Int!) @auth(level: NO_ACCESS) {\n  employeeSkills(limit: $limit) {\n    id\n    skillId\n  }\n}";
export async function topSkills(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphqlRead(topSkillsQuery, { variables, operationName: 'TopSkills' });
}
topSkills.operationName = 'TopSkills';

const createUserQuery = "mutation CreateUser(\n  $email: String!\n  $passwordHash: String!\n  $fullName: String!\n  $phone: String\n  $role: String!\n  $companyId: UUID\n  $employeeRefId: UUID\n) @auth(level: NO_ACCESS) {\n  user_insert(\n    data: {\n      email: $email\n      passwordHash: $passwordHash\n      fullName: $fullName\n      phone: $phone\n      role: $role\n      companyId: $companyId\n      employeeRefId: $employeeRefId\n      isActive: true\n    }\n  )\n}";
export async function createUser(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createUserQuery, { variables, operationName: 'CreateUser' });
}
createUser.operationName = 'CreateUser';

const updateUserLastLoginQuery = "mutation UpdateUserLastLogin($id: UUID!) @auth(level: NO_ACCESS) {\n  user_update(key: { id: $id }, data: { lastLogin_expr: \"request.time\" })\n}";
export async function updateUserLastLogin(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateUserLastLoginQuery, { variables, operationName: 'UpdateUserLastLogin' });
}
updateUserLastLogin.operationName = 'UpdateUserLastLogin';

const setUserCompanyAndEmployeeQuery = "mutation SetUserCompanyAndEmployee($id: UUID!, $companyId: UUID, $employeeRefId: UUID) @auth(level: NO_ACCESS) {\n  user_update(key: { id: $id }, data: { companyId: $companyId, employeeRefId: $employeeRefId })\n}";
export async function setUserCompanyAndEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(setUserCompanyAndEmployeeQuery, { variables, operationName: 'SetUserCompanyAndEmployee' });
}
setUserCompanyAndEmployee.operationName = 'SetUserCompanyAndEmployee';

const createCompanyQuery = "mutation CreateCompany(\n  $name: String!\n  $email: String!\n  $phone: String\n  $website: String\n  $industry: String\n  $size: String\n  $country: String\n  $city: String\n  $description: String\n  $adminId: UUID\n) @auth(level: NO_ACCESS) {\n  company_insert(\n    data: {\n      name: $name\n      email: $email\n      phone: $phone\n      website: $website\n      industry: $industry\n      size: $size\n      country: $country\n      city: $city\n      description: $description\n      adminId: $adminId\n      status: \"pending\"\n    }\n  )\n}";
export async function createCompany(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createCompanyQuery, { variables, operationName: 'CreateCompany' });
}
createCompany.operationName = 'CreateCompany';

const setCompanyAdminQuery = "mutation SetCompanyAdmin($id: UUID!, $adminId: UUID!) @auth(level: NO_ACCESS) {\n  company_update(key: { id: $id }, data: { adminId: $adminId })\n}";
export async function setCompanyAdmin(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(setCompanyAdminQuery, { variables, operationName: 'SetCompanyAdmin' });
}
setCompanyAdmin.operationName = 'SetCompanyAdmin';

const updateCompanyStatusQuery = "mutation UpdateCompanyStatus($id: UUID!, $status: String!, $isVerified: Boolean!) @auth(level: NO_ACCESS) {\n  company_update(key: { id: $id }, data: { status: $status, isVerified: $isVerified })\n}";
export async function updateCompanyStatus(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateCompanyStatusQuery, { variables, operationName: 'UpdateCompanyStatus' });
}
updateCompanyStatus.operationName = 'UpdateCompanyStatus';

const createCompanyMembershipQuery = "mutation CreateCompanyMembership(\n  $userId: UUID!\n  $companyId: UUID!\n  $role: String!\n  $invitedBy: UUID\n) @auth(level: NO_ACCESS) {\n  companyMembership_insert(\n    data: {\n      userId: $userId\n      companyId: $companyId\n      role: $role\n      isActive: true\n      invitedBy: { id: $invitedBy }\n    }\n  )\n}";
export async function createCompanyMembership(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createCompanyMembershipQuery, { variables, operationName: 'CreateCompanyMembership' });
}
createCompanyMembership.operationName = 'CreateCompanyMembership';

const createEmployeeQuery = "mutation CreateEmployee(\n  $userId: UUID\n  $companyId: UUID!\n  $firstName: String!\n  $lastName: String!\n  $email: String!\n  $phone: String\n  $jobTitle: String!\n  $department: String!\n  $employmentType: String\n  $employmentStatus: String\n  $startDate: Date!\n  $endDate: Date\n  $managerId: UUID\n  $profilePhoto: String\n  $location: String\n) @auth(level: NO_ACCESS) {\n  employee_insert(\n    data: {\n      userId: $userId\n      companyId: $companyId\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      phone: $phone\n      jobTitle: $jobTitle\n      department: $department\n      employmentType: $employmentType\n      employmentStatus: $employmentStatus\n      startDate: $startDate\n      endDate: $endDate\n      managerId: $managerId\n      profilePhoto: $profilePhoto\n      location: $location\n    }\n  )\n}";
export async function createEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createEmployeeQuery, { variables, operationName: 'CreateEmployee' });
}
createEmployee.operationName = 'CreateEmployee';

const updateEmployeeQuery = "mutation UpdateEmployee(\n  $id: UUID!\n  $firstName: String\n  $lastName: String\n  $phone: String\n  $jobTitle: String\n  $department: String\n  $employmentType: String\n  $employmentStatus: String\n  $startDate: Date\n  $endDate: Date\n  $managerId: UUID\n  $profilePhoto: String\n  $location: String\n) @auth(level: NO_ACCESS) {\n  employee_update(\n    key: { id: $id }\n    data: {\n      firstName: $firstName\n      lastName: $lastName\n      phone: $phone\n      jobTitle: $jobTitle\n      department: $department\n      employmentType: $employmentType\n      employmentStatus: $employmentStatus\n      startDate: $startDate\n      endDate: $endDate\n      managerId: $managerId\n      profilePhoto: $profilePhoto\n      location: $location\n    }\n  )\n}";
export async function updateEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateEmployeeQuery, { variables, operationName: 'UpdateEmployee' });
}
updateEmployee.operationName = 'UpdateEmployee';

const softDeleteEmployeeQuery = "mutation SoftDeleteEmployee($id: UUID!) @auth(level: NO_ACCESS) {\n  employee_update(key: { id: $id }, data: { deletedAt_expr: \"request.time\" })\n}";
export async function softDeleteEmployee(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(softDeleteEmployeeQuery, { variables, operationName: 'SoftDeleteEmployee' });
}
softDeleteEmployee.operationName = 'SoftDeleteEmployee';

const verifyEmployeeRecordQuery = "mutation VerifyEmployeeRecord($id: UUID!, $verifiedBy: UUID!) @auth(level: NO_ACCESS) {\n  employee_update(\n    key: { id: $id }\n    data: { isVerified: true, verifiedAt_expr: \"request.time\", verifiedById: $verifiedBy }\n  )\n}";
export async function verifyEmployeeRecord(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(verifyEmployeeRecordQuery, { variables, operationName: 'VerifyEmployeeRecord' });
}
verifyEmployeeRecord.operationName = 'VerifyEmployeeRecord';

const endEmployeeEmploymentQuery = "mutation EndEmployeeEmployment($id: UUID!, $endDate: Date!) @auth(level: NO_ACCESS) {\n  employee_update(\n    key: { id: $id }\n    data: { employmentStatus: \"inactive\", endDate: $endDate }\n  )\n}";
export async function endEmployeeEmployment(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(endEmployeeEmploymentQuery, { variables, operationName: 'EndEmployeeEmployment' });
}
endEmployeeEmployment.operationName = 'EndEmployeeEmployment';

const createSkillQuery = "mutation CreateSkill($name: String!, $category: String) @auth(level: NO_ACCESS) {\n  skill_insert(data: { name: $name, category: $category })\n}";
export async function createSkill(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createSkillQuery, { variables, operationName: 'CreateSkill' });
}
createSkill.operationName = 'CreateSkill';

const addEmployeeSkillQuery = "mutation AddEmployeeSkill(\n  $employeeId: UUID!\n  $skillId: UUID!\n  $proficiencyLevel: String!\n  $initialLevel: String\n  $yearsExperience: Float\n) @auth(level: NO_ACCESS) {\n  employeeSkill_insert(\n    data: {\n      employeeId: $employeeId\n      skillId: $skillId\n      proficiencyLevel: $proficiencyLevel\n      initialLevel: $initialLevel\n      lastAssessed_expr: \"request.time\"\n      yearsExperience: $yearsExperience\n    }\n  )\n}";
export async function addEmployeeSkill(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(addEmployeeSkillQuery, { variables, operationName: 'AddEmployeeSkill' });
}
addEmployeeSkill.operationName = 'AddEmployeeSkill';

const updateEmployeeSkillQuery = "mutation UpdateEmployeeSkill(\n  $employeeId: UUID!\n  $skillId: UUID!\n  $proficiencyLevel: String\n  $initialLevel: String\n  $yearsExperience: Float\n  $isVerified: Boolean\n  $verifiedBy: UUID\n  $verificationDate: Timestamp\n) @auth(level: NO_ACCESS) {\n  employeeSkill_update(\n    key: { employeeId: $employeeId, skillId: $skillId }\n    data: {\n      proficiencyLevel: $proficiencyLevel\n      initialLevel: $initialLevel\n      yearsExperience: $yearsExperience\n      isVerified: $isVerified\n      verifiedBy: $verifiedBy\n      verificationDate: $verificationDate\n      lastAssessed_expr: \"request.time\"\n    }\n  )\n}";
export async function updateEmployeeSkill(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateEmployeeSkillQuery, { variables, operationName: 'UpdateEmployeeSkill' });
}
updateEmployeeSkill.operationName = 'UpdateEmployeeSkill';

const createProjectQuery = "mutation CreateProject(\n  $employeeId: UUID!\n  $companyId: UUID!\n  $name: String!\n  $description: String\n  $role: String\n  $technologies: String\n  $startDate: Date\n  $endDate: Date\n  $status: String\n  $contributionSummary: String\n  $performanceRating: Float\n) @auth(level: NO_ACCESS) {\n  project_insert(\n    data: {\n      employeeId: $employeeId\n      companyId: $companyId\n      name: $name\n      description: $description\n      role: $role\n      technologies: $technologies\n      startDate: $startDate\n      endDate: $endDate\n      status: $status\n      contributionSummary: $contributionSummary\n      performanceRating: $performanceRating\n    }\n  )\n}";
export async function createProject(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createProjectQuery, { variables, operationName: 'CreateProject' });
}
createProject.operationName = 'CreateProject';

const updateProjectQuery = "mutation UpdateProject(\n  $id: UUID!\n  $name: String\n  $description: String\n  $role: String\n  $technologies: String\n  $startDate: Date\n  $endDate: Date\n  $status: String\n  $contributionSummary: String\n  $performanceRating: Float\n  $isVerified: Boolean\n  $verifiedBy: UUID\n  $verificationDate: Timestamp\n) @auth(level: NO_ACCESS) {\n  project_update(\n    key: { id: $id }\n    data: {\n      name: $name\n      description: $description\n      role: $role\n      technologies: $technologies\n      startDate: $startDate\n      endDate: $endDate\n      status: $status\n      contributionSummary: $contributionSummary\n      performanceRating: $performanceRating\n      isVerified: $isVerified\n      verifiedById: $verifiedBy\n      verificationDate: $verificationDate\n    }\n  )\n}";
export async function updateProject(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateProjectQuery, { variables, operationName: 'UpdateProject' });
}
updateProject.operationName = 'UpdateProject';

const createBehaviorRatingQuery = "mutation CreateBehaviorRating(\n  $employeeId: UUID!\n  $companyId: UUID!\n  $category: String!\n  $rating: Int!\n  $reviewerId: UUID!\n  $reviewDate: Date!\n  $comments: String\n) @auth(level: NO_ACCESS) {\n  employeeBehaviorRating_insert(\n    data: {\n      employeeId: $employeeId\n      companyId: $companyId\n      category: $category\n      rating: $rating\n      reviewerId: $reviewerId\n      reviewDate: $reviewDate\n      comments: $comments\n    }\n  )\n}";
export async function createBehaviorRating(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createBehaviorRatingQuery, { variables, operationName: 'CreateBehaviorRating' });
}
createBehaviorRating.operationName = 'CreateBehaviorRating';

const createAchievementQuery = "mutation CreateAchievement(\n  $employeeId: UUID!\n  $companyId: UUID!\n  $title: String!\n  $description: String\n  $date: Date\n  $category: String\n  $evidenceUrl: String\n) @auth(level: NO_ACCESS) {\n  achievement_insert(\n    data: {\n      employeeId: $employeeId\n      companyId: $companyId\n      title: $title\n      description: $description\n      date: $date\n      category: $category\n      evidenceUrl: $evidenceUrl\n    }\n  )\n}";
export async function createAchievement(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createAchievementQuery, { variables, operationName: 'CreateAchievement' });
}
createAchievement.operationName = 'CreateAchievement';

const verifyAchievementQuery = "mutation VerifyAchievement($id: UUID!, $verifiedBy: UUID!) @auth(level: NO_ACCESS) {\n  achievement_update(\n    key: { id: $id }\n    data: { isVerified: true, verifiedById: $verifiedBy }\n  )\n}";
export async function verifyAchievement(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(verifyAchievementQuery, { variables, operationName: 'VerifyAchievement' });
}
verifyAchievement.operationName = 'VerifyAchievement';

const createPerformanceReviewQuery = "mutation CreatePerformanceReview(\n  $employeeId: UUID!\n  $companyId: UUID!\n  $reviewerId: UUID!\n  $period: String!\n  $rating: Float!\n  $comments: String\n  $strengths: String\n  $areasForImprovement: String\n  $goalsCompleted: Int\n  $goalsPending: Int\n) @auth(level: NO_ACCESS) {\n  performanceReview_insert(\n    data: {\n      employeeId: $employeeId\n      companyId: $companyId\n      reviewerId: $reviewerId\n      period: $period\n      rating: $rating\n      comments: $comments\n      strengths: $strengths\n      areasForImprovement: $areasForImprovement\n      goalsCompleted: $goalsCompleted\n      goalsPending: $goalsPending\n    }\n  )\n}";
export async function createPerformanceReview(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createPerformanceReviewQuery, { variables, operationName: 'CreatePerformanceReview' });
}
createPerformanceReview.operationName = 'CreatePerformanceReview';

const createMonthlyReportQuery = "mutation CreateMonthlyReport(\n  $employeeId: UUID!\n  $companyId: UUID!\n  $month: String!\n  $year: Int!\n  $performanceScore: Float\n  $behaviorScore: Float\n  $skillsImproved: String\n  $skillsNeedingDevelopment: String\n  $projectsCompleted: Int\n  $projectsInProgress: Int\n  $goalsCompleted: Int\n  $goalsPending: Int\n  $growthPercentage: Float\n  $promotionReadiness: Float\n  $nextRole: String\n  $isAiGenerated: Boolean\n  $reportData: String\n) @auth(level: NO_ACCESS) {\n  monthlyProgressReport_insert(\n    data: {\n      employeeId: $employeeId\n      companyId: $companyId\n      month: $month\n      year: $year\n      performanceScore: $performanceScore\n      behaviorScore: $behaviorScore\n      skillsImproved: $skillsImproved\n      skillsNeedingDevelopment: $skillsNeedingDevelopment\n      projectsCompleted: $projectsCompleted\n      projectsInProgress: $projectsInProgress\n      goalsCompleted: $goalsCompleted\n      goalsPending: $goalsPending\n      growthPercentage: $growthPercentage\n      promotionReadiness: $promotionReadiness\n      nextRole: $nextRole\n      isAiGenerated: $isAiGenerated\n      reportData: $reportData\n    }\n  )\n}";
export async function createMonthlyReport(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createMonthlyReportQuery, { variables, operationName: 'CreateMonthlyReport' });
}
createMonthlyReport.operationName = 'CreateMonthlyReport';

const updateMonthlyReportQuery = "mutation UpdateMonthlyReport(\n  $id: UUID!\n  $performanceScore: Float\n  $behaviorScore: Float\n  $skillsImproved: String\n  $skillsNeedingDevelopment: String\n  $projectsCompleted: Int\n  $projectsInProgress: Int\n  $goalsCompleted: Int\n  $goalsPending: Int\n  $growthPercentage: Float\n  $promotionReadiness: Float\n  $nextRole: String\n  $isAiGenerated: Boolean\n  $reportData: String\n) @auth(level: NO_ACCESS) {\n  monthlyProgressReport_update(\n    key: { id: $id }\n    data: {\n      performanceScore: $performanceScore\n      behaviorScore: $behaviorScore\n      skillsImproved: $skillsImproved\n      skillsNeedingDevelopment: $skillsNeedingDevelopment\n      projectsCompleted: $projectsCompleted\n      projectsInProgress: $projectsInProgress\n      goalsCompleted: $goalsCompleted\n      goalsPending: $goalsPending\n      growthPercentage: $growthPercentage\n      promotionReadiness: $promotionReadiness\n      nextRole: $nextRole\n      isAiGenerated: $isAiGenerated\n      reportData: $reportData\n      generatedDate_expr: \"request.time\"\n    }\n  )\n}";
export async function updateMonthlyReport(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateMonthlyReportQuery, { variables, operationName: 'UpdateMonthlyReport' });
}
updateMonthlyReport.operationName = 'UpdateMonthlyReport';

const createPrivacySettingsQuery = "mutation CreatePrivacySettings(\n  $employeeId: UUID!\n  $companyId: UUID!\n  $profileVisibility: String\n) @auth(level: NO_ACCESS) {\n  privacySettings_insert(\n    data: { employeeId: $employeeId, companyId: $companyId, profileVisibility: $profileVisibility }\n  )\n}";
export async function createPrivacySettings(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createPrivacySettingsQuery, { variables, operationName: 'CreatePrivacySettings' });
}
createPrivacySettings.operationName = 'CreatePrivacySettings';

const updatePrivacySettingsQuery = "mutation UpdatePrivacySettings(\n  $privacyId: UUID!\n  $profileVisibility: String\n  $namePublic: Boolean\n  $photoPublic: Boolean\n  $rolePublic: Boolean\n  $skillsPublic: Boolean\n  $skillLevelsPublic: Boolean\n  $skillGrowthPublic: Boolean\n  $projectsPublic: Boolean\n  $projectDescriptionsPublic: Boolean\n  $achievementsPublic: Boolean\n  $experiencePublic: Boolean\n  $performanceSummaryPublic: Boolean\n  $monthlyProgressPublic: Boolean\n  $behaviorSummaryPublic: Boolean\n  $isEmployeeControlled: Boolean\n  $ownershipTransferredAt: Timestamp\n  $publishedAt: Timestamp\n) @auth(level: NO_ACCESS) {\n  privacySettings_update(\n    key: { id: $privacyId }\n    data: {\n      profileVisibility: $profileVisibility\n      namePublic: $namePublic\n      photoPublic: $photoPublic\n      rolePublic: $rolePublic\n      skillsPublic: $skillsPublic\n      skillLevelsPublic: $skillLevelsPublic\n      skillGrowthPublic: $skillGrowthPublic\n      projectsPublic: $projectsPublic\n      projectDescriptionsPublic: $projectDescriptionsPublic\n      achievementsPublic: $achievementsPublic\n      experiencePublic: $experiencePublic\n      performanceSummaryPublic: $performanceSummaryPublic\n      monthlyProgressPublic: $monthlyProgressPublic\n      behaviorSummaryPublic: $behaviorSummaryPublic\n      isEmployeeControlled: $isEmployeeControlled\n      ownershipTransferredAt: $ownershipTransferredAt\n      publishedAt: $publishedAt\n    }\n  )\n}";
export async function updatePrivacySettings(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updatePrivacySettingsQuery, { variables, operationName: 'UpdatePrivacySettings' });
}
updatePrivacySettings.operationName = 'UpdatePrivacySettings';

const transferPrivacyOwnershipQuery = "mutation TransferPrivacyOwnership($privacyId: UUID!) @auth(level: NO_ACCESS) {\n  privacySettings_update(\n    key: { id: $privacyId }\n    data: { isEmployeeControlled: true, ownershipTransferredAt_expr: \"request.time\" }\n  )\n}";
export async function transferPrivacyOwnership(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(transferPrivacyOwnershipQuery, { variables, operationName: 'TransferPrivacyOwnership' });
}
transferPrivacyOwnership.operationName = 'TransferPrivacyOwnership';

const markPrivacyPublishedQuery = "mutation MarkPrivacyPublished($privacyId: UUID!) @auth(level: NO_ACCESS) {\n  privacySettings_update(\n    key: { id: $privacyId }\n    data: { publishedAt_expr: \"request.time\" }\n  )\n}";
export async function markPrivacyPublished(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(markPrivacyPublishedQuery, { variables, operationName: 'MarkPrivacyPublished' });
}
markPrivacyPublished.operationName = 'MarkPrivacyPublished';

const createPublicProfileQuery = "mutation CreatePublicProfile(\n  $employeeId: UUID!\n  $companyId: UUID!\n  $slug: String!\n) @auth(level: NO_ACCESS) {\n  publicProfile_insert(\n    data: { employeeId: $employeeId, companyId: $companyId, slug: $slug, isPublic: true }\n  )\n}";
export async function createPublicProfile(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createPublicProfileQuery, { variables, operationName: 'CreatePublicProfile' });
}
createPublicProfile.operationName = 'CreatePublicProfile';

const updatePublicProfileVisibilityQuery = "mutation UpdatePublicProfileVisibility($profileId: UUID!, $isPublic: Boolean!) @auth(level: NO_ACCESS) {\n  publicProfile_update(key: { id: $profileId }, data: { isPublic: $isPublic })\n}";
export async function updatePublicProfileVisibility(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updatePublicProfileVisibilityQuery, { variables, operationName: 'UpdatePublicProfileVisibility' });
}
updatePublicProfileVisibility.operationName = 'UpdatePublicProfileVisibility';

const incrementPublicProfileViewsQuery = "mutation IncrementPublicProfileViews($profileId: UUID!, $viewCount: Int!) @auth(level: NO_ACCESS) {\n  publicProfile_update(\n    key: { id: $profileId }\n    data: {\n      viewCount: $viewCount\n      lastViewedAt_expr: \"request.time\"\n    }\n  )\n}";
export async function incrementPublicProfileViews(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(incrementPublicProfileViewsQuery, { variables, operationName: 'IncrementPublicProfileViews' });
}
incrementPublicProfileViews.operationName = 'IncrementPublicProfileViews';

const createVerificationCorrectionQuery = "mutation CreateVerificationCorrection(\n  $employeeId: UUID!\n  $companyId: UUID!\n  $fieldName: String!\n  $oldValue: String\n  $newValue: String\n  $reason: String\n  $requestedBy: UUID\n) @auth(level: NO_ACCESS) {\n  verificationCorrection_insert(\n    data: {\n      employeeId: $employeeId\n      companyId: $companyId\n      fieldName: $fieldName\n      oldValue: $oldValue\n      newValue: $newValue\n      reason: $reason\n      status: \"pending\"\n      requestedById: $requestedBy\n    }\n  )\n}";
export async function createVerificationCorrection(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createVerificationCorrectionQuery, { variables, operationName: 'CreateVerificationCorrection' });
}
createVerificationCorrection.operationName = 'CreateVerificationCorrection';

const updateVerificationCorrectionStatusQuery = "mutation UpdateVerificationCorrectionStatus($id: UUID!, $status: String!, $reviewedBy: UUID!) @auth(level: NO_ACCESS) {\n  verificationCorrection_update(\n    key: { id: $id }\n    data: { status: $status, reviewedById: $reviewedBy }\n  )\n}";
export async function updateVerificationCorrectionStatus(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateVerificationCorrectionStatusQuery, { variables, operationName: 'UpdateVerificationCorrectionStatus' });
}
updateVerificationCorrectionStatus.operationName = 'UpdateVerificationCorrectionStatus';

const createJobOpportunityQuery = "mutation CreateJobOpportunity(\n  $recruiterId: UUID!\n  $employeeId: UUID!\n  $title: String!\n  $companyName: String!\n  $description: String\n  $message: String\n  $salaryRange: String\n  $location: String\n) @auth(level: NO_ACCESS) {\n  jobOpportunity_insert(\n    data: {\n      recruiterId: $recruiterId\n      employeeId: $employeeId\n      title: $title\n      companyName: $companyName\n      description: $description\n      message: $message\n      salaryRange: $salaryRange\n      location: $location\n      status: \"sent\"\n    }\n  )\n}";
export async function createJobOpportunity(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createJobOpportunityQuery, { variables, operationName: 'CreateJobOpportunity' });
}
createJobOpportunity.operationName = 'CreateJobOpportunity';

const updateJobOpportunityStatusQuery = "mutation UpdateJobOpportunityStatus($id: UUID!, $status: String!, $viewedAt: Timestamp, $respondedAt: Timestamp) @auth(level: NO_ACCESS) {\n  jobOpportunity_update(\n    key: { id: $id }\n    data: { status: $status, viewedAt: $viewedAt, respondedAt: $respondedAt }\n  )\n}";
export async function updateJobOpportunityStatus(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateJobOpportunityStatusQuery, { variables, operationName: 'UpdateJobOpportunityStatus' });
}
updateJobOpportunityStatus.operationName = 'UpdateJobOpportunityStatus';

const createEmploymentLinkQuery = "mutation CreateEmploymentLink(\n  $personEmail: String!\n  $userId: UUID\n  $employeeId: UUID!\n  $companyId: UUID!\n  $jobTitle: String\n  $department: String\n  $startedAt: Date\n  $source: String\n) @auth(level: NO_ACCESS) {\n  employmentLink_insert(\n    data: {\n      personEmail: $personEmail\n      userId: $userId\n      employeeId: $employeeId\n      companyId: $companyId\n      jobTitle: $jobTitle\n      department: $department\n      startedAt: $startedAt\n      isCurrent: true\n      source: $source\n    }\n  )\n}";
export async function createEmploymentLink(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createEmploymentLinkQuery, { variables, operationName: 'CreateEmploymentLink' });
}
createEmploymentLink.operationName = 'CreateEmploymentLink';

const markEmploymentLinkLeftQuery = "mutation MarkEmploymentLinkLeft($linkId: UUID!, $leftAt: Date!) @auth(level: NO_ACCESS) {\n  employmentLink_update(\n    key: { id: $linkId }\n    data: { leftAt: $leftAt, isCurrent: false }\n  )\n}";
export async function markEmploymentLinkLeft(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(markEmploymentLinkLeftQuery, { variables, operationName: 'MarkEmploymentLinkLeft' });
}
markEmploymentLinkLeft.operationName = 'MarkEmploymentLinkLeft';

const attachUserToEmploymentLinksQuery = "mutation AttachUserToEmploymentLinks($personEmail: String!, $userId: UUID!) @auth(level: NO_ACCESS) {\n  employmentLink_updateMany(\n    where: { personEmail: { eq: $personEmail } }\n    data: { userId: $userId }\n  )\n}";
export async function attachUserToEmploymentLinks(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(attachUserToEmploymentLinksQuery, { variables, operationName: 'AttachUserToEmploymentLinks' });
}
attachUserToEmploymentLinks.operationName = 'AttachUserToEmploymentLinks';

const createNotificationQuery = "mutation CreateNotification(\n  $userId: UUID!\n  $type: String!\n  $title: String!\n  $message: String!\n  $link: String\n  $metadata: String\n) @auth(level: NO_ACCESS) {\n  notification_insert(\n    data: { userId: $userId, type: $type, title: $title, message: $message, link: $link, metadata: $metadata }\n  )\n}";
export async function createNotification(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createNotificationQuery, { variables, operationName: 'CreateNotification' });
}
createNotification.operationName = 'CreateNotification';

const markNotificationReadQuery = "mutation MarkNotificationRead($id: UUID!) @auth(level: NO_ACCESS) {\n  notification_update(\n    key: { id: $id }\n    data: { isRead: true, readAt_expr: \"request.time\" }\n  )\n}";
export async function markNotificationRead(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(markNotificationReadQuery, { variables, operationName: 'MarkNotificationRead' });
}
markNotificationRead.operationName = 'MarkNotificationRead';

const markAllNotificationsReadQuery = "mutation MarkAllNotificationsRead($userId: UUID!) @auth(level: NO_ACCESS) {\n  notification_updateMany(\n    where: { userId: { eq: $userId }, isRead: { eq: false } }\n    data: { isRead: true, readAt_expr: \"request.time\" }\n  )\n}";
export async function markAllNotificationsRead(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(markAllNotificationsReadQuery, { variables, operationName: 'MarkAllNotificationsRead' });
}
markAllNotificationsRead.operationName = 'MarkAllNotificationsRead';

const createAuditLogQuery = "mutation CreateAuditLog(\n  $userId: UUID!\n  $role: String!\n  $action: String!\n  $entityType: String\n  $entityId: String\n  $details: String\n  $ipAddress: String\n  $userAgent: String\n) @auth(level: NO_ACCESS) {\n  auditLog_insert(\n    data: {\n      userId: $userId\n      role: $role\n      action: $action\n      entityType: $entityType\n      entityId: $entityId\n      details: $details\n      ipAddress: $ipAddress\n      userAgent: $userAgent\n    }\n  )\n}";
export async function createAuditLog(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createAuditLogQuery, { variables, operationName: 'CreateAuditLog' });
}
createAuditLog.operationName = 'CreateAuditLog';

const createInternalProjectQuery = "mutation CreateInternalProject(\n  $companyId: UUID!\n  $name: String!\n  $description: String\n  $department: String\n  $clientName: String\n  $startDate: Date\n  $endDate: Date\n  $priority: String\n  $status: String\n  $projectLead: String\n  $requiredRoles: String\n  $openPositions: Int\n  $filledPositions: Int\n  $tasksCompleted: Int\n  $tasksRemaining: Int\n  $progress: Int\n  $assignedRecruiters: String\n  $assignedEmployees: String\n  $documents: String\n  $createdBy: UUID\n) @auth(level: NO_ACCESS) {\n  internalProject_insert(\n    data: {\n      companyId: $companyId\n      name: $name\n      description: $description\n      department: $department\n      clientName: $clientName\n      startDate: $startDate\n      endDate: $endDate\n      priority: $priority\n      status: $status\n      projectLead: $projectLead\n      requiredRoles: $requiredRoles\n      openPositions: $openPositions\n      filledPositions: $filledPositions\n      tasksCompleted: $tasksCompleted\n      tasksRemaining: $tasksRemaining\n      progress: $progress\n      assignedRecruiters: $assignedRecruiters\n      assignedEmployees: $assignedEmployees\n      documents: $documents\n      createdById: $createdBy\n    }\n  )\n}";
export async function createInternalProject(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createInternalProjectQuery, { variables, operationName: 'CreateInternalProject' });
}
createInternalProject.operationName = 'CreateInternalProject';

const updateInternalProjectQuery = "mutation UpdateInternalProject(\n  $id: UUID!\n  $name: String\n  $description: String\n  $department: String\n  $clientName: String\n  $startDate: Date\n  $endDate: Date\n  $priority: String\n  $status: String\n  $projectLead: String\n  $requiredRoles: String\n  $openPositions: Int\n  $filledPositions: Int\n  $tasksCompleted: Int\n  $tasksRemaining: Int\n  $progress: Int\n  $assignedRecruiters: String\n  $assignedEmployees: String\n  $documents: String\n) @auth(level: NO_ACCESS) {\n  internalProject_update(\n    key: { id: $id }\n    data: {\n      name: $name\n      description: $description\n      department: $department\n      clientName: $clientName\n      startDate: $startDate\n      endDate: $endDate\n      priority: $priority\n      status: $status\n      projectLead: $projectLead\n      requiredRoles: $requiredRoles\n      openPositions: $openPositions\n      filledPositions: $filledPositions\n      tasksCompleted: $tasksCompleted\n      tasksRemaining: $tasksRemaining\n      progress: $progress\n      assignedRecruiters: $assignedRecruiters\n      assignedEmployees: $assignedEmployees\n      documents: $documents\n    }\n  )\n}";
export async function updateInternalProject(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateInternalProjectQuery, { variables, operationName: 'UpdateInternalProject' });
}
updateInternalProject.operationName = 'UpdateInternalProject';

const softDeleteInternalProjectQuery = "mutation SoftDeleteInternalProject($id: UUID!) @auth(level: NO_ACCESS) {\n  internalProject_update(key: { id: $id }, data: { deletedAt_expr: \"request.time\" })\n}";
export async function softDeleteInternalProject(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(softDeleteInternalProjectQuery, { variables, operationName: 'SoftDeleteInternalProject' });
}
softDeleteInternalProject.operationName = 'SoftDeleteInternalProject';

const createInvitationQuery = "mutation CreateInvitation(\n  $companyId: UUID!\n  $email: String!\n  $tokenHash: String!\n  $firstName: String\n  $lastName: String\n  $jobTitle: String\n  $department: String\n  $invitedBy: UUID!\n  $expiresAt: Timestamp!\n) @auth(level: NO_ACCESS) {\n  employeeInvitation_insert(\n    data: {\n      companyId: $companyId\n      email: $email\n      tokenHash: $tokenHash\n      firstName: $firstName\n      lastName: $lastName\n      jobTitle: $jobTitle\n      department: $department\n      status: \"pending\"\n      invitedById: $invitedBy\n      expiresAt: $expiresAt\n    }\n  )\n}";
export async function createInvitation(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(createInvitationQuery, { variables, operationName: 'CreateInvitation' });
}
createInvitation.operationName = 'CreateInvitation';

const markInvitationAcceptedQuery = "mutation MarkInvitationAccepted($id: UUID!) @auth(level: NO_ACCESS) {\n  employeeInvitation_update(\n    key: { id: $id }\n    data: { status: \"accepted\", acceptedAt_expr: \"request.time\" }\n  )\n}";
export async function markInvitationAccepted(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(markInvitationAcceptedQuery, { variables, operationName: 'MarkInvitationAccepted' });
}
markInvitationAccepted.operationName = 'MarkInvitationAccepted';

const saveCandidateQuery = "mutation SaveCandidate($recruiterId: UUID!, $employeeId: UUID!, $notes: String) @auth(level: NO_ACCESS) {\n  savedCandidate_insert(\n    data: { recruiterId: $recruiterId, employeeId: $employeeId, notes: $notes }\n  )\n}";
export async function saveCandidate(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(saveCandidateQuery, { variables, operationName: 'SaveCandidate' });
}
saveCandidate.operationName = 'SaveCandidate';

const updateSavedCandidateNotesQuery = "mutation UpdateSavedCandidateNotes($recruiterId: UUID!, $employeeId: UUID!, $notes: String) @auth(level: NO_ACCESS) {\n  savedCandidate_update(\n    key: { recruiterId: $recruiterId, employeeId: $employeeId }\n    data: { notes: $notes }\n  )\n}";
export async function updateSavedCandidateNotes(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(updateSavedCandidateNotesQuery, { variables, operationName: 'UpdateSavedCandidateNotes' });
}
updateSavedCandidateNotes.operationName = 'UpdateSavedCandidateNotes';

const deleteSavedCandidateQuery = "mutation DeleteSavedCandidate($recruiterId: UUID!, $employeeId: UUID!) @auth(level: NO_ACCESS) {\n  savedCandidate_delete(key: { recruiterId: $recruiterId, employeeId: $employeeId })\n}";
export async function deleteSavedCandidate(dcOrVars, vars) {
  let dc = dcOrVars;
  let variables = vars;
  if (!dc || typeof dc.executeGraphql !== 'function') {
    // First arg was actually the variables object; resolve default DataConnect instance.
    variables = dcOrVars;
    dc = resolveDataConnect();
  } else {
    dc = resolveDataConnect(dc);
  }
  return dc.executeGraphql(deleteSavedCandidateQuery, { variables, operationName: 'DeleteSavedCandidate' });
}
deleteSavedCandidate.operationName = 'DeleteSavedCandidate';

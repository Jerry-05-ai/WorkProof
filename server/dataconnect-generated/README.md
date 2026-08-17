# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserByEmail*](#getuserbyemail)
  - [*GetUserById*](#getuserbyid)
  - [*GetCompanyById*](#getcompanybyid)
  - [*GetCompanyByName*](#getcompanybyname)
  - [*GetCompanyByEmail*](#getcompanybyemail)
  - [*GetEmployeeById*](#getemployeebyid)
  - [*GetEmployeeByEmail*](#getemployeebyemail)
  - [*ListEmployeesByCompany*](#listemployeesbycompany)
  - [*SearchEmployees*](#searchemployees)
  - [*GetSkillByName*](#getskillbyname)
  - [*ListSkillsByEmployee*](#listskillsbyemployee)
  - [*GetEmployeeSkillByPair*](#getemployeeskillbypair)
  - [*ListProjectsByEmployee*](#listprojectsbyemployee)
  - [*ListProjectsByCompany*](#listprojectsbycompany)
  - [*ListBehaviorRatings*](#listbehaviorratings)
  - [*LatestBehaviorRatings*](#latestbehaviorratings)
  - [*ListAchievements*](#listachievements)
  - [*ListPerformanceReviews*](#listperformancereviews)
  - [*GetLatestPerformanceReview*](#getlatestperformancereview)
  - [*ListMonthlyReports*](#listmonthlyreports)
  - [*GetMonthlyReportByKey*](#getmonthlyreportbykey)
  - [*GetPrivacyByEmployee*](#getprivacybyemployee)
  - [*GetEmployeeEmploymentStatus*](#getemployeeemploymentstatus)
  - [*GetPublicProfileByEmployee*](#getpublicprofilebyemployee)
  - [*GetPublicProfileBySlug*](#getpublicprofilebyslug)
  - [*CheckSlugExists*](#checkslugexists)
  - [*ListPublicProfiles*](#listpublicprofiles)
  - [*GetVerificationCorrectionById*](#getverificationcorrectionbyid)
  - [*ListVerificationCorrectionsByEmployee*](#listverificationcorrectionsbyemployee)
  - [*ListVerificationCorrectionsByCompany*](#listverificationcorrectionsbycompany)
  - [*GetJobOpportunityById*](#getjobopportunitybyid)
  - [*ListJobOpportunitiesByRecruiter*](#listjobopportunitiesbyrecruiter)
  - [*ListJobOpportunitiesByEmployee*](#listjobopportunitiesbyemployee)
  - [*CountJobOpportunitiesByStatus*](#countjobopportunitiesbystatus)
  - [*ListEmploymentLinksByPerson*](#listemploymentlinksbyperson)
  - [*GetEmploymentLinkByEmployee*](#getemploymentlinkbyemployee)
  - [*GetCurrentEmploymentLink*](#getcurrentemploymentlink)
  - [*ListNotificationsByUser*](#listnotificationsbyuser)
  - [*ListUnreadNotificationsByUser*](#listunreadnotificationsbyuser)
  - [*GetNotificationById*](#getnotificationbyid)
  - [*CountUnreadNotifications*](#countunreadnotifications)
  - [*ListAuditLogs*](#listauditlogs)
  - [*CountAuditLogs*](#countauditlogs)
  - [*ListInternalProjectsByCompany*](#listinternalprojectsbycompany)
  - [*GetInternalProjectById*](#getinternalprojectbyid)
  - [*GetInvitationByToken*](#getinvitationbytoken)
  - [*CheckPendingInvitation*](#checkpendinginvitation)
  - [*GetSavedCandidate*](#getsavedcandidate)
  - [*ListSavedCandidatesByRecruiter*](#listsavedcandidatesbyrecruiter)
  - [*CompanyEmployeeStats*](#companyemployeestats)
  - [*CompanySkillDistribution*](#companyskilldistribution)
  - [*AdminDashboardStats*](#admindashboardstats)
  - [*FindPlatformAdmins*](#findplatformadmins)
  - [*AdminListCompanies*](#adminlistcompanies)
  - [*AllOpportunityStatuses*](#allopportunitystatuses)
  - [*TopSkills*](#topskills)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUserLastLogin*](#updateuserlastlogin)
  - [*SetUserCompanyAndEmployee*](#setusercompanyandemployee)
  - [*CreateCompany*](#createcompany)
  - [*SetCompanyAdmin*](#setcompanyadmin)
  - [*UpdateCompanyStatus*](#updatecompanystatus)
  - [*CreateCompanyMembership*](#createcompanymembership)
  - [*CreateEmployee*](#createemployee)
  - [*UpdateEmployee*](#updateemployee)
  - [*SoftDeleteEmployee*](#softdeleteemployee)
  - [*VerifyEmployeeRecord*](#verifyemployeerecord)
  - [*EndEmployeeEmployment*](#endemployeeemployment)
  - [*CreateSkill*](#createskill)
  - [*AddEmployeeSkill*](#addemployeeskill)
  - [*UpdateEmployeeSkill*](#updateemployeeskill)
  - [*CreateProject*](#createproject)
  - [*UpdateProject*](#updateproject)
  - [*CreateBehaviorRating*](#createbehaviorrating)
  - [*CreateAchievement*](#createachievement)
  - [*VerifyAchievement*](#verifyachievement)
  - [*CreatePerformanceReview*](#createperformancereview)
  - [*CreateMonthlyReport*](#createmonthlyreport)
  - [*UpdateMonthlyReport*](#updatemonthlyreport)
  - [*CreatePrivacySettings*](#createprivacysettings)
  - [*UpdatePrivacySettings*](#updateprivacysettings)
  - [*TransferPrivacyOwnership*](#transferprivacyownership)
  - [*MarkPrivacyPublished*](#markprivacypublished)
  - [*CreatePublicProfile*](#createpublicprofile)
  - [*UpdatePublicProfileVisibility*](#updatepublicprofilevisibility)
  - [*IncrementPublicProfileViews*](#incrementpublicprofileviews)
  - [*CreateVerificationCorrection*](#createverificationcorrection)
  - [*UpdateVerificationCorrectionStatus*](#updateverificationcorrectionstatus)
  - [*CreateJobOpportunity*](#createjobopportunity)
  - [*UpdateJobOpportunityStatus*](#updatejobopportunitystatus)
  - [*CreateEmploymentLink*](#createemploymentlink)
  - [*MarkEmploymentLinkLeft*](#markemploymentlinkleft)
  - [*AttachUserToEmploymentLinks*](#attachusertoemploymentlinks)
  - [*CreateNotification*](#createnotification)
  - [*MarkNotificationRead*](#marknotificationread)
  - [*MarkAllNotificationsRead*](#markallnotificationsread)
  - [*CreateAuditLog*](#createauditlog)
  - [*CreateInternalProject*](#createinternalproject)
  - [*UpdateInternalProject*](#updateinternalproject)
  - [*SoftDeleteInternalProject*](#softdeleteinternalproject)
  - [*CreateInvitation*](#createinvitation)
  - [*MarkInvitationAccepted*](#markinvitationaccepted)
  - [*SaveCandidate*](#savecandidate)
  - [*UpdateSavedCandidateNotes*](#updatesavedcandidatenotes)
  - [*DeleteSavedCandidate*](#deletesavedcandidate)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/admin-generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/admin-generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/admin-generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserByEmail
You can execute the `GetUserByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserByEmail(vars: GetUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByEmailRef:
```typescript
const name = getUserByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetUserByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserByEmailData {
  users: ({
    id: UUIDString;
    email: string;
    passwordHash: string;
    fullName: string;
    phone?: string | null;
    role: string;
    isActive: boolean;
    lastLogin?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    company?: {
      id: UUIDString;
    } & Company_Key;
    employeeRef?: {
      id: UUIDString;
    } & Employee_Key;
  } & User_Key)[];
}
```
### Using `GetUserByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByEmail, GetUserByEmailVariables } from '@dataconnect/admin-generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByEmail(getUserByEmailVars);
// Variables can be defined inline as well.
const { data } = await getUserByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByEmail(dataConnect, getUserByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByEmail(getUserByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByEmailRef, GetUserByEmailVariables } from '@dataconnect/admin-generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmailRef()` function to get a reference to the query.
const ref = getUserByEmailRef(getUserByEmailVars);
// Variables can be defined inline as well.
const ref = getUserByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByEmailRef(dataConnect, getUserByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetUserById
You can execute the `GetUserById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserById(vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByIdRef:
```typescript
const name = getUserByIdRef.operationName;
console.log(name);
```

### Variables
The `GetUserById` query requires an argument of type `GetUserByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserByIdData {
  user?: {
    id: UUIDString;
    email: string;
    passwordHash: string;
    fullName: string;
    phone?: string | null;
    role: string;
    isActive: boolean;
    lastLogin?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    company?: {
      id: UUIDString;
    } & Company_Key;
    employeeRef?: {
      id: UUIDString;
    } & Employee_Key;
  } & User_Key;
}
```
### Using `GetUserById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserById, GetUserByIdVariables } from '@dataconnect/admin-generated';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  id: ..., 
};

// Call the `getUserById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserById(getUserByIdVars);
// Variables can be defined inline as well.
const { data } = await getUserById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserById(dataConnect, getUserByIdVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserById(getUserByIdVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByIdRef, GetUserByIdVariables } from '@dataconnect/admin-generated';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  id: ..., 
};

// Call the `getUserByIdRef()` function to get a reference to the query.
const ref = getUserByIdRef(getUserByIdVars);
// Variables can be defined inline as well.
const ref = getUserByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByIdRef(dataConnect, getUserByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetCompanyById
You can execute the `GetCompanyById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCompanyById(vars: GetCompanyByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetCompanyByIdData, GetCompanyByIdVariables>;

interface GetCompanyByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCompanyByIdVariables): QueryRef<GetCompanyByIdData, GetCompanyByIdVariables>;
}
export const getCompanyByIdRef: GetCompanyByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCompanyById(dc: DataConnect, vars: GetCompanyByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetCompanyByIdData, GetCompanyByIdVariables>;

interface GetCompanyByIdRef {
  ...
  (dc: DataConnect, vars: GetCompanyByIdVariables): QueryRef<GetCompanyByIdData, GetCompanyByIdVariables>;
}
export const getCompanyByIdRef: GetCompanyByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCompanyByIdRef:
```typescript
const name = getCompanyByIdRef.operationName;
console.log(name);
```

### Variables
The `GetCompanyById` query requires an argument of type `GetCompanyByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCompanyByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCompanyById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCompanyByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCompanyByIdData {
  company?: {
    id: UUIDString;
    name: string;
    email: string;
    phone?: string | null;
    website?: string | null;
    industry?: string | null;
    size?: string | null;
    country?: string | null;
    city?: string | null;
    description?: string | null;
    status: string;
    isVerified: boolean;
    deletedAt?: TimestampString | null;
    admin?: {
      id: UUIDString;
    } & User_Key;
  } & Company_Key;
}
```
### Using `GetCompanyById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCompanyById, GetCompanyByIdVariables } from '@dataconnect/admin-generated';

// The `GetCompanyById` query requires an argument of type `GetCompanyByIdVariables`:
const getCompanyByIdVars: GetCompanyByIdVariables = {
  id: ..., 
};

// Call the `getCompanyById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCompanyById(getCompanyByIdVars);
// Variables can be defined inline as well.
const { data } = await getCompanyById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCompanyById(dataConnect, getCompanyByIdVars);

console.log(data.company);

// Or, you can use the `Promise` API.
getCompanyById(getCompanyByIdVars).then((response) => {
  const data = response.data;
  console.log(data.company);
});
```

### Using `GetCompanyById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCompanyByIdRef, GetCompanyByIdVariables } from '@dataconnect/admin-generated';

// The `GetCompanyById` query requires an argument of type `GetCompanyByIdVariables`:
const getCompanyByIdVars: GetCompanyByIdVariables = {
  id: ..., 
};

// Call the `getCompanyByIdRef()` function to get a reference to the query.
const ref = getCompanyByIdRef(getCompanyByIdVars);
// Variables can be defined inline as well.
const ref = getCompanyByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCompanyByIdRef(dataConnect, getCompanyByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.company);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.company);
});
```

## GetCompanyByName
You can execute the `GetCompanyByName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCompanyByName(vars: GetCompanyByNameVariables, options?: ExecuteQueryOptions): QueryPromise<GetCompanyByNameData, GetCompanyByNameVariables>;

interface GetCompanyByNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCompanyByNameVariables): QueryRef<GetCompanyByNameData, GetCompanyByNameVariables>;
}
export const getCompanyByNameRef: GetCompanyByNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCompanyByName(dc: DataConnect, vars: GetCompanyByNameVariables, options?: ExecuteQueryOptions): QueryPromise<GetCompanyByNameData, GetCompanyByNameVariables>;

interface GetCompanyByNameRef {
  ...
  (dc: DataConnect, vars: GetCompanyByNameVariables): QueryRef<GetCompanyByNameData, GetCompanyByNameVariables>;
}
export const getCompanyByNameRef: GetCompanyByNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCompanyByNameRef:
```typescript
const name = getCompanyByNameRef.operationName;
console.log(name);
```

### Variables
The `GetCompanyByName` query requires an argument of type `GetCompanyByNameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCompanyByNameVariables {
  name: string;
}
```
### Return Type
Recall that executing the `GetCompanyByName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCompanyByNameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCompanyByNameData {
  companies: ({
    id: UUIDString;
    name: string;
  } & Company_Key)[];
}
```
### Using `GetCompanyByName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCompanyByName, GetCompanyByNameVariables } from '@dataconnect/admin-generated';

// The `GetCompanyByName` query requires an argument of type `GetCompanyByNameVariables`:
const getCompanyByNameVars: GetCompanyByNameVariables = {
  name: ..., 
};

// Call the `getCompanyByName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCompanyByName(getCompanyByNameVars);
// Variables can be defined inline as well.
const { data } = await getCompanyByName({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCompanyByName(dataConnect, getCompanyByNameVars);

console.log(data.companies);

// Or, you can use the `Promise` API.
getCompanyByName(getCompanyByNameVars).then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

### Using `GetCompanyByName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCompanyByNameRef, GetCompanyByNameVariables } from '@dataconnect/admin-generated';

// The `GetCompanyByName` query requires an argument of type `GetCompanyByNameVariables`:
const getCompanyByNameVars: GetCompanyByNameVariables = {
  name: ..., 
};

// Call the `getCompanyByNameRef()` function to get a reference to the query.
const ref = getCompanyByNameRef(getCompanyByNameVars);
// Variables can be defined inline as well.
const ref = getCompanyByNameRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCompanyByNameRef(dataConnect, getCompanyByNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.companies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

## GetCompanyByEmail
You can execute the `GetCompanyByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCompanyByEmail(vars: GetCompanyByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetCompanyByEmailData, GetCompanyByEmailVariables>;

interface GetCompanyByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCompanyByEmailVariables): QueryRef<GetCompanyByEmailData, GetCompanyByEmailVariables>;
}
export const getCompanyByEmailRef: GetCompanyByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCompanyByEmail(dc: DataConnect, vars: GetCompanyByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetCompanyByEmailData, GetCompanyByEmailVariables>;

interface GetCompanyByEmailRef {
  ...
  (dc: DataConnect, vars: GetCompanyByEmailVariables): QueryRef<GetCompanyByEmailData, GetCompanyByEmailVariables>;
}
export const getCompanyByEmailRef: GetCompanyByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCompanyByEmailRef:
```typescript
const name = getCompanyByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetCompanyByEmail` query requires an argument of type `GetCompanyByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCompanyByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetCompanyByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCompanyByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCompanyByEmailData {
  companies: ({
    id: UUIDString;
    email: string;
  } & Company_Key)[];
}
```
### Using `GetCompanyByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCompanyByEmail, GetCompanyByEmailVariables } from '@dataconnect/admin-generated';

// The `GetCompanyByEmail` query requires an argument of type `GetCompanyByEmailVariables`:
const getCompanyByEmailVars: GetCompanyByEmailVariables = {
  email: ..., 
};

// Call the `getCompanyByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCompanyByEmail(getCompanyByEmailVars);
// Variables can be defined inline as well.
const { data } = await getCompanyByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCompanyByEmail(dataConnect, getCompanyByEmailVars);

console.log(data.companies);

// Or, you can use the `Promise` API.
getCompanyByEmail(getCompanyByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

### Using `GetCompanyByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCompanyByEmailRef, GetCompanyByEmailVariables } from '@dataconnect/admin-generated';

// The `GetCompanyByEmail` query requires an argument of type `GetCompanyByEmailVariables`:
const getCompanyByEmailVars: GetCompanyByEmailVariables = {
  email: ..., 
};

// Call the `getCompanyByEmailRef()` function to get a reference to the query.
const ref = getCompanyByEmailRef(getCompanyByEmailVars);
// Variables can be defined inline as well.
const ref = getCompanyByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCompanyByEmailRef(dataConnect, getCompanyByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.companies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

## GetEmployeeById
You can execute the `GetEmployeeById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmployeeById(vars: GetEmployeeByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmployeeByIdData, GetEmployeeByIdVariables>;

interface GetEmployeeByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmployeeByIdVariables): QueryRef<GetEmployeeByIdData, GetEmployeeByIdVariables>;
}
export const getEmployeeByIdRef: GetEmployeeByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmployeeById(dc: DataConnect, vars: GetEmployeeByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmployeeByIdData, GetEmployeeByIdVariables>;

interface GetEmployeeByIdRef {
  ...
  (dc: DataConnect, vars: GetEmployeeByIdVariables): QueryRef<GetEmployeeByIdData, GetEmployeeByIdVariables>;
}
export const getEmployeeByIdRef: GetEmployeeByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmployeeByIdRef:
```typescript
const name = getEmployeeByIdRef.operationName;
console.log(name);
```

### Variables
The `GetEmployeeById` query requires an argument of type `GetEmployeeByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEmployeeByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetEmployeeById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmployeeByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEmployeeByIdData {
  employee?: {
    id: UUIDString;
    userId?: UUIDString | null;
    companyId: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    jobTitle: string;
    department: string;
    employmentType: string;
    employmentStatus: string;
    startDate: DateString;
    endDate?: DateString | null;
    managerId?: UUIDString | null;
    profilePhoto?: string | null;
    location?: string | null;
    isVerified: boolean;
    verifiedAt?: TimestampString | null;
    verifiedById?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    deletedAt?: TimestampString | null;
    user?: {
      id: UUIDString;
    } & User_Key;
    company: {
      id: UUIDString;
      name: string;
    } & Company_Key;
    manager?: {
      id: UUIDString;
    } & Employee_Key;
  } & Employee_Key;
}
```
### Using `GetEmployeeById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmployeeById, GetEmployeeByIdVariables } from '@dataconnect/admin-generated';

// The `GetEmployeeById` query requires an argument of type `GetEmployeeByIdVariables`:
const getEmployeeByIdVars: GetEmployeeByIdVariables = {
  id: ..., 
};

// Call the `getEmployeeById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmployeeById(getEmployeeByIdVars);
// Variables can be defined inline as well.
const { data } = await getEmployeeById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmployeeById(dataConnect, getEmployeeByIdVars);

console.log(data.employee);

// Or, you can use the `Promise` API.
getEmployeeById(getEmployeeByIdVars).then((response) => {
  const data = response.data;
  console.log(data.employee);
});
```

### Using `GetEmployeeById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmployeeByIdRef, GetEmployeeByIdVariables } from '@dataconnect/admin-generated';

// The `GetEmployeeById` query requires an argument of type `GetEmployeeByIdVariables`:
const getEmployeeByIdVars: GetEmployeeByIdVariables = {
  id: ..., 
};

// Call the `getEmployeeByIdRef()` function to get a reference to the query.
const ref = getEmployeeByIdRef(getEmployeeByIdVars);
// Variables can be defined inline as well.
const ref = getEmployeeByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmployeeByIdRef(dataConnect, getEmployeeByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employee);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employee);
});
```

## GetEmployeeByEmail
You can execute the `GetEmployeeByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmployeeByEmail(vars: GetEmployeeByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmployeeByEmailData, GetEmployeeByEmailVariables>;

interface GetEmployeeByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmployeeByEmailVariables): QueryRef<GetEmployeeByEmailData, GetEmployeeByEmailVariables>;
}
export const getEmployeeByEmailRef: GetEmployeeByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmployeeByEmail(dc: DataConnect, vars: GetEmployeeByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmployeeByEmailData, GetEmployeeByEmailVariables>;

interface GetEmployeeByEmailRef {
  ...
  (dc: DataConnect, vars: GetEmployeeByEmailVariables): QueryRef<GetEmployeeByEmailData, GetEmployeeByEmailVariables>;
}
export const getEmployeeByEmailRef: GetEmployeeByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmployeeByEmailRef:
```typescript
const name = getEmployeeByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetEmployeeByEmail` query requires an argument of type `GetEmployeeByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEmployeeByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetEmployeeByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmployeeByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEmployeeByEmailData {
  employees: ({
    id: UUIDString;
    userId?: UUIDString | null;
    companyId: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    jobTitle: string;
    department: string;
    employmentType: string;
    employmentStatus: string;
    startDate: DateString;
    endDate?: DateString | null;
    managerId?: UUIDString | null;
    profilePhoto?: string | null;
    location?: string | null;
    isVerified: boolean;
    verifiedAt?: TimestampString | null;
    verifiedById?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    deletedAt?: TimestampString | null;
    user?: {
      id: UUIDString;
    } & User_Key;
  } & Employee_Key)[];
}
```
### Using `GetEmployeeByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmployeeByEmail, GetEmployeeByEmailVariables } from '@dataconnect/admin-generated';

// The `GetEmployeeByEmail` query requires an argument of type `GetEmployeeByEmailVariables`:
const getEmployeeByEmailVars: GetEmployeeByEmailVariables = {
  email: ..., 
};

// Call the `getEmployeeByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmployeeByEmail(getEmployeeByEmailVars);
// Variables can be defined inline as well.
const { data } = await getEmployeeByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmployeeByEmail(dataConnect, getEmployeeByEmailVars);

console.log(data.employees);

// Or, you can use the `Promise` API.
getEmployeeByEmail(getEmployeeByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

### Using `GetEmployeeByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmployeeByEmailRef, GetEmployeeByEmailVariables } from '@dataconnect/admin-generated';

// The `GetEmployeeByEmail` query requires an argument of type `GetEmployeeByEmailVariables`:
const getEmployeeByEmailVars: GetEmployeeByEmailVariables = {
  email: ..., 
};

// Call the `getEmployeeByEmailRef()` function to get a reference to the query.
const ref = getEmployeeByEmailRef(getEmployeeByEmailVars);
// Variables can be defined inline as well.
const ref = getEmployeeByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmployeeByEmailRef(dataConnect, getEmployeeByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employees);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

## ListEmployeesByCompany
You can execute the `ListEmployeesByCompany` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEmployeesByCompany(vars: ListEmployeesByCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<ListEmployeesByCompanyData, ListEmployeesByCompanyVariables>;

interface ListEmployeesByCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListEmployeesByCompanyVariables): QueryRef<ListEmployeesByCompanyData, ListEmployeesByCompanyVariables>;
}
export const listEmployeesByCompanyRef: ListEmployeesByCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEmployeesByCompany(dc: DataConnect, vars: ListEmployeesByCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<ListEmployeesByCompanyData, ListEmployeesByCompanyVariables>;

interface ListEmployeesByCompanyRef {
  ...
  (dc: DataConnect, vars: ListEmployeesByCompanyVariables): QueryRef<ListEmployeesByCompanyData, ListEmployeesByCompanyVariables>;
}
export const listEmployeesByCompanyRef: ListEmployeesByCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEmployeesByCompanyRef:
```typescript
const name = listEmployeesByCompanyRef.operationName;
console.log(name);
```

### Variables
The `ListEmployeesByCompany` query requires an argument of type `ListEmployeesByCompanyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListEmployeesByCompanyVariables {
  companyId: UUIDString;
  search?: string | null;
  department?: string | null;
  employmentStatus?: string | null;
  isVerified?: boolean | null;
  limit?: number | null;
  offset?: number | null;
}
```
### Return Type
Recall that executing the `ListEmployeesByCompany` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEmployeesByCompanyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListEmployeesByCompanyData {
  employees: ({
    id: UUIDString;
    userId?: UUIDString | null;
    companyId: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    jobTitle: string;
    department: string;
    employmentType: string;
    employmentStatus: string;
    startDate: DateString;
    endDate?: DateString | null;
    managerId?: UUIDString | null;
    profilePhoto?: string | null;
    location?: string | null;
    isVerified: boolean;
    verifiedAt?: TimestampString | null;
    verifiedById?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    deletedAt?: TimestampString | null;
  } & Employee_Key)[];
}
```
### Using `ListEmployeesByCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEmployeesByCompany, ListEmployeesByCompanyVariables } from '@dataconnect/admin-generated';

// The `ListEmployeesByCompany` query requires an argument of type `ListEmployeesByCompanyVariables`:
const listEmployeesByCompanyVars: ListEmployeesByCompanyVariables = {
  companyId: ..., 
  search: ..., // optional
  department: ..., // optional
  employmentStatus: ..., // optional
  isVerified: ..., // optional
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listEmployeesByCompany()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEmployeesByCompany(listEmployeesByCompanyVars);
// Variables can be defined inline as well.
const { data } = await listEmployeesByCompany({ companyId: ..., search: ..., department: ..., employmentStatus: ..., isVerified: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEmployeesByCompany(dataConnect, listEmployeesByCompanyVars);

console.log(data.employees);

// Or, you can use the `Promise` API.
listEmployeesByCompany(listEmployeesByCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

### Using `ListEmployeesByCompany`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEmployeesByCompanyRef, ListEmployeesByCompanyVariables } from '@dataconnect/admin-generated';

// The `ListEmployeesByCompany` query requires an argument of type `ListEmployeesByCompanyVariables`:
const listEmployeesByCompanyVars: ListEmployeesByCompanyVariables = {
  companyId: ..., 
  search: ..., // optional
  department: ..., // optional
  employmentStatus: ..., // optional
  isVerified: ..., // optional
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listEmployeesByCompanyRef()` function to get a reference to the query.
const ref = listEmployeesByCompanyRef(listEmployeesByCompanyVars);
// Variables can be defined inline as well.
const ref = listEmployeesByCompanyRef({ companyId: ..., search: ..., department: ..., employmentStatus: ..., isVerified: ..., limit: ..., offset: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEmployeesByCompanyRef(dataConnect, listEmployeesByCompanyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employees);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

## SearchEmployees
You can execute the `SearchEmployees` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchEmployees(vars: SearchEmployeesVariables, options?: ExecuteQueryOptions): QueryPromise<SearchEmployeesData, SearchEmployeesVariables>;

interface SearchEmployeesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchEmployeesVariables): QueryRef<SearchEmployeesData, SearchEmployeesVariables>;
}
export const searchEmployeesRef: SearchEmployeesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchEmployees(dc: DataConnect, vars: SearchEmployeesVariables, options?: ExecuteQueryOptions): QueryPromise<SearchEmployeesData, SearchEmployeesVariables>;

interface SearchEmployeesRef {
  ...
  (dc: DataConnect, vars: SearchEmployeesVariables): QueryRef<SearchEmployeesData, SearchEmployeesVariables>;
}
export const searchEmployeesRef: SearchEmployeesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchEmployeesRef:
```typescript
const name = searchEmployeesRef.operationName;
console.log(name);
```

### Variables
The `SearchEmployees` query requires an argument of type `SearchEmployeesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchEmployeesVariables {
  companyId: UUIDString;
  search: string;
}
```
### Return Type
Recall that executing the `SearchEmployees` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchEmployeesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchEmployeesData {
  employees: ({
    id: UUIDString;
    email: string;
    firstName: string;
    lastName: string;
  } & Employee_Key)[];
}
```
### Using `SearchEmployees`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchEmployees, SearchEmployeesVariables } from '@dataconnect/admin-generated';

// The `SearchEmployees` query requires an argument of type `SearchEmployeesVariables`:
const searchEmployeesVars: SearchEmployeesVariables = {
  companyId: ..., 
  search: ..., 
};

// Call the `searchEmployees()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchEmployees(searchEmployeesVars);
// Variables can be defined inline as well.
const { data } = await searchEmployees({ companyId: ..., search: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchEmployees(dataConnect, searchEmployeesVars);

console.log(data.employees);

// Or, you can use the `Promise` API.
searchEmployees(searchEmployeesVars).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

### Using `SearchEmployees`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchEmployeesRef, SearchEmployeesVariables } from '@dataconnect/admin-generated';

// The `SearchEmployees` query requires an argument of type `SearchEmployeesVariables`:
const searchEmployeesVars: SearchEmployeesVariables = {
  companyId: ..., 
  search: ..., 
};

// Call the `searchEmployeesRef()` function to get a reference to the query.
const ref = searchEmployeesRef(searchEmployeesVars);
// Variables can be defined inline as well.
const ref = searchEmployeesRef({ companyId: ..., search: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchEmployeesRef(dataConnect, searchEmployeesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employees);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

## GetSkillByName
You can execute the `GetSkillByName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSkillByName(vars: GetSkillByNameVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillByNameData, GetSkillByNameVariables>;

interface GetSkillByNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSkillByNameVariables): QueryRef<GetSkillByNameData, GetSkillByNameVariables>;
}
export const getSkillByNameRef: GetSkillByNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSkillByName(dc: DataConnect, vars: GetSkillByNameVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillByNameData, GetSkillByNameVariables>;

interface GetSkillByNameRef {
  ...
  (dc: DataConnect, vars: GetSkillByNameVariables): QueryRef<GetSkillByNameData, GetSkillByNameVariables>;
}
export const getSkillByNameRef: GetSkillByNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSkillByNameRef:
```typescript
const name = getSkillByNameRef.operationName;
console.log(name);
```

### Variables
The `GetSkillByName` query requires an argument of type `GetSkillByNameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSkillByNameVariables {
  name: string;
}
```
### Return Type
Recall that executing the `GetSkillByName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSkillByNameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSkillByNameData {
  skills: ({
    id: UUIDString;
    name: string;
    category?: string | null;
  } & Skill_Key)[];
}
```
### Using `GetSkillByName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSkillByName, GetSkillByNameVariables } from '@dataconnect/admin-generated';

// The `GetSkillByName` query requires an argument of type `GetSkillByNameVariables`:
const getSkillByNameVars: GetSkillByNameVariables = {
  name: ..., 
};

// Call the `getSkillByName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSkillByName(getSkillByNameVars);
// Variables can be defined inline as well.
const { data } = await getSkillByName({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSkillByName(dataConnect, getSkillByNameVars);

console.log(data.skills);

// Or, you can use the `Promise` API.
getSkillByName(getSkillByNameVars).then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

### Using `GetSkillByName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSkillByNameRef, GetSkillByNameVariables } from '@dataconnect/admin-generated';

// The `GetSkillByName` query requires an argument of type `GetSkillByNameVariables`:
const getSkillByNameVars: GetSkillByNameVariables = {
  name: ..., 
};

// Call the `getSkillByNameRef()` function to get a reference to the query.
const ref = getSkillByNameRef(getSkillByNameVars);
// Variables can be defined inline as well.
const ref = getSkillByNameRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSkillByNameRef(dataConnect, getSkillByNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.skills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

## ListSkillsByEmployee
You can execute the `ListSkillsByEmployee` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSkillsByEmployee(vars: ListSkillsByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<ListSkillsByEmployeeData, ListSkillsByEmployeeVariables>;

interface ListSkillsByEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSkillsByEmployeeVariables): QueryRef<ListSkillsByEmployeeData, ListSkillsByEmployeeVariables>;
}
export const listSkillsByEmployeeRef: ListSkillsByEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSkillsByEmployee(dc: DataConnect, vars: ListSkillsByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<ListSkillsByEmployeeData, ListSkillsByEmployeeVariables>;

interface ListSkillsByEmployeeRef {
  ...
  (dc: DataConnect, vars: ListSkillsByEmployeeVariables): QueryRef<ListSkillsByEmployeeData, ListSkillsByEmployeeVariables>;
}
export const listSkillsByEmployeeRef: ListSkillsByEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSkillsByEmployeeRef:
```typescript
const name = listSkillsByEmployeeRef.operationName;
console.log(name);
```

### Variables
The `ListSkillsByEmployee` query requires an argument of type `ListSkillsByEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListSkillsByEmployeeVariables {
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `ListSkillsByEmployee` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSkillsByEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSkillsByEmployeeData {
  employeeSkills: ({
    id: UUIDString;
    employeeId: UUIDString;
    skillId: UUIDString;
    proficiencyLevel: string;
    initialLevel?: string | null;
    isVerified: boolean;
    verifiedBy?: UUIDString | null;
    verificationDate?: TimestampString | null;
    lastAssessed?: DateString | null;
    yearsExperience?: number | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & EmployeeSkill_Key)[];
}
```
### Using `ListSkillsByEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSkillsByEmployee, ListSkillsByEmployeeVariables } from '@dataconnect/admin-generated';

// The `ListSkillsByEmployee` query requires an argument of type `ListSkillsByEmployeeVariables`:
const listSkillsByEmployeeVars: ListSkillsByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `listSkillsByEmployee()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSkillsByEmployee(listSkillsByEmployeeVars);
// Variables can be defined inline as well.
const { data } = await listSkillsByEmployee({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSkillsByEmployee(dataConnect, listSkillsByEmployeeVars);

console.log(data.employeeSkills);

// Or, you can use the `Promise` API.
listSkillsByEmployee(listSkillsByEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.employeeSkills);
});
```

### Using `ListSkillsByEmployee`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSkillsByEmployeeRef, ListSkillsByEmployeeVariables } from '@dataconnect/admin-generated';

// The `ListSkillsByEmployee` query requires an argument of type `ListSkillsByEmployeeVariables`:
const listSkillsByEmployeeVars: ListSkillsByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `listSkillsByEmployeeRef()` function to get a reference to the query.
const ref = listSkillsByEmployeeRef(listSkillsByEmployeeVars);
// Variables can be defined inline as well.
const ref = listSkillsByEmployeeRef({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSkillsByEmployeeRef(dataConnect, listSkillsByEmployeeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employeeSkills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeSkills);
});
```

## GetEmployeeSkillByPair
You can execute the `GetEmployeeSkillByPair` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmployeeSkillByPair(vars: GetEmployeeSkillByPairVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmployeeSkillByPairData, GetEmployeeSkillByPairVariables>;

interface GetEmployeeSkillByPairRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmployeeSkillByPairVariables): QueryRef<GetEmployeeSkillByPairData, GetEmployeeSkillByPairVariables>;
}
export const getEmployeeSkillByPairRef: GetEmployeeSkillByPairRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmployeeSkillByPair(dc: DataConnect, vars: GetEmployeeSkillByPairVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmployeeSkillByPairData, GetEmployeeSkillByPairVariables>;

interface GetEmployeeSkillByPairRef {
  ...
  (dc: DataConnect, vars: GetEmployeeSkillByPairVariables): QueryRef<GetEmployeeSkillByPairData, GetEmployeeSkillByPairVariables>;
}
export const getEmployeeSkillByPairRef: GetEmployeeSkillByPairRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmployeeSkillByPairRef:
```typescript
const name = getEmployeeSkillByPairRef.operationName;
console.log(name);
```

### Variables
The `GetEmployeeSkillByPair` query requires an argument of type `GetEmployeeSkillByPairVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEmployeeSkillByPairVariables {
  employeeId: UUIDString;
  skillId: UUIDString;
}
```
### Return Type
Recall that executing the `GetEmployeeSkillByPair` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmployeeSkillByPairData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEmployeeSkillByPairData {
  employeeSkills: ({
    id: UUIDString;
  })[];
}
```
### Using `GetEmployeeSkillByPair`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmployeeSkillByPair, GetEmployeeSkillByPairVariables } from '@dataconnect/admin-generated';

// The `GetEmployeeSkillByPair` query requires an argument of type `GetEmployeeSkillByPairVariables`:
const getEmployeeSkillByPairVars: GetEmployeeSkillByPairVariables = {
  employeeId: ..., 
  skillId: ..., 
};

// Call the `getEmployeeSkillByPair()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmployeeSkillByPair(getEmployeeSkillByPairVars);
// Variables can be defined inline as well.
const { data } = await getEmployeeSkillByPair({ employeeId: ..., skillId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmployeeSkillByPair(dataConnect, getEmployeeSkillByPairVars);

console.log(data.employeeSkills);

// Or, you can use the `Promise` API.
getEmployeeSkillByPair(getEmployeeSkillByPairVars).then((response) => {
  const data = response.data;
  console.log(data.employeeSkills);
});
```

### Using `GetEmployeeSkillByPair`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmployeeSkillByPairRef, GetEmployeeSkillByPairVariables } from '@dataconnect/admin-generated';

// The `GetEmployeeSkillByPair` query requires an argument of type `GetEmployeeSkillByPairVariables`:
const getEmployeeSkillByPairVars: GetEmployeeSkillByPairVariables = {
  employeeId: ..., 
  skillId: ..., 
};

// Call the `getEmployeeSkillByPairRef()` function to get a reference to the query.
const ref = getEmployeeSkillByPairRef(getEmployeeSkillByPairVars);
// Variables can be defined inline as well.
const ref = getEmployeeSkillByPairRef({ employeeId: ..., skillId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmployeeSkillByPairRef(dataConnect, getEmployeeSkillByPairVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employeeSkills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeSkills);
});
```

## ListProjectsByEmployee
You can execute the `ListProjectsByEmployee` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProjectsByEmployee(vars: ListProjectsByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByEmployeeData, ListProjectsByEmployeeVariables>;

interface ListProjectsByEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsByEmployeeVariables): QueryRef<ListProjectsByEmployeeData, ListProjectsByEmployeeVariables>;
}
export const listProjectsByEmployeeRef: ListProjectsByEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectsByEmployee(dc: DataConnect, vars: ListProjectsByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByEmployeeData, ListProjectsByEmployeeVariables>;

interface ListProjectsByEmployeeRef {
  ...
  (dc: DataConnect, vars: ListProjectsByEmployeeVariables): QueryRef<ListProjectsByEmployeeData, ListProjectsByEmployeeVariables>;
}
export const listProjectsByEmployeeRef: ListProjectsByEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsByEmployeeRef:
```typescript
const name = listProjectsByEmployeeRef.operationName;
console.log(name);
```

### Variables
The `ListProjectsByEmployee` query requires an argument of type `ListProjectsByEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectsByEmployeeVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjectsByEmployee` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsByEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectsByEmployeeData {
  projects: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    name: string;
    description?: string | null;
    role?: string | null;
    technologies?: string | null;
    startDate?: DateString | null;
    endDate?: DateString | null;
    status: string;
    contributionSummary?: string | null;
    performanceRating?: number | null;
    isVerified: boolean;
    verifiedById?: UUIDString | null;
    verificationDate?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Project_Key)[];
}
```
### Using `ListProjectsByEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectsByEmployee, ListProjectsByEmployeeVariables } from '@dataconnect/admin-generated';

// The `ListProjectsByEmployee` query requires an argument of type `ListProjectsByEmployeeVariables`:
const listProjectsByEmployeeVars: ListProjectsByEmployeeVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listProjectsByEmployee()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectsByEmployee(listProjectsByEmployeeVars);
// Variables can be defined inline as well.
const { data } = await listProjectsByEmployee({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectsByEmployee(dataConnect, listProjectsByEmployeeVars);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjectsByEmployee(listProjectsByEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjectsByEmployee`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsByEmployeeRef, ListProjectsByEmployeeVariables } from '@dataconnect/admin-generated';

// The `ListProjectsByEmployee` query requires an argument of type `ListProjectsByEmployeeVariables`:
const listProjectsByEmployeeVars: ListProjectsByEmployeeVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listProjectsByEmployeeRef()` function to get a reference to the query.
const ref = listProjectsByEmployeeRef(listProjectsByEmployeeVars);
// Variables can be defined inline as well.
const ref = listProjectsByEmployeeRef({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsByEmployeeRef(dataConnect, listProjectsByEmployeeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## ListProjectsByCompany
You can execute the `ListProjectsByCompany` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProjectsByCompany(vars: ListProjectsByCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByCompanyData, ListProjectsByCompanyVariables>;

interface ListProjectsByCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsByCompanyVariables): QueryRef<ListProjectsByCompanyData, ListProjectsByCompanyVariables>;
}
export const listProjectsByCompanyRef: ListProjectsByCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectsByCompany(dc: DataConnect, vars: ListProjectsByCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectsByCompanyData, ListProjectsByCompanyVariables>;

interface ListProjectsByCompanyRef {
  ...
  (dc: DataConnect, vars: ListProjectsByCompanyVariables): QueryRef<ListProjectsByCompanyData, ListProjectsByCompanyVariables>;
}
export const listProjectsByCompanyRef: ListProjectsByCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsByCompanyRef:
```typescript
const name = listProjectsByCompanyRef.operationName;
console.log(name);
```

### Variables
The `ListProjectsByCompany` query requires an argument of type `ListProjectsByCompanyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectsByCompanyVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjectsByCompany` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsByCompanyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectsByCompanyData {
  projects: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    name: string;
    status: string;
    performanceRating?: number | null;
    isVerified: boolean;
    createdAt: TimestampString;
  } & Project_Key)[];
}
```
### Using `ListProjectsByCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectsByCompany, ListProjectsByCompanyVariables } from '@dataconnect/admin-generated';

// The `ListProjectsByCompany` query requires an argument of type `ListProjectsByCompanyVariables`:
const listProjectsByCompanyVars: ListProjectsByCompanyVariables = {
  companyId: ..., 
};

// Call the `listProjectsByCompany()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectsByCompany(listProjectsByCompanyVars);
// Variables can be defined inline as well.
const { data } = await listProjectsByCompany({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectsByCompany(dataConnect, listProjectsByCompanyVars);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjectsByCompany(listProjectsByCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjectsByCompany`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsByCompanyRef, ListProjectsByCompanyVariables } from '@dataconnect/admin-generated';

// The `ListProjectsByCompany` query requires an argument of type `ListProjectsByCompanyVariables`:
const listProjectsByCompanyVars: ListProjectsByCompanyVariables = {
  companyId: ..., 
};

// Call the `listProjectsByCompanyRef()` function to get a reference to the query.
const ref = listProjectsByCompanyRef(listProjectsByCompanyVars);
// Variables can be defined inline as well.
const ref = listProjectsByCompanyRef({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsByCompanyRef(dataConnect, listProjectsByCompanyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## ListBehaviorRatings
You can execute the `ListBehaviorRatings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listBehaviorRatings(vars: ListBehaviorRatingsVariables, options?: ExecuteQueryOptions): QueryPromise<ListBehaviorRatingsData, ListBehaviorRatingsVariables>;

interface ListBehaviorRatingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListBehaviorRatingsVariables): QueryRef<ListBehaviorRatingsData, ListBehaviorRatingsVariables>;
}
export const listBehaviorRatingsRef: ListBehaviorRatingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listBehaviorRatings(dc: DataConnect, vars: ListBehaviorRatingsVariables, options?: ExecuteQueryOptions): QueryPromise<ListBehaviorRatingsData, ListBehaviorRatingsVariables>;

interface ListBehaviorRatingsRef {
  ...
  (dc: DataConnect, vars: ListBehaviorRatingsVariables): QueryRef<ListBehaviorRatingsData, ListBehaviorRatingsVariables>;
}
export const listBehaviorRatingsRef: ListBehaviorRatingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listBehaviorRatingsRef:
```typescript
const name = listBehaviorRatingsRef.operationName;
console.log(name);
```

### Variables
The `ListBehaviorRatings` query requires an argument of type `ListBehaviorRatingsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListBehaviorRatingsVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListBehaviorRatings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListBehaviorRatingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListBehaviorRatingsData {
  employeeBehaviorRatings: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    category: string;
    rating: number;
    reviewerId: UUIDString;
    reviewDate: DateString;
    comments?: string | null;
    createdAt: TimestampString;
  } & EmployeeBehaviorRating_Key)[];
}
```
### Using `ListBehaviorRatings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listBehaviorRatings, ListBehaviorRatingsVariables } from '@dataconnect/admin-generated';

// The `ListBehaviorRatings` query requires an argument of type `ListBehaviorRatingsVariables`:
const listBehaviorRatingsVars: ListBehaviorRatingsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listBehaviorRatings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listBehaviorRatings(listBehaviorRatingsVars);
// Variables can be defined inline as well.
const { data } = await listBehaviorRatings({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listBehaviorRatings(dataConnect, listBehaviorRatingsVars);

console.log(data.employeeBehaviorRatings);

// Or, you can use the `Promise` API.
listBehaviorRatings(listBehaviorRatingsVars).then((response) => {
  const data = response.data;
  console.log(data.employeeBehaviorRatings);
});
```

### Using `ListBehaviorRatings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listBehaviorRatingsRef, ListBehaviorRatingsVariables } from '@dataconnect/admin-generated';

// The `ListBehaviorRatings` query requires an argument of type `ListBehaviorRatingsVariables`:
const listBehaviorRatingsVars: ListBehaviorRatingsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listBehaviorRatingsRef()` function to get a reference to the query.
const ref = listBehaviorRatingsRef(listBehaviorRatingsVars);
// Variables can be defined inline as well.
const ref = listBehaviorRatingsRef({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listBehaviorRatingsRef(dataConnect, listBehaviorRatingsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employeeBehaviorRatings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeBehaviorRatings);
});
```

## LatestBehaviorRatings
You can execute the `LatestBehaviorRatings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
latestBehaviorRatings(vars: LatestBehaviorRatingsVariables, options?: ExecuteQueryOptions): QueryPromise<LatestBehaviorRatingsData, LatestBehaviorRatingsVariables>;

interface LatestBehaviorRatingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LatestBehaviorRatingsVariables): QueryRef<LatestBehaviorRatingsData, LatestBehaviorRatingsVariables>;
}
export const latestBehaviorRatingsRef: LatestBehaviorRatingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
latestBehaviorRatings(dc: DataConnect, vars: LatestBehaviorRatingsVariables, options?: ExecuteQueryOptions): QueryPromise<LatestBehaviorRatingsData, LatestBehaviorRatingsVariables>;

interface LatestBehaviorRatingsRef {
  ...
  (dc: DataConnect, vars: LatestBehaviorRatingsVariables): QueryRef<LatestBehaviorRatingsData, LatestBehaviorRatingsVariables>;
}
export const latestBehaviorRatingsRef: LatestBehaviorRatingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the latestBehaviorRatingsRef:
```typescript
const name = latestBehaviorRatingsRef.operationName;
console.log(name);
```

### Variables
The `LatestBehaviorRatings` query requires an argument of type `LatestBehaviorRatingsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LatestBehaviorRatingsVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `LatestBehaviorRatings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LatestBehaviorRatingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LatestBehaviorRatingsData {
  employeeBehaviorRatings: ({
    id: UUIDString;
    category: string;
    rating: number;
    reviewDate: DateString;
  } & EmployeeBehaviorRating_Key)[];
}
```
### Using `LatestBehaviorRatings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, latestBehaviorRatings, LatestBehaviorRatingsVariables } from '@dataconnect/admin-generated';

// The `LatestBehaviorRatings` query requires an argument of type `LatestBehaviorRatingsVariables`:
const latestBehaviorRatingsVars: LatestBehaviorRatingsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `latestBehaviorRatings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await latestBehaviorRatings(latestBehaviorRatingsVars);
// Variables can be defined inline as well.
const { data } = await latestBehaviorRatings({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await latestBehaviorRatings(dataConnect, latestBehaviorRatingsVars);

console.log(data.employeeBehaviorRatings);

// Or, you can use the `Promise` API.
latestBehaviorRatings(latestBehaviorRatingsVars).then((response) => {
  const data = response.data;
  console.log(data.employeeBehaviorRatings);
});
```

### Using `LatestBehaviorRatings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, latestBehaviorRatingsRef, LatestBehaviorRatingsVariables } from '@dataconnect/admin-generated';

// The `LatestBehaviorRatings` query requires an argument of type `LatestBehaviorRatingsVariables`:
const latestBehaviorRatingsVars: LatestBehaviorRatingsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `latestBehaviorRatingsRef()` function to get a reference to the query.
const ref = latestBehaviorRatingsRef(latestBehaviorRatingsVars);
// Variables can be defined inline as well.
const ref = latestBehaviorRatingsRef({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = latestBehaviorRatingsRef(dataConnect, latestBehaviorRatingsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employeeBehaviorRatings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeBehaviorRatings);
});
```

## ListAchievements
You can execute the `ListAchievements` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAchievements(vars: ListAchievementsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAchievementsData, ListAchievementsVariables>;

interface ListAchievementsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAchievementsVariables): QueryRef<ListAchievementsData, ListAchievementsVariables>;
}
export const listAchievementsRef: ListAchievementsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAchievements(dc: DataConnect, vars: ListAchievementsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAchievementsData, ListAchievementsVariables>;

interface ListAchievementsRef {
  ...
  (dc: DataConnect, vars: ListAchievementsVariables): QueryRef<ListAchievementsData, ListAchievementsVariables>;
}
export const listAchievementsRef: ListAchievementsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAchievementsRef:
```typescript
const name = listAchievementsRef.operationName;
console.log(name);
```

### Variables
The `ListAchievements` query requires an argument of type `ListAchievementsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAchievementsVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListAchievements` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAchievementsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAchievementsData {
  achievements: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    title: string;
    description?: string | null;
    date?: DateString | null;
    category: string;
    evidenceUrl?: string | null;
    isVerified: boolean;
    verifiedById?: UUIDString | null;
    verificationDate?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Achievement_Key)[];
}
```
### Using `ListAchievements`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAchievements, ListAchievementsVariables } from '@dataconnect/admin-generated';

// The `ListAchievements` query requires an argument of type `ListAchievementsVariables`:
const listAchievementsVars: ListAchievementsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listAchievements()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAchievements(listAchievementsVars);
// Variables can be defined inline as well.
const { data } = await listAchievements({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAchievements(dataConnect, listAchievementsVars);

console.log(data.achievements);

// Or, you can use the `Promise` API.
listAchievements(listAchievementsVars).then((response) => {
  const data = response.data;
  console.log(data.achievements);
});
```

### Using `ListAchievements`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAchievementsRef, ListAchievementsVariables } from '@dataconnect/admin-generated';

// The `ListAchievements` query requires an argument of type `ListAchievementsVariables`:
const listAchievementsVars: ListAchievementsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listAchievementsRef()` function to get a reference to the query.
const ref = listAchievementsRef(listAchievementsVars);
// Variables can be defined inline as well.
const ref = listAchievementsRef({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAchievementsRef(dataConnect, listAchievementsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.achievements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.achievements);
});
```

## ListPerformanceReviews
You can execute the `ListPerformanceReviews` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPerformanceReviews(vars: ListPerformanceReviewsVariables, options?: ExecuteQueryOptions): QueryPromise<ListPerformanceReviewsData, ListPerformanceReviewsVariables>;

interface ListPerformanceReviewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPerformanceReviewsVariables): QueryRef<ListPerformanceReviewsData, ListPerformanceReviewsVariables>;
}
export const listPerformanceReviewsRef: ListPerformanceReviewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPerformanceReviews(dc: DataConnect, vars: ListPerformanceReviewsVariables, options?: ExecuteQueryOptions): QueryPromise<ListPerformanceReviewsData, ListPerformanceReviewsVariables>;

interface ListPerformanceReviewsRef {
  ...
  (dc: DataConnect, vars: ListPerformanceReviewsVariables): QueryRef<ListPerformanceReviewsData, ListPerformanceReviewsVariables>;
}
export const listPerformanceReviewsRef: ListPerformanceReviewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPerformanceReviewsRef:
```typescript
const name = listPerformanceReviewsRef.operationName;
console.log(name);
```

### Variables
The `ListPerformanceReviews` query requires an argument of type `ListPerformanceReviewsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPerformanceReviewsVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListPerformanceReviews` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPerformanceReviewsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPerformanceReviewsData {
  performanceReviews: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    reviewerId: UUIDString;
    period: string;
    rating: number;
    comments?: string | null;
    strengths?: string | null;
    areasForImprovement?: string | null;
    goalsCompleted: number;
    goalsPending: number;
    reviewDate: TimestampString;
    createdAt: TimestampString;
    reviewer: {
      id: UUIDString;
      fullName: string;
      email: string;
    } & User_Key;
  } & PerformanceReview_Key)[];
}
```
### Using `ListPerformanceReviews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPerformanceReviews, ListPerformanceReviewsVariables } from '@dataconnect/admin-generated';

// The `ListPerformanceReviews` query requires an argument of type `ListPerformanceReviewsVariables`:
const listPerformanceReviewsVars: ListPerformanceReviewsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listPerformanceReviews()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPerformanceReviews(listPerformanceReviewsVars);
// Variables can be defined inline as well.
const { data } = await listPerformanceReviews({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPerformanceReviews(dataConnect, listPerformanceReviewsVars);

console.log(data.performanceReviews);

// Or, you can use the `Promise` API.
listPerformanceReviews(listPerformanceReviewsVars).then((response) => {
  const data = response.data;
  console.log(data.performanceReviews);
});
```

### Using `ListPerformanceReviews`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPerformanceReviewsRef, ListPerformanceReviewsVariables } from '@dataconnect/admin-generated';

// The `ListPerformanceReviews` query requires an argument of type `ListPerformanceReviewsVariables`:
const listPerformanceReviewsVars: ListPerformanceReviewsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listPerformanceReviewsRef()` function to get a reference to the query.
const ref = listPerformanceReviewsRef(listPerformanceReviewsVars);
// Variables can be defined inline as well.
const ref = listPerformanceReviewsRef({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPerformanceReviewsRef(dataConnect, listPerformanceReviewsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.performanceReviews);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.performanceReviews);
});
```

## GetLatestPerformanceReview
You can execute the `GetLatestPerformanceReview` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLatestPerformanceReview(vars: GetLatestPerformanceReviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetLatestPerformanceReviewData, GetLatestPerformanceReviewVariables>;

interface GetLatestPerformanceReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLatestPerformanceReviewVariables): QueryRef<GetLatestPerformanceReviewData, GetLatestPerformanceReviewVariables>;
}
export const getLatestPerformanceReviewRef: GetLatestPerformanceReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLatestPerformanceReview(dc: DataConnect, vars: GetLatestPerformanceReviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetLatestPerformanceReviewData, GetLatestPerformanceReviewVariables>;

interface GetLatestPerformanceReviewRef {
  ...
  (dc: DataConnect, vars: GetLatestPerformanceReviewVariables): QueryRef<GetLatestPerformanceReviewData, GetLatestPerformanceReviewVariables>;
}
export const getLatestPerformanceReviewRef: GetLatestPerformanceReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLatestPerformanceReviewRef:
```typescript
const name = getLatestPerformanceReviewRef.operationName;
console.log(name);
```

### Variables
The `GetLatestPerformanceReview` query requires an argument of type `GetLatestPerformanceReviewVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLatestPerformanceReviewVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `GetLatestPerformanceReview` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLatestPerformanceReviewData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLatestPerformanceReviewData {
  performanceReviews: ({
    id: UUIDString;
    rating: number;
    reviewDate: TimestampString;
  } & PerformanceReview_Key)[];
}
```
### Using `GetLatestPerformanceReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLatestPerformanceReview, GetLatestPerformanceReviewVariables } from '@dataconnect/admin-generated';

// The `GetLatestPerformanceReview` query requires an argument of type `GetLatestPerformanceReviewVariables`:
const getLatestPerformanceReviewVars: GetLatestPerformanceReviewVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `getLatestPerformanceReview()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLatestPerformanceReview(getLatestPerformanceReviewVars);
// Variables can be defined inline as well.
const { data } = await getLatestPerformanceReview({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLatestPerformanceReview(dataConnect, getLatestPerformanceReviewVars);

console.log(data.performanceReviews);

// Or, you can use the `Promise` API.
getLatestPerformanceReview(getLatestPerformanceReviewVars).then((response) => {
  const data = response.data;
  console.log(data.performanceReviews);
});
```

### Using `GetLatestPerformanceReview`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLatestPerformanceReviewRef, GetLatestPerformanceReviewVariables } from '@dataconnect/admin-generated';

// The `GetLatestPerformanceReview` query requires an argument of type `GetLatestPerformanceReviewVariables`:
const getLatestPerformanceReviewVars: GetLatestPerformanceReviewVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `getLatestPerformanceReviewRef()` function to get a reference to the query.
const ref = getLatestPerformanceReviewRef(getLatestPerformanceReviewVars);
// Variables can be defined inline as well.
const ref = getLatestPerformanceReviewRef({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLatestPerformanceReviewRef(dataConnect, getLatestPerformanceReviewVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.performanceReviews);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.performanceReviews);
});
```

## ListMonthlyReports
You can execute the `ListMonthlyReports` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMonthlyReports(vars: ListMonthlyReportsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMonthlyReportsData, ListMonthlyReportsVariables>;

interface ListMonthlyReportsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMonthlyReportsVariables): QueryRef<ListMonthlyReportsData, ListMonthlyReportsVariables>;
}
export const listMonthlyReportsRef: ListMonthlyReportsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMonthlyReports(dc: DataConnect, vars: ListMonthlyReportsVariables, options?: ExecuteQueryOptions): QueryPromise<ListMonthlyReportsData, ListMonthlyReportsVariables>;

interface ListMonthlyReportsRef {
  ...
  (dc: DataConnect, vars: ListMonthlyReportsVariables): QueryRef<ListMonthlyReportsData, ListMonthlyReportsVariables>;
}
export const listMonthlyReportsRef: ListMonthlyReportsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMonthlyReportsRef:
```typescript
const name = listMonthlyReportsRef.operationName;
console.log(name);
```

### Variables
The `ListMonthlyReports` query requires an argument of type `ListMonthlyReportsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMonthlyReportsVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMonthlyReports` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMonthlyReportsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMonthlyReportsData {
  monthlyProgressReports: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    month: string;
    year: number;
    performanceScore: number;
    behaviorScore: number;
    skillsImproved?: string | null;
    skillsNeedingDevelopment?: string | null;
    projectsCompleted: number;
    projectsInProgress: number;
    achievements?: string | null;
    managerFeedback?: string | null;
    employeeResponse?: string | null;
    goalsCompleted: number;
    goalsPending: number;
    growthPercentage: number;
    promotionReadiness: number;
    nextRole?: string | null;
    isAiGenerated: boolean;
    reportData?: string | null;
    generatedDate: TimestampString;
    createdAt: TimestampString;
  } & MonthlyProgressReport_Key)[];
}
```
### Using `ListMonthlyReports`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMonthlyReports, ListMonthlyReportsVariables } from '@dataconnect/admin-generated';

// The `ListMonthlyReports` query requires an argument of type `ListMonthlyReportsVariables`:
const listMonthlyReportsVars: ListMonthlyReportsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listMonthlyReports()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMonthlyReports(listMonthlyReportsVars);
// Variables can be defined inline as well.
const { data } = await listMonthlyReports({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMonthlyReports(dataConnect, listMonthlyReportsVars);

console.log(data.monthlyProgressReports);

// Or, you can use the `Promise` API.
listMonthlyReports(listMonthlyReportsVars).then((response) => {
  const data = response.data;
  console.log(data.monthlyProgressReports);
});
```

### Using `ListMonthlyReports`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMonthlyReportsRef, ListMonthlyReportsVariables } from '@dataconnect/admin-generated';

// The `ListMonthlyReports` query requires an argument of type `ListMonthlyReportsVariables`:
const listMonthlyReportsVars: ListMonthlyReportsVariables = {
  employeeId: ..., 
  companyId: ..., 
};

// Call the `listMonthlyReportsRef()` function to get a reference to the query.
const ref = listMonthlyReportsRef(listMonthlyReportsVars);
// Variables can be defined inline as well.
const ref = listMonthlyReportsRef({ employeeId: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMonthlyReportsRef(dataConnect, listMonthlyReportsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.monthlyProgressReports);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.monthlyProgressReports);
});
```

## GetMonthlyReportByKey
You can execute the `GetMonthlyReportByKey` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMonthlyReportByKey(vars: GetMonthlyReportByKeyVariables, options?: ExecuteQueryOptions): QueryPromise<GetMonthlyReportByKeyData, GetMonthlyReportByKeyVariables>;

interface GetMonthlyReportByKeyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMonthlyReportByKeyVariables): QueryRef<GetMonthlyReportByKeyData, GetMonthlyReportByKeyVariables>;
}
export const getMonthlyReportByKeyRef: GetMonthlyReportByKeyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMonthlyReportByKey(dc: DataConnect, vars: GetMonthlyReportByKeyVariables, options?: ExecuteQueryOptions): QueryPromise<GetMonthlyReportByKeyData, GetMonthlyReportByKeyVariables>;

interface GetMonthlyReportByKeyRef {
  ...
  (dc: DataConnect, vars: GetMonthlyReportByKeyVariables): QueryRef<GetMonthlyReportByKeyData, GetMonthlyReportByKeyVariables>;
}
export const getMonthlyReportByKeyRef: GetMonthlyReportByKeyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMonthlyReportByKeyRef:
```typescript
const name = getMonthlyReportByKeyRef.operationName;
console.log(name);
```

### Variables
The `GetMonthlyReportByKey` query requires an argument of type `GetMonthlyReportByKeyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMonthlyReportByKeyVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  month: string;
  year: number;
}
```
### Return Type
Recall that executing the `GetMonthlyReportByKey` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMonthlyReportByKeyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMonthlyReportByKeyData {
  monthlyProgressReports: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    month: string;
    year: number;
    performanceScore: number;
    behaviorScore: number;
    projectsCompleted: number;
    projectsInProgress: number;
    growthPercentage: number;
    promotionReadiness: number;
    nextRole?: string | null;
    isAiGenerated: boolean;
    reportData?: string | null;
    generatedDate: TimestampString;
  } & MonthlyProgressReport_Key)[];
}
```
### Using `GetMonthlyReportByKey`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMonthlyReportByKey, GetMonthlyReportByKeyVariables } from '@dataconnect/admin-generated';

// The `GetMonthlyReportByKey` query requires an argument of type `GetMonthlyReportByKeyVariables`:
const getMonthlyReportByKeyVars: GetMonthlyReportByKeyVariables = {
  employeeId: ..., 
  companyId: ..., 
  month: ..., 
  year: ..., 
};

// Call the `getMonthlyReportByKey()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMonthlyReportByKey(getMonthlyReportByKeyVars);
// Variables can be defined inline as well.
const { data } = await getMonthlyReportByKey({ employeeId: ..., companyId: ..., month: ..., year: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMonthlyReportByKey(dataConnect, getMonthlyReportByKeyVars);

console.log(data.monthlyProgressReports);

// Or, you can use the `Promise` API.
getMonthlyReportByKey(getMonthlyReportByKeyVars).then((response) => {
  const data = response.data;
  console.log(data.monthlyProgressReports);
});
```

### Using `GetMonthlyReportByKey`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMonthlyReportByKeyRef, GetMonthlyReportByKeyVariables } from '@dataconnect/admin-generated';

// The `GetMonthlyReportByKey` query requires an argument of type `GetMonthlyReportByKeyVariables`:
const getMonthlyReportByKeyVars: GetMonthlyReportByKeyVariables = {
  employeeId: ..., 
  companyId: ..., 
  month: ..., 
  year: ..., 
};

// Call the `getMonthlyReportByKeyRef()` function to get a reference to the query.
const ref = getMonthlyReportByKeyRef(getMonthlyReportByKeyVars);
// Variables can be defined inline as well.
const ref = getMonthlyReportByKeyRef({ employeeId: ..., companyId: ..., month: ..., year: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMonthlyReportByKeyRef(dataConnect, getMonthlyReportByKeyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.monthlyProgressReports);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.monthlyProgressReports);
});
```

## GetPrivacyByEmployee
You can execute the `GetPrivacyByEmployee` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPrivacyByEmployee(vars: GetPrivacyByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrivacyByEmployeeData, GetPrivacyByEmployeeVariables>;

interface GetPrivacyByEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPrivacyByEmployeeVariables): QueryRef<GetPrivacyByEmployeeData, GetPrivacyByEmployeeVariables>;
}
export const getPrivacyByEmployeeRef: GetPrivacyByEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPrivacyByEmployee(dc: DataConnect, vars: GetPrivacyByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrivacyByEmployeeData, GetPrivacyByEmployeeVariables>;

interface GetPrivacyByEmployeeRef {
  ...
  (dc: DataConnect, vars: GetPrivacyByEmployeeVariables): QueryRef<GetPrivacyByEmployeeData, GetPrivacyByEmployeeVariables>;
}
export const getPrivacyByEmployeeRef: GetPrivacyByEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPrivacyByEmployeeRef:
```typescript
const name = getPrivacyByEmployeeRef.operationName;
console.log(name);
```

### Variables
The `GetPrivacyByEmployee` query requires an argument of type `GetPrivacyByEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPrivacyByEmployeeVariables {
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `GetPrivacyByEmployee` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPrivacyByEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPrivacyByEmployeeData {
  employee?: {
    privacySettings?: {
      id: UUIDString;
      employee: {
        id: UUIDString;
      } & Employee_Key;
      company: {
        id: UUIDString;
      } & Company_Key;
      profileVisibility: string;
      namePublic: boolean;
      photoPublic: boolean;
      rolePublic: boolean;
      skillsPublic: boolean;
      skillLevelsPublic: boolean;
      skillGrowthPublic: boolean;
      projectsPublic: boolean;
      projectDescriptionsPublic: boolean;
      achievementsPublic: boolean;
      experiencePublic: boolean;
      performanceSummaryPublic: boolean;
      monthlyProgressPublic: boolean;
      behaviorSummaryPublic: boolean;
      isEmployeeControlled: boolean;
      ownershipTransferredAt?: TimestampString | null;
      publishedAt?: TimestampString | null;
      lastModifiedAt?: TimestampString | null;
      createdAt: TimestampString;
      updatedAt?: TimestampString | null;
    } & PrivacySettings_Key;
  };
}
```
### Using `GetPrivacyByEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPrivacyByEmployee, GetPrivacyByEmployeeVariables } from '@dataconnect/admin-generated';

// The `GetPrivacyByEmployee` query requires an argument of type `GetPrivacyByEmployeeVariables`:
const getPrivacyByEmployeeVars: GetPrivacyByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `getPrivacyByEmployee()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPrivacyByEmployee(getPrivacyByEmployeeVars);
// Variables can be defined inline as well.
const { data } = await getPrivacyByEmployee({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPrivacyByEmployee(dataConnect, getPrivacyByEmployeeVars);

console.log(data.employee);

// Or, you can use the `Promise` API.
getPrivacyByEmployee(getPrivacyByEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.employee);
});
```

### Using `GetPrivacyByEmployee`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPrivacyByEmployeeRef, GetPrivacyByEmployeeVariables } from '@dataconnect/admin-generated';

// The `GetPrivacyByEmployee` query requires an argument of type `GetPrivacyByEmployeeVariables`:
const getPrivacyByEmployeeVars: GetPrivacyByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `getPrivacyByEmployeeRef()` function to get a reference to the query.
const ref = getPrivacyByEmployeeRef(getPrivacyByEmployeeVars);
// Variables can be defined inline as well.
const ref = getPrivacyByEmployeeRef({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPrivacyByEmployeeRef(dataConnect, getPrivacyByEmployeeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employee);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employee);
});
```

## GetEmployeeEmploymentStatus
You can execute the `GetEmployeeEmploymentStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmployeeEmploymentStatus(vars: GetEmployeeEmploymentStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmployeeEmploymentStatusData, GetEmployeeEmploymentStatusVariables>;

interface GetEmployeeEmploymentStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmployeeEmploymentStatusVariables): QueryRef<GetEmployeeEmploymentStatusData, GetEmployeeEmploymentStatusVariables>;
}
export const getEmployeeEmploymentStatusRef: GetEmployeeEmploymentStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmployeeEmploymentStatus(dc: DataConnect, vars: GetEmployeeEmploymentStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmployeeEmploymentStatusData, GetEmployeeEmploymentStatusVariables>;

interface GetEmployeeEmploymentStatusRef {
  ...
  (dc: DataConnect, vars: GetEmployeeEmploymentStatusVariables): QueryRef<GetEmployeeEmploymentStatusData, GetEmployeeEmploymentStatusVariables>;
}
export const getEmployeeEmploymentStatusRef: GetEmployeeEmploymentStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmployeeEmploymentStatusRef:
```typescript
const name = getEmployeeEmploymentStatusRef.operationName;
console.log(name);
```

### Variables
The `GetEmployeeEmploymentStatus` query requires an argument of type `GetEmployeeEmploymentStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEmployeeEmploymentStatusVariables {
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `GetEmployeeEmploymentStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmployeeEmploymentStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEmployeeEmploymentStatusData {
  employee?: {
    id: UUIDString;
    employmentStatus: string;
  } & Employee_Key;
}
```
### Using `GetEmployeeEmploymentStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmployeeEmploymentStatus, GetEmployeeEmploymentStatusVariables } from '@dataconnect/admin-generated';

// The `GetEmployeeEmploymentStatus` query requires an argument of type `GetEmployeeEmploymentStatusVariables`:
const getEmployeeEmploymentStatusVars: GetEmployeeEmploymentStatusVariables = {
  employeeId: ..., 
};

// Call the `getEmployeeEmploymentStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmployeeEmploymentStatus(getEmployeeEmploymentStatusVars);
// Variables can be defined inline as well.
const { data } = await getEmployeeEmploymentStatus({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmployeeEmploymentStatus(dataConnect, getEmployeeEmploymentStatusVars);

console.log(data.employee);

// Or, you can use the `Promise` API.
getEmployeeEmploymentStatus(getEmployeeEmploymentStatusVars).then((response) => {
  const data = response.data;
  console.log(data.employee);
});
```

### Using `GetEmployeeEmploymentStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmployeeEmploymentStatusRef, GetEmployeeEmploymentStatusVariables } from '@dataconnect/admin-generated';

// The `GetEmployeeEmploymentStatus` query requires an argument of type `GetEmployeeEmploymentStatusVariables`:
const getEmployeeEmploymentStatusVars: GetEmployeeEmploymentStatusVariables = {
  employeeId: ..., 
};

// Call the `getEmployeeEmploymentStatusRef()` function to get a reference to the query.
const ref = getEmployeeEmploymentStatusRef(getEmployeeEmploymentStatusVars);
// Variables can be defined inline as well.
const ref = getEmployeeEmploymentStatusRef({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmployeeEmploymentStatusRef(dataConnect, getEmployeeEmploymentStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employee);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employee);
});
```

## GetPublicProfileByEmployee
You can execute the `GetPublicProfileByEmployee` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPublicProfileByEmployee(vars: GetPublicProfileByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<GetPublicProfileByEmployeeData, GetPublicProfileByEmployeeVariables>;

interface GetPublicProfileByEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPublicProfileByEmployeeVariables): QueryRef<GetPublicProfileByEmployeeData, GetPublicProfileByEmployeeVariables>;
}
export const getPublicProfileByEmployeeRef: GetPublicProfileByEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublicProfileByEmployee(dc: DataConnect, vars: GetPublicProfileByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<GetPublicProfileByEmployeeData, GetPublicProfileByEmployeeVariables>;

interface GetPublicProfileByEmployeeRef {
  ...
  (dc: DataConnect, vars: GetPublicProfileByEmployeeVariables): QueryRef<GetPublicProfileByEmployeeData, GetPublicProfileByEmployeeVariables>;
}
export const getPublicProfileByEmployeeRef: GetPublicProfileByEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublicProfileByEmployeeRef:
```typescript
const name = getPublicProfileByEmployeeRef.operationName;
console.log(name);
```

### Variables
The `GetPublicProfileByEmployee` query requires an argument of type `GetPublicProfileByEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPublicProfileByEmployeeVariables {
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `GetPublicProfileByEmployee` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublicProfileByEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPublicProfileByEmployeeData {
  publicProfiles: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    slug: string;
    isPublic: boolean;
    viewCount: number;
    lastViewedAt?: TimestampString | null;
    createdAt: TimestampString;
  } & PublicProfile_Key)[];
}
```
### Using `GetPublicProfileByEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublicProfileByEmployee, GetPublicProfileByEmployeeVariables } from '@dataconnect/admin-generated';

// The `GetPublicProfileByEmployee` query requires an argument of type `GetPublicProfileByEmployeeVariables`:
const getPublicProfileByEmployeeVars: GetPublicProfileByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `getPublicProfileByEmployee()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublicProfileByEmployee(getPublicProfileByEmployeeVars);
// Variables can be defined inline as well.
const { data } = await getPublicProfileByEmployee({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublicProfileByEmployee(dataConnect, getPublicProfileByEmployeeVars);

console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
getPublicProfileByEmployee(getPublicProfileByEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.publicProfiles);
});
```

### Using `GetPublicProfileByEmployee`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublicProfileByEmployeeRef, GetPublicProfileByEmployeeVariables } from '@dataconnect/admin-generated';

// The `GetPublicProfileByEmployee` query requires an argument of type `GetPublicProfileByEmployeeVariables`:
const getPublicProfileByEmployeeVars: GetPublicProfileByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `getPublicProfileByEmployeeRef()` function to get a reference to the query.
const ref = getPublicProfileByEmployeeRef(getPublicProfileByEmployeeVars);
// Variables can be defined inline as well.
const ref = getPublicProfileByEmployeeRef({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublicProfileByEmployeeRef(dataConnect, getPublicProfileByEmployeeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.publicProfiles);
});
```

## GetPublicProfileBySlug
You can execute the `GetPublicProfileBySlug` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPublicProfileBySlug(vars: GetPublicProfileBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetPublicProfileBySlugData, GetPublicProfileBySlugVariables>;

interface GetPublicProfileBySlugRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPublicProfileBySlugVariables): QueryRef<GetPublicProfileBySlugData, GetPublicProfileBySlugVariables>;
}
export const getPublicProfileBySlugRef: GetPublicProfileBySlugRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublicProfileBySlug(dc: DataConnect, vars: GetPublicProfileBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetPublicProfileBySlugData, GetPublicProfileBySlugVariables>;

interface GetPublicProfileBySlugRef {
  ...
  (dc: DataConnect, vars: GetPublicProfileBySlugVariables): QueryRef<GetPublicProfileBySlugData, GetPublicProfileBySlugVariables>;
}
export const getPublicProfileBySlugRef: GetPublicProfileBySlugRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublicProfileBySlugRef:
```typescript
const name = getPublicProfileBySlugRef.operationName;
console.log(name);
```

### Variables
The `GetPublicProfileBySlug` query requires an argument of type `GetPublicProfileBySlugVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPublicProfileBySlugVariables {
  slug: string;
}
```
### Return Type
Recall that executing the `GetPublicProfileBySlug` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublicProfileBySlugData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPublicProfileBySlugData {
  publicProfiles: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    slug: string;
    isPublic: boolean;
    viewCount: number;
    lastViewedAt?: TimestampString | null;
    createdAt: TimestampString;
  } & PublicProfile_Key)[];
}
```
### Using `GetPublicProfileBySlug`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublicProfileBySlug, GetPublicProfileBySlugVariables } from '@dataconnect/admin-generated';

// The `GetPublicProfileBySlug` query requires an argument of type `GetPublicProfileBySlugVariables`:
const getPublicProfileBySlugVars: GetPublicProfileBySlugVariables = {
  slug: ..., 
};

// Call the `getPublicProfileBySlug()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublicProfileBySlug(getPublicProfileBySlugVars);
// Variables can be defined inline as well.
const { data } = await getPublicProfileBySlug({ slug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublicProfileBySlug(dataConnect, getPublicProfileBySlugVars);

console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
getPublicProfileBySlug(getPublicProfileBySlugVars).then((response) => {
  const data = response.data;
  console.log(data.publicProfiles);
});
```

### Using `GetPublicProfileBySlug`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublicProfileBySlugRef, GetPublicProfileBySlugVariables } from '@dataconnect/admin-generated';

// The `GetPublicProfileBySlug` query requires an argument of type `GetPublicProfileBySlugVariables`:
const getPublicProfileBySlugVars: GetPublicProfileBySlugVariables = {
  slug: ..., 
};

// Call the `getPublicProfileBySlugRef()` function to get a reference to the query.
const ref = getPublicProfileBySlugRef(getPublicProfileBySlugVars);
// Variables can be defined inline as well.
const ref = getPublicProfileBySlugRef({ slug: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublicProfileBySlugRef(dataConnect, getPublicProfileBySlugVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.publicProfiles);
});
```

## CheckSlugExists
You can execute the `CheckSlugExists` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
checkSlugExists(vars: CheckSlugExistsVariables, options?: ExecuteQueryOptions): QueryPromise<CheckSlugExistsData, CheckSlugExistsVariables>;

interface CheckSlugExistsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CheckSlugExistsVariables): QueryRef<CheckSlugExistsData, CheckSlugExistsVariables>;
}
export const checkSlugExistsRef: CheckSlugExistsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
checkSlugExists(dc: DataConnect, vars: CheckSlugExistsVariables, options?: ExecuteQueryOptions): QueryPromise<CheckSlugExistsData, CheckSlugExistsVariables>;

interface CheckSlugExistsRef {
  ...
  (dc: DataConnect, vars: CheckSlugExistsVariables): QueryRef<CheckSlugExistsData, CheckSlugExistsVariables>;
}
export const checkSlugExistsRef: CheckSlugExistsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the checkSlugExistsRef:
```typescript
const name = checkSlugExistsRef.operationName;
console.log(name);
```

### Variables
The `CheckSlugExists` query requires an argument of type `CheckSlugExistsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CheckSlugExistsVariables {
  slug: string;
}
```
### Return Type
Recall that executing the `CheckSlugExists` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CheckSlugExistsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CheckSlugExistsData {
  publicProfiles: ({
    id: UUIDString;
  } & PublicProfile_Key)[];
}
```
### Using `CheckSlugExists`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, checkSlugExists, CheckSlugExistsVariables } from '@dataconnect/admin-generated';

// The `CheckSlugExists` query requires an argument of type `CheckSlugExistsVariables`:
const checkSlugExistsVars: CheckSlugExistsVariables = {
  slug: ..., 
};

// Call the `checkSlugExists()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await checkSlugExists(checkSlugExistsVars);
// Variables can be defined inline as well.
const { data } = await checkSlugExists({ slug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await checkSlugExists(dataConnect, checkSlugExistsVars);

console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
checkSlugExists(checkSlugExistsVars).then((response) => {
  const data = response.data;
  console.log(data.publicProfiles);
});
```

### Using `CheckSlugExists`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, checkSlugExistsRef, CheckSlugExistsVariables } from '@dataconnect/admin-generated';

// The `CheckSlugExists` query requires an argument of type `CheckSlugExistsVariables`:
const checkSlugExistsVars: CheckSlugExistsVariables = {
  slug: ..., 
};

// Call the `checkSlugExistsRef()` function to get a reference to the query.
const ref = checkSlugExistsRef(checkSlugExistsVars);
// Variables can be defined inline as well.
const ref = checkSlugExistsRef({ slug: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = checkSlugExistsRef(dataConnect, checkSlugExistsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.publicProfiles);
});
```

## ListPublicProfiles
You can execute the `ListPublicProfiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPublicProfiles(options?: ExecuteQueryOptions): QueryPromise<ListPublicProfilesData, undefined>;

interface ListPublicProfilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicProfilesData, undefined>;
}
export const listPublicProfilesRef: ListPublicProfilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPublicProfiles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPublicProfilesData, undefined>;

interface ListPublicProfilesRef {
  ...
  (dc: DataConnect): QueryRef<ListPublicProfilesData, undefined>;
}
export const listPublicProfilesRef: ListPublicProfilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPublicProfilesRef:
```typescript
const name = listPublicProfilesRef.operationName;
console.log(name);
```

### Variables
The `ListPublicProfiles` query has no variables.
### Return Type
Recall that executing the `ListPublicProfiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPublicProfilesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPublicProfilesData {
  publicProfiles: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    slug: string;
    isPublic: boolean;
    viewCount: number;
    lastViewedAt?: TimestampString | null;
    employee: {
      id: UUIDString;
      userId?: UUIDString | null;
      companyId: UUIDString;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string | null;
      jobTitle: string;
      department: string;
      employmentType: string;
      employmentStatus: string;
      startDate: DateString;
      endDate?: DateString | null;
      managerId?: UUIDString | null;
      profilePhoto?: string | null;
      location?: string | null;
      isVerified: boolean;
      verifiedAt?: TimestampString | null;
      verifiedById?: UUIDString | null;
      createdAt: TimestampString;
      updatedAt?: TimestampString | null;
      deletedAt?: TimestampString | null;
    } & Employee_Key;
  } & PublicProfile_Key)[];
}
```
### Using `ListPublicProfiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublicProfiles } from '@dataconnect/admin-generated';


// Call the `listPublicProfiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPublicProfiles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPublicProfiles(dataConnect);

console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
listPublicProfiles().then((response) => {
  const data = response.data;
  console.log(data.publicProfiles);
});
```

### Using `ListPublicProfiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPublicProfilesRef } from '@dataconnect/admin-generated';


// Call the `listPublicProfilesRef()` function to get a reference to the query.
const ref = listPublicProfilesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPublicProfilesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.publicProfiles);
});
```

## GetVerificationCorrectionById
You can execute the `GetVerificationCorrectionById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getVerificationCorrectionById(vars: GetVerificationCorrectionByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetVerificationCorrectionByIdData, GetVerificationCorrectionByIdVariables>;

interface GetVerificationCorrectionByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetVerificationCorrectionByIdVariables): QueryRef<GetVerificationCorrectionByIdData, GetVerificationCorrectionByIdVariables>;
}
export const getVerificationCorrectionByIdRef: GetVerificationCorrectionByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getVerificationCorrectionById(dc: DataConnect, vars: GetVerificationCorrectionByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetVerificationCorrectionByIdData, GetVerificationCorrectionByIdVariables>;

interface GetVerificationCorrectionByIdRef {
  ...
  (dc: DataConnect, vars: GetVerificationCorrectionByIdVariables): QueryRef<GetVerificationCorrectionByIdData, GetVerificationCorrectionByIdVariables>;
}
export const getVerificationCorrectionByIdRef: GetVerificationCorrectionByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getVerificationCorrectionByIdRef:
```typescript
const name = getVerificationCorrectionByIdRef.operationName;
console.log(name);
```

### Variables
The `GetVerificationCorrectionById` query requires an argument of type `GetVerificationCorrectionByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetVerificationCorrectionByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetVerificationCorrectionById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetVerificationCorrectionByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetVerificationCorrectionByIdData {
  verificationCorrection?: {
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    fieldName: string;
    oldValue?: string | null;
    newValue?: string | null;
    reason?: string | null;
    status: string;
    requestedById?: UUIDString | null;
    reviewedById?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & VerificationCorrection_Key;
}
```
### Using `GetVerificationCorrectionById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getVerificationCorrectionById, GetVerificationCorrectionByIdVariables } from '@dataconnect/admin-generated';

// The `GetVerificationCorrectionById` query requires an argument of type `GetVerificationCorrectionByIdVariables`:
const getVerificationCorrectionByIdVars: GetVerificationCorrectionByIdVariables = {
  id: ..., 
};

// Call the `getVerificationCorrectionById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getVerificationCorrectionById(getVerificationCorrectionByIdVars);
// Variables can be defined inline as well.
const { data } = await getVerificationCorrectionById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getVerificationCorrectionById(dataConnect, getVerificationCorrectionByIdVars);

console.log(data.verificationCorrection);

// Or, you can use the `Promise` API.
getVerificationCorrectionById(getVerificationCorrectionByIdVars).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrection);
});
```

### Using `GetVerificationCorrectionById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getVerificationCorrectionByIdRef, GetVerificationCorrectionByIdVariables } from '@dataconnect/admin-generated';

// The `GetVerificationCorrectionById` query requires an argument of type `GetVerificationCorrectionByIdVariables`:
const getVerificationCorrectionByIdVars: GetVerificationCorrectionByIdVariables = {
  id: ..., 
};

// Call the `getVerificationCorrectionByIdRef()` function to get a reference to the query.
const ref = getVerificationCorrectionByIdRef(getVerificationCorrectionByIdVars);
// Variables can be defined inline as well.
const ref = getVerificationCorrectionByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getVerificationCorrectionByIdRef(dataConnect, getVerificationCorrectionByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.verificationCorrection);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrection);
});
```

## ListVerificationCorrectionsByEmployee
You can execute the `ListVerificationCorrectionsByEmployee` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVerificationCorrectionsByEmployee(vars: ListVerificationCorrectionsByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<ListVerificationCorrectionsByEmployeeData, ListVerificationCorrectionsByEmployeeVariables>;

interface ListVerificationCorrectionsByEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVerificationCorrectionsByEmployeeVariables): QueryRef<ListVerificationCorrectionsByEmployeeData, ListVerificationCorrectionsByEmployeeVariables>;
}
export const listVerificationCorrectionsByEmployeeRef: ListVerificationCorrectionsByEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVerificationCorrectionsByEmployee(dc: DataConnect, vars: ListVerificationCorrectionsByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<ListVerificationCorrectionsByEmployeeData, ListVerificationCorrectionsByEmployeeVariables>;

interface ListVerificationCorrectionsByEmployeeRef {
  ...
  (dc: DataConnect, vars: ListVerificationCorrectionsByEmployeeVariables): QueryRef<ListVerificationCorrectionsByEmployeeData, ListVerificationCorrectionsByEmployeeVariables>;
}
export const listVerificationCorrectionsByEmployeeRef: ListVerificationCorrectionsByEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVerificationCorrectionsByEmployeeRef:
```typescript
const name = listVerificationCorrectionsByEmployeeRef.operationName;
console.log(name);
```

### Variables
The `ListVerificationCorrectionsByEmployee` query requires an argument of type `ListVerificationCorrectionsByEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListVerificationCorrectionsByEmployeeVariables {
  employeeId: UUIDString;
  status?: string | null;
}
```
### Return Type
Recall that executing the `ListVerificationCorrectionsByEmployee` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVerificationCorrectionsByEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListVerificationCorrectionsByEmployeeData {
  verificationCorrections: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    fieldName: string;
    oldValue?: string | null;
    newValue?: string | null;
    reason?: string | null;
    status: string;
    requestedById?: UUIDString | null;
    reviewedById?: UUIDString | null;
    createdAt: TimestampString;
  } & VerificationCorrection_Key)[];
}
```
### Using `ListVerificationCorrectionsByEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVerificationCorrectionsByEmployee, ListVerificationCorrectionsByEmployeeVariables } from '@dataconnect/admin-generated';

// The `ListVerificationCorrectionsByEmployee` query requires an argument of type `ListVerificationCorrectionsByEmployeeVariables`:
const listVerificationCorrectionsByEmployeeVars: ListVerificationCorrectionsByEmployeeVariables = {
  employeeId: ..., 
  status: ..., // optional
};

// Call the `listVerificationCorrectionsByEmployee()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVerificationCorrectionsByEmployee(listVerificationCorrectionsByEmployeeVars);
// Variables can be defined inline as well.
const { data } = await listVerificationCorrectionsByEmployee({ employeeId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVerificationCorrectionsByEmployee(dataConnect, listVerificationCorrectionsByEmployeeVars);

console.log(data.verificationCorrections);

// Or, you can use the `Promise` API.
listVerificationCorrectionsByEmployee(listVerificationCorrectionsByEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrections);
});
```

### Using `ListVerificationCorrectionsByEmployee`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVerificationCorrectionsByEmployeeRef, ListVerificationCorrectionsByEmployeeVariables } from '@dataconnect/admin-generated';

// The `ListVerificationCorrectionsByEmployee` query requires an argument of type `ListVerificationCorrectionsByEmployeeVariables`:
const listVerificationCorrectionsByEmployeeVars: ListVerificationCorrectionsByEmployeeVariables = {
  employeeId: ..., 
  status: ..., // optional
};

// Call the `listVerificationCorrectionsByEmployeeRef()` function to get a reference to the query.
const ref = listVerificationCorrectionsByEmployeeRef(listVerificationCorrectionsByEmployeeVars);
// Variables can be defined inline as well.
const ref = listVerificationCorrectionsByEmployeeRef({ employeeId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVerificationCorrectionsByEmployeeRef(dataConnect, listVerificationCorrectionsByEmployeeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.verificationCorrections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrections);
});
```

## ListVerificationCorrectionsByCompany
You can execute the `ListVerificationCorrectionsByCompany` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVerificationCorrectionsByCompany(vars: ListVerificationCorrectionsByCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<ListVerificationCorrectionsByCompanyData, ListVerificationCorrectionsByCompanyVariables>;

interface ListVerificationCorrectionsByCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListVerificationCorrectionsByCompanyVariables): QueryRef<ListVerificationCorrectionsByCompanyData, ListVerificationCorrectionsByCompanyVariables>;
}
export const listVerificationCorrectionsByCompanyRef: ListVerificationCorrectionsByCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVerificationCorrectionsByCompany(dc: DataConnect, vars: ListVerificationCorrectionsByCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<ListVerificationCorrectionsByCompanyData, ListVerificationCorrectionsByCompanyVariables>;

interface ListVerificationCorrectionsByCompanyRef {
  ...
  (dc: DataConnect, vars: ListVerificationCorrectionsByCompanyVariables): QueryRef<ListVerificationCorrectionsByCompanyData, ListVerificationCorrectionsByCompanyVariables>;
}
export const listVerificationCorrectionsByCompanyRef: ListVerificationCorrectionsByCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVerificationCorrectionsByCompanyRef:
```typescript
const name = listVerificationCorrectionsByCompanyRef.operationName;
console.log(name);
```

### Variables
The `ListVerificationCorrectionsByCompany` query requires an argument of type `ListVerificationCorrectionsByCompanyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListVerificationCorrectionsByCompanyVariables {
  companyId: UUIDString;
  status?: string | null;
}
```
### Return Type
Recall that executing the `ListVerificationCorrectionsByCompany` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVerificationCorrectionsByCompanyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListVerificationCorrectionsByCompanyData {
  verificationCorrections: ({
    id: UUIDString;
    employeeId: UUIDString;
    companyId: UUIDString;
    fieldName: string;
    oldValue?: string | null;
    newValue?: string | null;
    reason?: string | null;
    status: string;
    requestedById?: UUIDString | null;
    reviewedById?: UUIDString | null;
    createdAt: TimestampString;
  } & VerificationCorrection_Key)[];
}
```
### Using `ListVerificationCorrectionsByCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVerificationCorrectionsByCompany, ListVerificationCorrectionsByCompanyVariables } from '@dataconnect/admin-generated';

// The `ListVerificationCorrectionsByCompany` query requires an argument of type `ListVerificationCorrectionsByCompanyVariables`:
const listVerificationCorrectionsByCompanyVars: ListVerificationCorrectionsByCompanyVariables = {
  companyId: ..., 
  status: ..., // optional
};

// Call the `listVerificationCorrectionsByCompany()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVerificationCorrectionsByCompany(listVerificationCorrectionsByCompanyVars);
// Variables can be defined inline as well.
const { data } = await listVerificationCorrectionsByCompany({ companyId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVerificationCorrectionsByCompany(dataConnect, listVerificationCorrectionsByCompanyVars);

console.log(data.verificationCorrections);

// Or, you can use the `Promise` API.
listVerificationCorrectionsByCompany(listVerificationCorrectionsByCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrections);
});
```

### Using `ListVerificationCorrectionsByCompany`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVerificationCorrectionsByCompanyRef, ListVerificationCorrectionsByCompanyVariables } from '@dataconnect/admin-generated';

// The `ListVerificationCorrectionsByCompany` query requires an argument of type `ListVerificationCorrectionsByCompanyVariables`:
const listVerificationCorrectionsByCompanyVars: ListVerificationCorrectionsByCompanyVariables = {
  companyId: ..., 
  status: ..., // optional
};

// Call the `listVerificationCorrectionsByCompanyRef()` function to get a reference to the query.
const ref = listVerificationCorrectionsByCompanyRef(listVerificationCorrectionsByCompanyVars);
// Variables can be defined inline as well.
const ref = listVerificationCorrectionsByCompanyRef({ companyId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVerificationCorrectionsByCompanyRef(dataConnect, listVerificationCorrectionsByCompanyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.verificationCorrections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrections);
});
```

## GetJobOpportunityById
You can execute the `GetJobOpportunityById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getJobOpportunityById(vars: GetJobOpportunityByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetJobOpportunityByIdData, GetJobOpportunityByIdVariables>;

interface GetJobOpportunityByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetJobOpportunityByIdVariables): QueryRef<GetJobOpportunityByIdData, GetJobOpportunityByIdVariables>;
}
export const getJobOpportunityByIdRef: GetJobOpportunityByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getJobOpportunityById(dc: DataConnect, vars: GetJobOpportunityByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetJobOpportunityByIdData, GetJobOpportunityByIdVariables>;

interface GetJobOpportunityByIdRef {
  ...
  (dc: DataConnect, vars: GetJobOpportunityByIdVariables): QueryRef<GetJobOpportunityByIdData, GetJobOpportunityByIdVariables>;
}
export const getJobOpportunityByIdRef: GetJobOpportunityByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getJobOpportunityByIdRef:
```typescript
const name = getJobOpportunityByIdRef.operationName;
console.log(name);
```

### Variables
The `GetJobOpportunityById` query requires an argument of type `GetJobOpportunityByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetJobOpportunityByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetJobOpportunityById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetJobOpportunityByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetJobOpportunityByIdData {
  jobOpportunity?: {
    id: UUIDString;
    recruiterId: UUIDString;
    employeeId: UUIDString;
    title: string;
    companyName: string;
    description?: string | null;
    status: string;
    message?: string | null;
    salaryRange?: string | null;
    location?: string | null;
    sentAt: TimestampString;
    viewedAt?: TimestampString | null;
    respondedAt?: TimestampString | null;
    createdAt: TimestampString;
    employee: {
      id: UUIDString;
      firstName: string;
      lastName: string;
      jobTitle: string;
    } & Employee_Key;
    recruiter: {
      id: UUIDString;
      fullName: string;
      email: string;
    } & User_Key;
  } & JobOpportunity_Key;
}
```
### Using `GetJobOpportunityById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getJobOpportunityById, GetJobOpportunityByIdVariables } from '@dataconnect/admin-generated';

// The `GetJobOpportunityById` query requires an argument of type `GetJobOpportunityByIdVariables`:
const getJobOpportunityByIdVars: GetJobOpportunityByIdVariables = {
  id: ..., 
};

// Call the `getJobOpportunityById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getJobOpportunityById(getJobOpportunityByIdVars);
// Variables can be defined inline as well.
const { data } = await getJobOpportunityById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getJobOpportunityById(dataConnect, getJobOpportunityByIdVars);

console.log(data.jobOpportunity);

// Or, you can use the `Promise` API.
getJobOpportunityById(getJobOpportunityByIdVars).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunity);
});
```

### Using `GetJobOpportunityById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getJobOpportunityByIdRef, GetJobOpportunityByIdVariables } from '@dataconnect/admin-generated';

// The `GetJobOpportunityById` query requires an argument of type `GetJobOpportunityByIdVariables`:
const getJobOpportunityByIdVars: GetJobOpportunityByIdVariables = {
  id: ..., 
};

// Call the `getJobOpportunityByIdRef()` function to get a reference to the query.
const ref = getJobOpportunityByIdRef(getJobOpportunityByIdVars);
// Variables can be defined inline as well.
const ref = getJobOpportunityByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getJobOpportunityByIdRef(dataConnect, getJobOpportunityByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobOpportunity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunity);
});
```

## ListJobOpportunitiesByRecruiter
You can execute the `ListJobOpportunitiesByRecruiter` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listJobOpportunitiesByRecruiter(vars: ListJobOpportunitiesByRecruiterVariables, options?: ExecuteQueryOptions): QueryPromise<ListJobOpportunitiesByRecruiterData, ListJobOpportunitiesByRecruiterVariables>;

interface ListJobOpportunitiesByRecruiterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListJobOpportunitiesByRecruiterVariables): QueryRef<ListJobOpportunitiesByRecruiterData, ListJobOpportunitiesByRecruiterVariables>;
}
export const listJobOpportunitiesByRecruiterRef: ListJobOpportunitiesByRecruiterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listJobOpportunitiesByRecruiter(dc: DataConnect, vars: ListJobOpportunitiesByRecruiterVariables, options?: ExecuteQueryOptions): QueryPromise<ListJobOpportunitiesByRecruiterData, ListJobOpportunitiesByRecruiterVariables>;

interface ListJobOpportunitiesByRecruiterRef {
  ...
  (dc: DataConnect, vars: ListJobOpportunitiesByRecruiterVariables): QueryRef<ListJobOpportunitiesByRecruiterData, ListJobOpportunitiesByRecruiterVariables>;
}
export const listJobOpportunitiesByRecruiterRef: ListJobOpportunitiesByRecruiterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listJobOpportunitiesByRecruiterRef:
```typescript
const name = listJobOpportunitiesByRecruiterRef.operationName;
console.log(name);
```

### Variables
The `ListJobOpportunitiesByRecruiter` query requires an argument of type `ListJobOpportunitiesByRecruiterVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListJobOpportunitiesByRecruiterVariables {
  recruiterId: UUIDString;
}
```
### Return Type
Recall that executing the `ListJobOpportunitiesByRecruiter` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListJobOpportunitiesByRecruiterData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListJobOpportunitiesByRecruiterData {
  jobOpportunities: ({
    id: UUIDString;
    recruiterId: UUIDString;
    employeeId: UUIDString;
    title: string;
    companyName: string;
    description?: string | null;
    status: string;
    message?: string | null;
    salaryRange?: string | null;
    location?: string | null;
    sentAt: TimestampString;
    viewedAt?: TimestampString | null;
    respondedAt?: TimestampString | null;
    createdAt: TimestampString;
    employee: {
      id: UUIDString;
      firstName: string;
      lastName: string;
      jobTitle: string;
    } & Employee_Key;
  } & JobOpportunity_Key)[];
}
```
### Using `ListJobOpportunitiesByRecruiter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listJobOpportunitiesByRecruiter, ListJobOpportunitiesByRecruiterVariables } from '@dataconnect/admin-generated';

// The `ListJobOpportunitiesByRecruiter` query requires an argument of type `ListJobOpportunitiesByRecruiterVariables`:
const listJobOpportunitiesByRecruiterVars: ListJobOpportunitiesByRecruiterVariables = {
  recruiterId: ..., 
};

// Call the `listJobOpportunitiesByRecruiter()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listJobOpportunitiesByRecruiter(listJobOpportunitiesByRecruiterVars);
// Variables can be defined inline as well.
const { data } = await listJobOpportunitiesByRecruiter({ recruiterId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listJobOpportunitiesByRecruiter(dataConnect, listJobOpportunitiesByRecruiterVars);

console.log(data.jobOpportunities);

// Or, you can use the `Promise` API.
listJobOpportunitiesByRecruiter(listJobOpportunitiesByRecruiterVars).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunities);
});
```

### Using `ListJobOpportunitiesByRecruiter`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listJobOpportunitiesByRecruiterRef, ListJobOpportunitiesByRecruiterVariables } from '@dataconnect/admin-generated';

// The `ListJobOpportunitiesByRecruiter` query requires an argument of type `ListJobOpportunitiesByRecruiterVariables`:
const listJobOpportunitiesByRecruiterVars: ListJobOpportunitiesByRecruiterVariables = {
  recruiterId: ..., 
};

// Call the `listJobOpportunitiesByRecruiterRef()` function to get a reference to the query.
const ref = listJobOpportunitiesByRecruiterRef(listJobOpportunitiesByRecruiterVars);
// Variables can be defined inline as well.
const ref = listJobOpportunitiesByRecruiterRef({ recruiterId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listJobOpportunitiesByRecruiterRef(dataConnect, listJobOpportunitiesByRecruiterVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobOpportunities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunities);
});
```

## ListJobOpportunitiesByEmployee
You can execute the `ListJobOpportunitiesByEmployee` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listJobOpportunitiesByEmployee(vars: ListJobOpportunitiesByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<ListJobOpportunitiesByEmployeeData, ListJobOpportunitiesByEmployeeVariables>;

interface ListJobOpportunitiesByEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListJobOpportunitiesByEmployeeVariables): QueryRef<ListJobOpportunitiesByEmployeeData, ListJobOpportunitiesByEmployeeVariables>;
}
export const listJobOpportunitiesByEmployeeRef: ListJobOpportunitiesByEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listJobOpportunitiesByEmployee(dc: DataConnect, vars: ListJobOpportunitiesByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<ListJobOpportunitiesByEmployeeData, ListJobOpportunitiesByEmployeeVariables>;

interface ListJobOpportunitiesByEmployeeRef {
  ...
  (dc: DataConnect, vars: ListJobOpportunitiesByEmployeeVariables): QueryRef<ListJobOpportunitiesByEmployeeData, ListJobOpportunitiesByEmployeeVariables>;
}
export const listJobOpportunitiesByEmployeeRef: ListJobOpportunitiesByEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listJobOpportunitiesByEmployeeRef:
```typescript
const name = listJobOpportunitiesByEmployeeRef.operationName;
console.log(name);
```

### Variables
The `ListJobOpportunitiesByEmployee` query requires an argument of type `ListJobOpportunitiesByEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListJobOpportunitiesByEmployeeVariables {
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `ListJobOpportunitiesByEmployee` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListJobOpportunitiesByEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListJobOpportunitiesByEmployeeData {
  jobOpportunities: ({
    id: UUIDString;
    recruiterId: UUIDString;
    employeeId: UUIDString;
    title: string;
    companyName: string;
    description?: string | null;
    status: string;
    message?: string | null;
    salaryRange?: string | null;
    location?: string | null;
    sentAt: TimestampString;
    viewedAt?: TimestampString | null;
    respondedAt?: TimestampString | null;
    createdAt: TimestampString;
    recruiter: {
      id: UUIDString;
      fullName: string;
    } & User_Key;
  } & JobOpportunity_Key)[];
}
```
### Using `ListJobOpportunitiesByEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listJobOpportunitiesByEmployee, ListJobOpportunitiesByEmployeeVariables } from '@dataconnect/admin-generated';

// The `ListJobOpportunitiesByEmployee` query requires an argument of type `ListJobOpportunitiesByEmployeeVariables`:
const listJobOpportunitiesByEmployeeVars: ListJobOpportunitiesByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `listJobOpportunitiesByEmployee()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listJobOpportunitiesByEmployee(listJobOpportunitiesByEmployeeVars);
// Variables can be defined inline as well.
const { data } = await listJobOpportunitiesByEmployee({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listJobOpportunitiesByEmployee(dataConnect, listJobOpportunitiesByEmployeeVars);

console.log(data.jobOpportunities);

// Or, you can use the `Promise` API.
listJobOpportunitiesByEmployee(listJobOpportunitiesByEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunities);
});
```

### Using `ListJobOpportunitiesByEmployee`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listJobOpportunitiesByEmployeeRef, ListJobOpportunitiesByEmployeeVariables } from '@dataconnect/admin-generated';

// The `ListJobOpportunitiesByEmployee` query requires an argument of type `ListJobOpportunitiesByEmployeeVariables`:
const listJobOpportunitiesByEmployeeVars: ListJobOpportunitiesByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `listJobOpportunitiesByEmployeeRef()` function to get a reference to the query.
const ref = listJobOpportunitiesByEmployeeRef(listJobOpportunitiesByEmployeeVars);
// Variables can be defined inline as well.
const ref = listJobOpportunitiesByEmployeeRef({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listJobOpportunitiesByEmployeeRef(dataConnect, listJobOpportunitiesByEmployeeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobOpportunities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunities);
});
```

## CountJobOpportunitiesByStatus
You can execute the `CountJobOpportunitiesByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
countJobOpportunitiesByStatus(vars: CountJobOpportunitiesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<CountJobOpportunitiesByStatusData, CountJobOpportunitiesByStatusVariables>;

interface CountJobOpportunitiesByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CountJobOpportunitiesByStatusVariables): QueryRef<CountJobOpportunitiesByStatusData, CountJobOpportunitiesByStatusVariables>;
}
export const countJobOpportunitiesByStatusRef: CountJobOpportunitiesByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
countJobOpportunitiesByStatus(dc: DataConnect, vars: CountJobOpportunitiesByStatusVariables, options?: ExecuteQueryOptions): QueryPromise<CountJobOpportunitiesByStatusData, CountJobOpportunitiesByStatusVariables>;

interface CountJobOpportunitiesByStatusRef {
  ...
  (dc: DataConnect, vars: CountJobOpportunitiesByStatusVariables): QueryRef<CountJobOpportunitiesByStatusData, CountJobOpportunitiesByStatusVariables>;
}
export const countJobOpportunitiesByStatusRef: CountJobOpportunitiesByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the countJobOpportunitiesByStatusRef:
```typescript
const name = countJobOpportunitiesByStatusRef.operationName;
console.log(name);
```

### Variables
The `CountJobOpportunitiesByStatus` query requires an argument of type `CountJobOpportunitiesByStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CountJobOpportunitiesByStatusVariables {
  recruiterId: UUIDString;
}
```
### Return Type
Recall that executing the `CountJobOpportunitiesByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CountJobOpportunitiesByStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CountJobOpportunitiesByStatusData {
  jobOpportunities: ({
    id: UUIDString;
    status: string;
  } & JobOpportunity_Key)[];
}
```
### Using `CountJobOpportunitiesByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, countJobOpportunitiesByStatus, CountJobOpportunitiesByStatusVariables } from '@dataconnect/admin-generated';

// The `CountJobOpportunitiesByStatus` query requires an argument of type `CountJobOpportunitiesByStatusVariables`:
const countJobOpportunitiesByStatusVars: CountJobOpportunitiesByStatusVariables = {
  recruiterId: ..., 
};

// Call the `countJobOpportunitiesByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await countJobOpportunitiesByStatus(countJobOpportunitiesByStatusVars);
// Variables can be defined inline as well.
const { data } = await countJobOpportunitiesByStatus({ recruiterId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await countJobOpportunitiesByStatus(dataConnect, countJobOpportunitiesByStatusVars);

console.log(data.jobOpportunities);

// Or, you can use the `Promise` API.
countJobOpportunitiesByStatus(countJobOpportunitiesByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunities);
});
```

### Using `CountJobOpportunitiesByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, countJobOpportunitiesByStatusRef, CountJobOpportunitiesByStatusVariables } from '@dataconnect/admin-generated';

// The `CountJobOpportunitiesByStatus` query requires an argument of type `CountJobOpportunitiesByStatusVariables`:
const countJobOpportunitiesByStatusVars: CountJobOpportunitiesByStatusVariables = {
  recruiterId: ..., 
};

// Call the `countJobOpportunitiesByStatusRef()` function to get a reference to the query.
const ref = countJobOpportunitiesByStatusRef(countJobOpportunitiesByStatusVars);
// Variables can be defined inline as well.
const ref = countJobOpportunitiesByStatusRef({ recruiterId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = countJobOpportunitiesByStatusRef(dataConnect, countJobOpportunitiesByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobOpportunities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunities);
});
```

## ListEmploymentLinksByPerson
You can execute the `ListEmploymentLinksByPerson` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEmploymentLinksByPerson(vars: ListEmploymentLinksByPersonVariables, options?: ExecuteQueryOptions): QueryPromise<ListEmploymentLinksByPersonData, ListEmploymentLinksByPersonVariables>;

interface ListEmploymentLinksByPersonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListEmploymentLinksByPersonVariables): QueryRef<ListEmploymentLinksByPersonData, ListEmploymentLinksByPersonVariables>;
}
export const listEmploymentLinksByPersonRef: ListEmploymentLinksByPersonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEmploymentLinksByPerson(dc: DataConnect, vars: ListEmploymentLinksByPersonVariables, options?: ExecuteQueryOptions): QueryPromise<ListEmploymentLinksByPersonData, ListEmploymentLinksByPersonVariables>;

interface ListEmploymentLinksByPersonRef {
  ...
  (dc: DataConnect, vars: ListEmploymentLinksByPersonVariables): QueryRef<ListEmploymentLinksByPersonData, ListEmploymentLinksByPersonVariables>;
}
export const listEmploymentLinksByPersonRef: ListEmploymentLinksByPersonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEmploymentLinksByPersonRef:
```typescript
const name = listEmploymentLinksByPersonRef.operationName;
console.log(name);
```

### Variables
The `ListEmploymentLinksByPerson` query requires an argument of type `ListEmploymentLinksByPersonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListEmploymentLinksByPersonVariables {
  personEmail: string;
}
```
### Return Type
Recall that executing the `ListEmploymentLinksByPerson` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEmploymentLinksByPersonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListEmploymentLinksByPersonData {
  employmentLinks: ({
    id: UUIDString;
    personEmail: string;
    userId?: UUIDString | null;
    employeeId: UUIDString;
    companyId: UUIDString;
    jobTitle?: string | null;
    department?: string | null;
    startedAt?: DateString | null;
    leftAt?: DateString | null;
    isCurrent: boolean;
    source: string;
    createdAt: TimestampString;
    company: {
      id: UUIDString;
      name: string;
    } & Company_Key;
  } & EmploymentLink_Key)[];
}
```
### Using `ListEmploymentLinksByPerson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEmploymentLinksByPerson, ListEmploymentLinksByPersonVariables } from '@dataconnect/admin-generated';

// The `ListEmploymentLinksByPerson` query requires an argument of type `ListEmploymentLinksByPersonVariables`:
const listEmploymentLinksByPersonVars: ListEmploymentLinksByPersonVariables = {
  personEmail: ..., 
};

// Call the `listEmploymentLinksByPerson()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEmploymentLinksByPerson(listEmploymentLinksByPersonVars);
// Variables can be defined inline as well.
const { data } = await listEmploymentLinksByPerson({ personEmail: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEmploymentLinksByPerson(dataConnect, listEmploymentLinksByPersonVars);

console.log(data.employmentLinks);

// Or, you can use the `Promise` API.
listEmploymentLinksByPerson(listEmploymentLinksByPersonVars).then((response) => {
  const data = response.data;
  console.log(data.employmentLinks);
});
```

### Using `ListEmploymentLinksByPerson`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEmploymentLinksByPersonRef, ListEmploymentLinksByPersonVariables } from '@dataconnect/admin-generated';

// The `ListEmploymentLinksByPerson` query requires an argument of type `ListEmploymentLinksByPersonVariables`:
const listEmploymentLinksByPersonVars: ListEmploymentLinksByPersonVariables = {
  personEmail: ..., 
};

// Call the `listEmploymentLinksByPersonRef()` function to get a reference to the query.
const ref = listEmploymentLinksByPersonRef(listEmploymentLinksByPersonVars);
// Variables can be defined inline as well.
const ref = listEmploymentLinksByPersonRef({ personEmail: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEmploymentLinksByPersonRef(dataConnect, listEmploymentLinksByPersonVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employmentLinks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employmentLinks);
});
```

## GetEmploymentLinkByEmployee
You can execute the `GetEmploymentLinkByEmployee` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmploymentLinkByEmployee(vars: GetEmploymentLinkByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmploymentLinkByEmployeeData, GetEmploymentLinkByEmployeeVariables>;

interface GetEmploymentLinkByEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmploymentLinkByEmployeeVariables): QueryRef<GetEmploymentLinkByEmployeeData, GetEmploymentLinkByEmployeeVariables>;
}
export const getEmploymentLinkByEmployeeRef: GetEmploymentLinkByEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmploymentLinkByEmployee(dc: DataConnect, vars: GetEmploymentLinkByEmployeeVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmploymentLinkByEmployeeData, GetEmploymentLinkByEmployeeVariables>;

interface GetEmploymentLinkByEmployeeRef {
  ...
  (dc: DataConnect, vars: GetEmploymentLinkByEmployeeVariables): QueryRef<GetEmploymentLinkByEmployeeData, GetEmploymentLinkByEmployeeVariables>;
}
export const getEmploymentLinkByEmployeeRef: GetEmploymentLinkByEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmploymentLinkByEmployeeRef:
```typescript
const name = getEmploymentLinkByEmployeeRef.operationName;
console.log(name);
```

### Variables
The `GetEmploymentLinkByEmployee` query requires an argument of type `GetEmploymentLinkByEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEmploymentLinkByEmployeeVariables {
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `GetEmploymentLinkByEmployee` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmploymentLinkByEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEmploymentLinkByEmployeeData {
  employmentLinks: ({
    id: UUIDString;
    personEmail: string;
    userId?: UUIDString | null;
    employeeId: UUIDString;
    companyId: UUIDString;
    jobTitle?: string | null;
    department?: string | null;
    startedAt?: DateString | null;
    leftAt?: DateString | null;
    isCurrent: boolean;
    source: string;
    createdAt: TimestampString;
  } & EmploymentLink_Key)[];
}
```
### Using `GetEmploymentLinkByEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmploymentLinkByEmployee, GetEmploymentLinkByEmployeeVariables } from '@dataconnect/admin-generated';

// The `GetEmploymentLinkByEmployee` query requires an argument of type `GetEmploymentLinkByEmployeeVariables`:
const getEmploymentLinkByEmployeeVars: GetEmploymentLinkByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `getEmploymentLinkByEmployee()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmploymentLinkByEmployee(getEmploymentLinkByEmployeeVars);
// Variables can be defined inline as well.
const { data } = await getEmploymentLinkByEmployee({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmploymentLinkByEmployee(dataConnect, getEmploymentLinkByEmployeeVars);

console.log(data.employmentLinks);

// Or, you can use the `Promise` API.
getEmploymentLinkByEmployee(getEmploymentLinkByEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.employmentLinks);
});
```

### Using `GetEmploymentLinkByEmployee`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmploymentLinkByEmployeeRef, GetEmploymentLinkByEmployeeVariables } from '@dataconnect/admin-generated';

// The `GetEmploymentLinkByEmployee` query requires an argument of type `GetEmploymentLinkByEmployeeVariables`:
const getEmploymentLinkByEmployeeVars: GetEmploymentLinkByEmployeeVariables = {
  employeeId: ..., 
};

// Call the `getEmploymentLinkByEmployeeRef()` function to get a reference to the query.
const ref = getEmploymentLinkByEmployeeRef(getEmploymentLinkByEmployeeVars);
// Variables can be defined inline as well.
const ref = getEmploymentLinkByEmployeeRef({ employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmploymentLinkByEmployeeRef(dataConnect, getEmploymentLinkByEmployeeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employmentLinks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employmentLinks);
});
```

## GetCurrentEmploymentLink
You can execute the `GetCurrentEmploymentLink` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentEmploymentLink(vars: GetCurrentEmploymentLinkVariables, options?: ExecuteQueryOptions): QueryPromise<GetCurrentEmploymentLinkData, GetCurrentEmploymentLinkVariables>;

interface GetCurrentEmploymentLinkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCurrentEmploymentLinkVariables): QueryRef<GetCurrentEmploymentLinkData, GetCurrentEmploymentLinkVariables>;
}
export const getCurrentEmploymentLinkRef: GetCurrentEmploymentLinkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentEmploymentLink(dc: DataConnect, vars: GetCurrentEmploymentLinkVariables, options?: ExecuteQueryOptions): QueryPromise<GetCurrentEmploymentLinkData, GetCurrentEmploymentLinkVariables>;

interface GetCurrentEmploymentLinkRef {
  ...
  (dc: DataConnect, vars: GetCurrentEmploymentLinkVariables): QueryRef<GetCurrentEmploymentLinkData, GetCurrentEmploymentLinkVariables>;
}
export const getCurrentEmploymentLinkRef: GetCurrentEmploymentLinkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentEmploymentLinkRef:
```typescript
const name = getCurrentEmploymentLinkRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentEmploymentLink` query requires an argument of type `GetCurrentEmploymentLinkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCurrentEmploymentLinkVariables {
  personEmail: string;
}
```
### Return Type
Recall that executing the `GetCurrentEmploymentLink` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentEmploymentLinkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentEmploymentLinkData {
  employmentLinks: ({
    id: UUIDString;
    personEmail: string;
    userId?: UUIDString | null;
    employeeId: UUIDString;
    companyId: UUIDString;
    jobTitle?: string | null;
    department?: string | null;
    startedAt?: DateString | null;
    leftAt?: DateString | null;
    isCurrent: boolean;
    source: string;
    createdAt: TimestampString;
  } & EmploymentLink_Key)[];
}
```
### Using `GetCurrentEmploymentLink`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentEmploymentLink, GetCurrentEmploymentLinkVariables } from '@dataconnect/admin-generated';

// The `GetCurrentEmploymentLink` query requires an argument of type `GetCurrentEmploymentLinkVariables`:
const getCurrentEmploymentLinkVars: GetCurrentEmploymentLinkVariables = {
  personEmail: ..., 
};

// Call the `getCurrentEmploymentLink()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentEmploymentLink(getCurrentEmploymentLinkVars);
// Variables can be defined inline as well.
const { data } = await getCurrentEmploymentLink({ personEmail: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentEmploymentLink(dataConnect, getCurrentEmploymentLinkVars);

console.log(data.employmentLinks);

// Or, you can use the `Promise` API.
getCurrentEmploymentLink(getCurrentEmploymentLinkVars).then((response) => {
  const data = response.data;
  console.log(data.employmentLinks);
});
```

### Using `GetCurrentEmploymentLink`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentEmploymentLinkRef, GetCurrentEmploymentLinkVariables } from '@dataconnect/admin-generated';

// The `GetCurrentEmploymentLink` query requires an argument of type `GetCurrentEmploymentLinkVariables`:
const getCurrentEmploymentLinkVars: GetCurrentEmploymentLinkVariables = {
  personEmail: ..., 
};

// Call the `getCurrentEmploymentLinkRef()` function to get a reference to the query.
const ref = getCurrentEmploymentLinkRef(getCurrentEmploymentLinkVars);
// Variables can be defined inline as well.
const ref = getCurrentEmploymentLinkRef({ personEmail: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentEmploymentLinkRef(dataConnect, getCurrentEmploymentLinkVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employmentLinks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employmentLinks);
});
```

## ListNotificationsByUser
You can execute the `ListNotificationsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listNotificationsByUser(vars: ListNotificationsByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListNotificationsByUserData, ListNotificationsByUserVariables>;

interface ListNotificationsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListNotificationsByUserVariables): QueryRef<ListNotificationsByUserData, ListNotificationsByUserVariables>;
}
export const listNotificationsByUserRef: ListNotificationsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listNotificationsByUser(dc: DataConnect, vars: ListNotificationsByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListNotificationsByUserData, ListNotificationsByUserVariables>;

interface ListNotificationsByUserRef {
  ...
  (dc: DataConnect, vars: ListNotificationsByUserVariables): QueryRef<ListNotificationsByUserData, ListNotificationsByUserVariables>;
}
export const listNotificationsByUserRef: ListNotificationsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listNotificationsByUserRef:
```typescript
const name = listNotificationsByUserRef.operationName;
console.log(name);
```

### Variables
The `ListNotificationsByUser` query requires an argument of type `ListNotificationsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListNotificationsByUserVariables {
  userId: UUIDString;
  limit: number;
}
```
### Return Type
Recall that executing the `ListNotificationsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListNotificationsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListNotificationsByUserData {
  notifications: ({
    id: UUIDString;
    userId: UUIDString;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    link?: string | null;
    metadata?: string | null;
    readAt?: TimestampString | null;
    createdAt: TimestampString;
  } & Notification_Key)[];
}
```
### Using `ListNotificationsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listNotificationsByUser, ListNotificationsByUserVariables } from '@dataconnect/admin-generated';

// The `ListNotificationsByUser` query requires an argument of type `ListNotificationsByUserVariables`:
const listNotificationsByUserVars: ListNotificationsByUserVariables = {
  userId: ..., 
  limit: ..., 
};

// Call the `listNotificationsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listNotificationsByUser(listNotificationsByUserVars);
// Variables can be defined inline as well.
const { data } = await listNotificationsByUser({ userId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listNotificationsByUser(dataConnect, listNotificationsByUserVars);

console.log(data.notifications);

// Or, you can use the `Promise` API.
listNotificationsByUser(listNotificationsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

### Using `ListNotificationsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listNotificationsByUserRef, ListNotificationsByUserVariables } from '@dataconnect/admin-generated';

// The `ListNotificationsByUser` query requires an argument of type `ListNotificationsByUserVariables`:
const listNotificationsByUserVars: ListNotificationsByUserVariables = {
  userId: ..., 
  limit: ..., 
};

// Call the `listNotificationsByUserRef()` function to get a reference to the query.
const ref = listNotificationsByUserRef(listNotificationsByUserVars);
// Variables can be defined inline as well.
const ref = listNotificationsByUserRef({ userId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listNotificationsByUserRef(dataConnect, listNotificationsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notifications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

## ListUnreadNotificationsByUser
You can execute the `ListUnreadNotificationsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUnreadNotificationsByUser(vars: ListUnreadNotificationsByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListUnreadNotificationsByUserData, ListUnreadNotificationsByUserVariables>;

interface ListUnreadNotificationsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUnreadNotificationsByUserVariables): QueryRef<ListUnreadNotificationsByUserData, ListUnreadNotificationsByUserVariables>;
}
export const listUnreadNotificationsByUserRef: ListUnreadNotificationsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUnreadNotificationsByUser(dc: DataConnect, vars: ListUnreadNotificationsByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListUnreadNotificationsByUserData, ListUnreadNotificationsByUserVariables>;

interface ListUnreadNotificationsByUserRef {
  ...
  (dc: DataConnect, vars: ListUnreadNotificationsByUserVariables): QueryRef<ListUnreadNotificationsByUserData, ListUnreadNotificationsByUserVariables>;
}
export const listUnreadNotificationsByUserRef: ListUnreadNotificationsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUnreadNotificationsByUserRef:
```typescript
const name = listUnreadNotificationsByUserRef.operationName;
console.log(name);
```

### Variables
The `ListUnreadNotificationsByUser` query requires an argument of type `ListUnreadNotificationsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUnreadNotificationsByUserVariables {
  userId: UUIDString;
  limit: number;
}
```
### Return Type
Recall that executing the `ListUnreadNotificationsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUnreadNotificationsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUnreadNotificationsByUserData {
  notifications: ({
    id: UUIDString;
    userId: UUIDString;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    link?: string | null;
    metadata?: string | null;
    readAt?: TimestampString | null;
    createdAt: TimestampString;
  } & Notification_Key)[];
}
```
### Using `ListUnreadNotificationsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUnreadNotificationsByUser, ListUnreadNotificationsByUserVariables } from '@dataconnect/admin-generated';

// The `ListUnreadNotificationsByUser` query requires an argument of type `ListUnreadNotificationsByUserVariables`:
const listUnreadNotificationsByUserVars: ListUnreadNotificationsByUserVariables = {
  userId: ..., 
  limit: ..., 
};

// Call the `listUnreadNotificationsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUnreadNotificationsByUser(listUnreadNotificationsByUserVars);
// Variables can be defined inline as well.
const { data } = await listUnreadNotificationsByUser({ userId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUnreadNotificationsByUser(dataConnect, listUnreadNotificationsByUserVars);

console.log(data.notifications);

// Or, you can use the `Promise` API.
listUnreadNotificationsByUser(listUnreadNotificationsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

### Using `ListUnreadNotificationsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUnreadNotificationsByUserRef, ListUnreadNotificationsByUserVariables } from '@dataconnect/admin-generated';

// The `ListUnreadNotificationsByUser` query requires an argument of type `ListUnreadNotificationsByUserVariables`:
const listUnreadNotificationsByUserVars: ListUnreadNotificationsByUserVariables = {
  userId: ..., 
  limit: ..., 
};

// Call the `listUnreadNotificationsByUserRef()` function to get a reference to the query.
const ref = listUnreadNotificationsByUserRef(listUnreadNotificationsByUserVars);
// Variables can be defined inline as well.
const ref = listUnreadNotificationsByUserRef({ userId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUnreadNotificationsByUserRef(dataConnect, listUnreadNotificationsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notifications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

## GetNotificationById
You can execute the `GetNotificationById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getNotificationById(vars: GetNotificationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationByIdData, GetNotificationByIdVariables>;

interface GetNotificationByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNotificationByIdVariables): QueryRef<GetNotificationByIdData, GetNotificationByIdVariables>;
}
export const getNotificationByIdRef: GetNotificationByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getNotificationById(dc: DataConnect, vars: GetNotificationByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationByIdData, GetNotificationByIdVariables>;

interface GetNotificationByIdRef {
  ...
  (dc: DataConnect, vars: GetNotificationByIdVariables): QueryRef<GetNotificationByIdData, GetNotificationByIdVariables>;
}
export const getNotificationByIdRef: GetNotificationByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getNotificationByIdRef:
```typescript
const name = getNotificationByIdRef.operationName;
console.log(name);
```

### Variables
The `GetNotificationById` query requires an argument of type `GetNotificationByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetNotificationByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetNotificationById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetNotificationByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetNotificationByIdData {
  notification?: {
    id: UUIDString;
    userId: UUIDString;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    link?: string | null;
    metadata?: string | null;
    readAt?: TimestampString | null;
    createdAt: TimestampString;
  } & Notification_Key;
}
```
### Using `GetNotificationById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getNotificationById, GetNotificationByIdVariables } from '@dataconnect/admin-generated';

// The `GetNotificationById` query requires an argument of type `GetNotificationByIdVariables`:
const getNotificationByIdVars: GetNotificationByIdVariables = {
  id: ..., 
};

// Call the `getNotificationById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getNotificationById(getNotificationByIdVars);
// Variables can be defined inline as well.
const { data } = await getNotificationById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getNotificationById(dataConnect, getNotificationByIdVars);

console.log(data.notification);

// Or, you can use the `Promise` API.
getNotificationById(getNotificationByIdVars).then((response) => {
  const data = response.data;
  console.log(data.notification);
});
```

### Using `GetNotificationById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getNotificationByIdRef, GetNotificationByIdVariables } from '@dataconnect/admin-generated';

// The `GetNotificationById` query requires an argument of type `GetNotificationByIdVariables`:
const getNotificationByIdVars: GetNotificationByIdVariables = {
  id: ..., 
};

// Call the `getNotificationByIdRef()` function to get a reference to the query.
const ref = getNotificationByIdRef(getNotificationByIdVars);
// Variables can be defined inline as well.
const ref = getNotificationByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getNotificationByIdRef(dataConnect, getNotificationByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notification);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notification);
});
```

## CountUnreadNotifications
You can execute the `CountUnreadNotifications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
countUnreadNotifications(vars: CountUnreadNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<CountUnreadNotificationsData, CountUnreadNotificationsVariables>;

interface CountUnreadNotificationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CountUnreadNotificationsVariables): QueryRef<CountUnreadNotificationsData, CountUnreadNotificationsVariables>;
}
export const countUnreadNotificationsRef: CountUnreadNotificationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
countUnreadNotifications(dc: DataConnect, vars: CountUnreadNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<CountUnreadNotificationsData, CountUnreadNotificationsVariables>;

interface CountUnreadNotificationsRef {
  ...
  (dc: DataConnect, vars: CountUnreadNotificationsVariables): QueryRef<CountUnreadNotificationsData, CountUnreadNotificationsVariables>;
}
export const countUnreadNotificationsRef: CountUnreadNotificationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the countUnreadNotificationsRef:
```typescript
const name = countUnreadNotificationsRef.operationName;
console.log(name);
```

### Variables
The `CountUnreadNotifications` query requires an argument of type `CountUnreadNotificationsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CountUnreadNotificationsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `CountUnreadNotifications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CountUnreadNotificationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CountUnreadNotificationsData {
  notifications: ({
    id: UUIDString;
  } & Notification_Key)[];
}
```
### Using `CountUnreadNotifications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, countUnreadNotifications, CountUnreadNotificationsVariables } from '@dataconnect/admin-generated';

// The `CountUnreadNotifications` query requires an argument of type `CountUnreadNotificationsVariables`:
const countUnreadNotificationsVars: CountUnreadNotificationsVariables = {
  userId: ..., 
};

// Call the `countUnreadNotifications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await countUnreadNotifications(countUnreadNotificationsVars);
// Variables can be defined inline as well.
const { data } = await countUnreadNotifications({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await countUnreadNotifications(dataConnect, countUnreadNotificationsVars);

console.log(data.notifications);

// Or, you can use the `Promise` API.
countUnreadNotifications(countUnreadNotificationsVars).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

### Using `CountUnreadNotifications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, countUnreadNotificationsRef, CountUnreadNotificationsVariables } from '@dataconnect/admin-generated';

// The `CountUnreadNotifications` query requires an argument of type `CountUnreadNotificationsVariables`:
const countUnreadNotificationsVars: CountUnreadNotificationsVariables = {
  userId: ..., 
};

// Call the `countUnreadNotificationsRef()` function to get a reference to the query.
const ref = countUnreadNotificationsRef(countUnreadNotificationsVars);
// Variables can be defined inline as well.
const ref = countUnreadNotificationsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = countUnreadNotificationsRef(dataConnect, countUnreadNotificationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notifications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

## ListAuditLogs
You can execute the `ListAuditLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAuditLogs(vars?: ListAuditLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsData, ListAuditLogsVariables>;

interface ListAuditLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListAuditLogsVariables): QueryRef<ListAuditLogsData, ListAuditLogsVariables>;
}
export const listAuditLogsRef: ListAuditLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAuditLogs(dc: DataConnect, vars?: ListAuditLogsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAuditLogsData, ListAuditLogsVariables>;

interface ListAuditLogsRef {
  ...
  (dc: DataConnect, vars?: ListAuditLogsVariables): QueryRef<ListAuditLogsData, ListAuditLogsVariables>;
}
export const listAuditLogsRef: ListAuditLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAuditLogsRef:
```typescript
const name = listAuditLogsRef.operationName;
console.log(name);
```

### Variables
The `ListAuditLogs` query has an optional argument of type `ListAuditLogsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAuditLogsVariables {
  action?: string | null;
  role?: string | null;
  entityType?: string | null;
  userId?: UUIDString | null;
  dateFrom?: TimestampString | null;
  dateTo?: TimestampString | null;
  limit?: number | null;
  offset?: number | null;
}
```
### Return Type
Recall that executing the `ListAuditLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAuditLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAuditLogsData {
  auditLogs: ({
    id: UUIDString;
    userId: UUIDString;
    role: string;
    action: string;
    entityType?: string | null;
    entityId?: string | null;
    details?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: TimestampString;
    user: {
      id: UUIDString;
      fullName: string;
      email: string;
    } & User_Key;
  } & AuditLog_Key)[];
}
```
### Using `ListAuditLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAuditLogs, ListAuditLogsVariables } from '@dataconnect/admin-generated';

// The `ListAuditLogs` query has an optional argument of type `ListAuditLogsVariables`:
const listAuditLogsVars: ListAuditLogsVariables = {
  action: ..., // optional
  role: ..., // optional
  entityType: ..., // optional
  userId: ..., // optional
  dateFrom: ..., // optional
  dateTo: ..., // optional
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listAuditLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAuditLogs(listAuditLogsVars);
// Variables can be defined inline as well.
const { data } = await listAuditLogs({ action: ..., role: ..., entityType: ..., userId: ..., dateFrom: ..., dateTo: ..., limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `ListAuditLogsVariables` argument.
const { data } = await listAuditLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAuditLogs(dataConnect, listAuditLogsVars);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
listAuditLogs(listAuditLogsVars).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

### Using `ListAuditLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAuditLogsRef, ListAuditLogsVariables } from '@dataconnect/admin-generated';

// The `ListAuditLogs` query has an optional argument of type `ListAuditLogsVariables`:
const listAuditLogsVars: ListAuditLogsVariables = {
  action: ..., // optional
  role: ..., // optional
  entityType: ..., // optional
  userId: ..., // optional
  dateFrom: ..., // optional
  dateTo: ..., // optional
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `listAuditLogsRef()` function to get a reference to the query.
const ref = listAuditLogsRef(listAuditLogsVars);
// Variables can be defined inline as well.
const ref = listAuditLogsRef({ action: ..., role: ..., entityType: ..., userId: ..., dateFrom: ..., dateTo: ..., limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `ListAuditLogsVariables` argument.
const ref = listAuditLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAuditLogsRef(dataConnect, listAuditLogsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

## CountAuditLogs
You can execute the `CountAuditLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
countAuditLogs(vars?: CountAuditLogsVariables, options?: ExecuteQueryOptions): QueryPromise<CountAuditLogsData, CountAuditLogsVariables>;

interface CountAuditLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: CountAuditLogsVariables): QueryRef<CountAuditLogsData, CountAuditLogsVariables>;
}
export const countAuditLogsRef: CountAuditLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
countAuditLogs(dc: DataConnect, vars?: CountAuditLogsVariables, options?: ExecuteQueryOptions): QueryPromise<CountAuditLogsData, CountAuditLogsVariables>;

interface CountAuditLogsRef {
  ...
  (dc: DataConnect, vars?: CountAuditLogsVariables): QueryRef<CountAuditLogsData, CountAuditLogsVariables>;
}
export const countAuditLogsRef: CountAuditLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the countAuditLogsRef:
```typescript
const name = countAuditLogsRef.operationName;
console.log(name);
```

### Variables
The `CountAuditLogs` query has an optional argument of type `CountAuditLogsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CountAuditLogsVariables {
  action?: string | null;
  role?: string | null;
  entityType?: string | null;
  userId?: UUIDString | null;
  dateFrom?: TimestampString | null;
  dateTo?: TimestampString | null;
}
```
### Return Type
Recall that executing the `CountAuditLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CountAuditLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CountAuditLogsData {
  auditLogs: ({
    id: UUIDString;
  } & AuditLog_Key)[];
}
```
### Using `CountAuditLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, countAuditLogs, CountAuditLogsVariables } from '@dataconnect/admin-generated';

// The `CountAuditLogs` query has an optional argument of type `CountAuditLogsVariables`:
const countAuditLogsVars: CountAuditLogsVariables = {
  action: ..., // optional
  role: ..., // optional
  entityType: ..., // optional
  userId: ..., // optional
  dateFrom: ..., // optional
  dateTo: ..., // optional
};

// Call the `countAuditLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await countAuditLogs(countAuditLogsVars);
// Variables can be defined inline as well.
const { data } = await countAuditLogs({ action: ..., role: ..., entityType: ..., userId: ..., dateFrom: ..., dateTo: ..., });
// Since all variables are optional for this query, you can omit the `CountAuditLogsVariables` argument.
const { data } = await countAuditLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await countAuditLogs(dataConnect, countAuditLogsVars);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
countAuditLogs(countAuditLogsVars).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

### Using `CountAuditLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, countAuditLogsRef, CountAuditLogsVariables } from '@dataconnect/admin-generated';

// The `CountAuditLogs` query has an optional argument of type `CountAuditLogsVariables`:
const countAuditLogsVars: CountAuditLogsVariables = {
  action: ..., // optional
  role: ..., // optional
  entityType: ..., // optional
  userId: ..., // optional
  dateFrom: ..., // optional
  dateTo: ..., // optional
};

// Call the `countAuditLogsRef()` function to get a reference to the query.
const ref = countAuditLogsRef(countAuditLogsVars);
// Variables can be defined inline as well.
const ref = countAuditLogsRef({ action: ..., role: ..., entityType: ..., userId: ..., dateFrom: ..., dateTo: ..., });
// Since all variables are optional for this query, you can omit the `CountAuditLogsVariables` argument.
const ref = countAuditLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = countAuditLogsRef(dataConnect, countAuditLogsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

## ListInternalProjectsByCompany
You can execute the `ListInternalProjectsByCompany` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listInternalProjectsByCompany(vars: ListInternalProjectsByCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<ListInternalProjectsByCompanyData, ListInternalProjectsByCompanyVariables>;

interface ListInternalProjectsByCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInternalProjectsByCompanyVariables): QueryRef<ListInternalProjectsByCompanyData, ListInternalProjectsByCompanyVariables>;
}
export const listInternalProjectsByCompanyRef: ListInternalProjectsByCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInternalProjectsByCompany(dc: DataConnect, vars: ListInternalProjectsByCompanyVariables, options?: ExecuteQueryOptions): QueryPromise<ListInternalProjectsByCompanyData, ListInternalProjectsByCompanyVariables>;

interface ListInternalProjectsByCompanyRef {
  ...
  (dc: DataConnect, vars: ListInternalProjectsByCompanyVariables): QueryRef<ListInternalProjectsByCompanyData, ListInternalProjectsByCompanyVariables>;
}
export const listInternalProjectsByCompanyRef: ListInternalProjectsByCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInternalProjectsByCompanyRef:
```typescript
const name = listInternalProjectsByCompanyRef.operationName;
console.log(name);
```

### Variables
The `ListInternalProjectsByCompany` query requires an argument of type `ListInternalProjectsByCompanyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListInternalProjectsByCompanyVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `ListInternalProjectsByCompany` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInternalProjectsByCompanyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInternalProjectsByCompanyData {
  internalProjects: ({
    id: UUIDString;
    companyId: UUIDString;
    name: string;
    description?: string | null;
    department?: string | null;
    clientName?: string | null;
    startDate?: DateString | null;
    endDate?: DateString | null;
    priority: string;
    status: string;
    projectLead?: string | null;
    requiredRoles?: string | null;
    openPositions: number;
    filledPositions: number;
    tasksCompleted: number;
    tasksRemaining: number;
    progress: number;
    assignedRecruiters?: string | null;
    assignedEmployees?: string | null;
    documents?: string | null;
    createdById?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    deletedAt?: TimestampString | null;
  } & InternalProject_Key)[];
}
```
### Using `ListInternalProjectsByCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInternalProjectsByCompany, ListInternalProjectsByCompanyVariables } from '@dataconnect/admin-generated';

// The `ListInternalProjectsByCompany` query requires an argument of type `ListInternalProjectsByCompanyVariables`:
const listInternalProjectsByCompanyVars: ListInternalProjectsByCompanyVariables = {
  companyId: ..., 
};

// Call the `listInternalProjectsByCompany()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInternalProjectsByCompany(listInternalProjectsByCompanyVars);
// Variables can be defined inline as well.
const { data } = await listInternalProjectsByCompany({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInternalProjectsByCompany(dataConnect, listInternalProjectsByCompanyVars);

console.log(data.internalProjects);

// Or, you can use the `Promise` API.
listInternalProjectsByCompany(listInternalProjectsByCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.internalProjects);
});
```

### Using `ListInternalProjectsByCompany`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInternalProjectsByCompanyRef, ListInternalProjectsByCompanyVariables } from '@dataconnect/admin-generated';

// The `ListInternalProjectsByCompany` query requires an argument of type `ListInternalProjectsByCompanyVariables`:
const listInternalProjectsByCompanyVars: ListInternalProjectsByCompanyVariables = {
  companyId: ..., 
};

// Call the `listInternalProjectsByCompanyRef()` function to get a reference to the query.
const ref = listInternalProjectsByCompanyRef(listInternalProjectsByCompanyVars);
// Variables can be defined inline as well.
const ref = listInternalProjectsByCompanyRef({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInternalProjectsByCompanyRef(dataConnect, listInternalProjectsByCompanyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.internalProjects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.internalProjects);
});
```

## GetInternalProjectById
You can execute the `GetInternalProjectById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getInternalProjectById(vars: GetInternalProjectByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetInternalProjectByIdData, GetInternalProjectByIdVariables>;

interface GetInternalProjectByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInternalProjectByIdVariables): QueryRef<GetInternalProjectByIdData, GetInternalProjectByIdVariables>;
}
export const getInternalProjectByIdRef: GetInternalProjectByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInternalProjectById(dc: DataConnect, vars: GetInternalProjectByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetInternalProjectByIdData, GetInternalProjectByIdVariables>;

interface GetInternalProjectByIdRef {
  ...
  (dc: DataConnect, vars: GetInternalProjectByIdVariables): QueryRef<GetInternalProjectByIdData, GetInternalProjectByIdVariables>;
}
export const getInternalProjectByIdRef: GetInternalProjectByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInternalProjectByIdRef:
```typescript
const name = getInternalProjectByIdRef.operationName;
console.log(name);
```

### Variables
The `GetInternalProjectById` query requires an argument of type `GetInternalProjectByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInternalProjectByIdVariables {
  id: UUIDString;
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `GetInternalProjectById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInternalProjectByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetInternalProjectByIdData {
  internalProject?: {
    id: UUIDString;
    companyId: UUIDString;
    name: string;
    description?: string | null;
    department?: string | null;
    clientName?: string | null;
    startDate?: DateString | null;
    endDate?: DateString | null;
    priority: string;
    status: string;
    projectLead?: string | null;
    requiredRoles?: string | null;
    openPositions: number;
    filledPositions: number;
    tasksCompleted: number;
    tasksRemaining: number;
    progress: number;
    assignedRecruiters?: string | null;
    assignedEmployees?: string | null;
    documents?: string | null;
    createdById?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    deletedAt?: TimestampString | null;
  } & InternalProject_Key;
}
```
### Using `GetInternalProjectById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInternalProjectById, GetInternalProjectByIdVariables } from '@dataconnect/admin-generated';

// The `GetInternalProjectById` query requires an argument of type `GetInternalProjectByIdVariables`:
const getInternalProjectByIdVars: GetInternalProjectByIdVariables = {
  id: ..., 
  companyId: ..., 
};

// Call the `getInternalProjectById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInternalProjectById(getInternalProjectByIdVars);
// Variables can be defined inline as well.
const { data } = await getInternalProjectById({ id: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInternalProjectById(dataConnect, getInternalProjectByIdVars);

console.log(data.internalProject);

// Or, you can use the `Promise` API.
getInternalProjectById(getInternalProjectByIdVars).then((response) => {
  const data = response.data;
  console.log(data.internalProject);
});
```

### Using `GetInternalProjectById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInternalProjectByIdRef, GetInternalProjectByIdVariables } from '@dataconnect/admin-generated';

// The `GetInternalProjectById` query requires an argument of type `GetInternalProjectByIdVariables`:
const getInternalProjectByIdVars: GetInternalProjectByIdVariables = {
  id: ..., 
  companyId: ..., 
};

// Call the `getInternalProjectByIdRef()` function to get a reference to the query.
const ref = getInternalProjectByIdRef(getInternalProjectByIdVars);
// Variables can be defined inline as well.
const ref = getInternalProjectByIdRef({ id: ..., companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInternalProjectByIdRef(dataConnect, getInternalProjectByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.internalProject);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.internalProject);
});
```

## GetInvitationByToken
You can execute the `GetInvitationByToken` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getInvitationByToken(vars: GetInvitationByTokenVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationByTokenData, GetInvitationByTokenVariables>;

interface GetInvitationByTokenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInvitationByTokenVariables): QueryRef<GetInvitationByTokenData, GetInvitationByTokenVariables>;
}
export const getInvitationByTokenRef: GetInvitationByTokenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInvitationByToken(dc: DataConnect, vars: GetInvitationByTokenVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationByTokenData, GetInvitationByTokenVariables>;

interface GetInvitationByTokenRef {
  ...
  (dc: DataConnect, vars: GetInvitationByTokenVariables): QueryRef<GetInvitationByTokenData, GetInvitationByTokenVariables>;
}
export const getInvitationByTokenRef: GetInvitationByTokenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInvitationByTokenRef:
```typescript
const name = getInvitationByTokenRef.operationName;
console.log(name);
```

### Variables
The `GetInvitationByToken` query requires an argument of type `GetInvitationByTokenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInvitationByTokenVariables {
  tokenHash: string;
  now: TimestampString;
}
```
### Return Type
Recall that executing the `GetInvitationByToken` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInvitationByTokenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetInvitationByTokenData {
  employeeInvitations: ({
    id: UUIDString;
    companyId: UUIDString;
    email: string;
    tokenHash: string;
    firstName?: string | null;
    lastName?: string | null;
    jobTitle?: string | null;
    department?: string | null;
    status: string;
    invitedById: UUIDString;
    expiresAt: TimestampString;
    acceptedAt?: TimestampString | null;
    createdAt: TimestampString;
  } & EmployeeInvitation_Key)[];
}
```
### Using `GetInvitationByToken`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInvitationByToken, GetInvitationByTokenVariables } from '@dataconnect/admin-generated';

// The `GetInvitationByToken` query requires an argument of type `GetInvitationByTokenVariables`:
const getInvitationByTokenVars: GetInvitationByTokenVariables = {
  tokenHash: ..., 
  now: ..., 
};

// Call the `getInvitationByToken()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInvitationByToken(getInvitationByTokenVars);
// Variables can be defined inline as well.
const { data } = await getInvitationByToken({ tokenHash: ..., now: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInvitationByToken(dataConnect, getInvitationByTokenVars);

console.log(data.employeeInvitations);

// Or, you can use the `Promise` API.
getInvitationByToken(getInvitationByTokenVars).then((response) => {
  const data = response.data;
  console.log(data.employeeInvitations);
});
```

### Using `GetInvitationByToken`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInvitationByTokenRef, GetInvitationByTokenVariables } from '@dataconnect/admin-generated';

// The `GetInvitationByToken` query requires an argument of type `GetInvitationByTokenVariables`:
const getInvitationByTokenVars: GetInvitationByTokenVariables = {
  tokenHash: ..., 
  now: ..., 
};

// Call the `getInvitationByTokenRef()` function to get a reference to the query.
const ref = getInvitationByTokenRef(getInvitationByTokenVars);
// Variables can be defined inline as well.
const ref = getInvitationByTokenRef({ tokenHash: ..., now: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInvitationByTokenRef(dataConnect, getInvitationByTokenVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employeeInvitations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeInvitations);
});
```

## CheckPendingInvitation
You can execute the `CheckPendingInvitation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
checkPendingInvitation(vars: CheckPendingInvitationVariables, options?: ExecuteQueryOptions): QueryPromise<CheckPendingInvitationData, CheckPendingInvitationVariables>;

interface CheckPendingInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CheckPendingInvitationVariables): QueryRef<CheckPendingInvitationData, CheckPendingInvitationVariables>;
}
export const checkPendingInvitationRef: CheckPendingInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
checkPendingInvitation(dc: DataConnect, vars: CheckPendingInvitationVariables, options?: ExecuteQueryOptions): QueryPromise<CheckPendingInvitationData, CheckPendingInvitationVariables>;

interface CheckPendingInvitationRef {
  ...
  (dc: DataConnect, vars: CheckPendingInvitationVariables): QueryRef<CheckPendingInvitationData, CheckPendingInvitationVariables>;
}
export const checkPendingInvitationRef: CheckPendingInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the checkPendingInvitationRef:
```typescript
const name = checkPendingInvitationRef.operationName;
console.log(name);
```

### Variables
The `CheckPendingInvitation` query requires an argument of type `CheckPendingInvitationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CheckPendingInvitationVariables {
  companyId: UUIDString;
  email: string;
  now: TimestampString;
}
```
### Return Type
Recall that executing the `CheckPendingInvitation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CheckPendingInvitationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CheckPendingInvitationData {
  employeeInvitations: ({
    id: UUIDString;
  } & EmployeeInvitation_Key)[];
}
```
### Using `CheckPendingInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, checkPendingInvitation, CheckPendingInvitationVariables } from '@dataconnect/admin-generated';

// The `CheckPendingInvitation` query requires an argument of type `CheckPendingInvitationVariables`:
const checkPendingInvitationVars: CheckPendingInvitationVariables = {
  companyId: ..., 
  email: ..., 
  now: ..., 
};

// Call the `checkPendingInvitation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await checkPendingInvitation(checkPendingInvitationVars);
// Variables can be defined inline as well.
const { data } = await checkPendingInvitation({ companyId: ..., email: ..., now: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await checkPendingInvitation(dataConnect, checkPendingInvitationVars);

console.log(data.employeeInvitations);

// Or, you can use the `Promise` API.
checkPendingInvitation(checkPendingInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.employeeInvitations);
});
```

### Using `CheckPendingInvitation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, checkPendingInvitationRef, CheckPendingInvitationVariables } from '@dataconnect/admin-generated';

// The `CheckPendingInvitation` query requires an argument of type `CheckPendingInvitationVariables`:
const checkPendingInvitationVars: CheckPendingInvitationVariables = {
  companyId: ..., 
  email: ..., 
  now: ..., 
};

// Call the `checkPendingInvitationRef()` function to get a reference to the query.
const ref = checkPendingInvitationRef(checkPendingInvitationVars);
// Variables can be defined inline as well.
const ref = checkPendingInvitationRef({ companyId: ..., email: ..., now: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = checkPendingInvitationRef(dataConnect, checkPendingInvitationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employeeInvitations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeInvitations);
});
```

## GetSavedCandidate
You can execute the `GetSavedCandidate` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSavedCandidate(vars: GetSavedCandidateVariables, options?: ExecuteQueryOptions): QueryPromise<GetSavedCandidateData, GetSavedCandidateVariables>;

interface GetSavedCandidateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSavedCandidateVariables): QueryRef<GetSavedCandidateData, GetSavedCandidateVariables>;
}
export const getSavedCandidateRef: GetSavedCandidateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSavedCandidate(dc: DataConnect, vars: GetSavedCandidateVariables, options?: ExecuteQueryOptions): QueryPromise<GetSavedCandidateData, GetSavedCandidateVariables>;

interface GetSavedCandidateRef {
  ...
  (dc: DataConnect, vars: GetSavedCandidateVariables): QueryRef<GetSavedCandidateData, GetSavedCandidateVariables>;
}
export const getSavedCandidateRef: GetSavedCandidateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSavedCandidateRef:
```typescript
const name = getSavedCandidateRef.operationName;
console.log(name);
```

### Variables
The `GetSavedCandidate` query requires an argument of type `GetSavedCandidateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSavedCandidateVariables {
  recruiterId: UUIDString;
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `GetSavedCandidate` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSavedCandidateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSavedCandidateData {
  savedCandidates: ({
    _id: {
    };
    recruiterId: UUIDString;
    employeeId: UUIDString;
    notes?: string | null;
    savedAt: TimestampString;
    createdAt: TimestampString;
  } & SavedCandidate_Key)[];
}
```
### Using `GetSavedCandidate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSavedCandidate, GetSavedCandidateVariables } from '@dataconnect/admin-generated';

// The `GetSavedCandidate` query requires an argument of type `GetSavedCandidateVariables`:
const getSavedCandidateVars: GetSavedCandidateVariables = {
  recruiterId: ..., 
  employeeId: ..., 
};

// Call the `getSavedCandidate()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSavedCandidate(getSavedCandidateVars);
// Variables can be defined inline as well.
const { data } = await getSavedCandidate({ recruiterId: ..., employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSavedCandidate(dataConnect, getSavedCandidateVars);

console.log(data.savedCandidates);

// Or, you can use the `Promise` API.
getSavedCandidate(getSavedCandidateVars).then((response) => {
  const data = response.data;
  console.log(data.savedCandidates);
});
```

### Using `GetSavedCandidate`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSavedCandidateRef, GetSavedCandidateVariables } from '@dataconnect/admin-generated';

// The `GetSavedCandidate` query requires an argument of type `GetSavedCandidateVariables`:
const getSavedCandidateVars: GetSavedCandidateVariables = {
  recruiterId: ..., 
  employeeId: ..., 
};

// Call the `getSavedCandidateRef()` function to get a reference to the query.
const ref = getSavedCandidateRef(getSavedCandidateVars);
// Variables can be defined inline as well.
const ref = getSavedCandidateRef({ recruiterId: ..., employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSavedCandidateRef(dataConnect, getSavedCandidateVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.savedCandidates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.savedCandidates);
});
```

## ListSavedCandidatesByRecruiter
You can execute the `ListSavedCandidatesByRecruiter` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSavedCandidatesByRecruiter(vars: ListSavedCandidatesByRecruiterVariables, options?: ExecuteQueryOptions): QueryPromise<ListSavedCandidatesByRecruiterData, ListSavedCandidatesByRecruiterVariables>;

interface ListSavedCandidatesByRecruiterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSavedCandidatesByRecruiterVariables): QueryRef<ListSavedCandidatesByRecruiterData, ListSavedCandidatesByRecruiterVariables>;
}
export const listSavedCandidatesByRecruiterRef: ListSavedCandidatesByRecruiterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSavedCandidatesByRecruiter(dc: DataConnect, vars: ListSavedCandidatesByRecruiterVariables, options?: ExecuteQueryOptions): QueryPromise<ListSavedCandidatesByRecruiterData, ListSavedCandidatesByRecruiterVariables>;

interface ListSavedCandidatesByRecruiterRef {
  ...
  (dc: DataConnect, vars: ListSavedCandidatesByRecruiterVariables): QueryRef<ListSavedCandidatesByRecruiterData, ListSavedCandidatesByRecruiterVariables>;
}
export const listSavedCandidatesByRecruiterRef: ListSavedCandidatesByRecruiterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSavedCandidatesByRecruiterRef:
```typescript
const name = listSavedCandidatesByRecruiterRef.operationName;
console.log(name);
```

### Variables
The `ListSavedCandidatesByRecruiter` query requires an argument of type `ListSavedCandidatesByRecruiterVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListSavedCandidatesByRecruiterVariables {
  recruiterId: UUIDString;
}
```
### Return Type
Recall that executing the `ListSavedCandidatesByRecruiter` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSavedCandidatesByRecruiterData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSavedCandidatesByRecruiterData {
  savedCandidates: ({
    _id: {
    };
    recruiterId: UUIDString;
    employeeId: UUIDString;
    notes?: string | null;
    savedAt: TimestampString;
    createdAt: TimestampString;
    employee: {
      id: UUIDString;
      firstName: string;
      lastName: string;
      jobTitle: string;
      location?: string | null;
      email: string;
    } & Employee_Key;
  } & SavedCandidate_Key)[];
}
```
### Using `ListSavedCandidatesByRecruiter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSavedCandidatesByRecruiter, ListSavedCandidatesByRecruiterVariables } from '@dataconnect/admin-generated';

// The `ListSavedCandidatesByRecruiter` query requires an argument of type `ListSavedCandidatesByRecruiterVariables`:
const listSavedCandidatesByRecruiterVars: ListSavedCandidatesByRecruiterVariables = {
  recruiterId: ..., 
};

// Call the `listSavedCandidatesByRecruiter()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSavedCandidatesByRecruiter(listSavedCandidatesByRecruiterVars);
// Variables can be defined inline as well.
const { data } = await listSavedCandidatesByRecruiter({ recruiterId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSavedCandidatesByRecruiter(dataConnect, listSavedCandidatesByRecruiterVars);

console.log(data.savedCandidates);

// Or, you can use the `Promise` API.
listSavedCandidatesByRecruiter(listSavedCandidatesByRecruiterVars).then((response) => {
  const data = response.data;
  console.log(data.savedCandidates);
});
```

### Using `ListSavedCandidatesByRecruiter`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSavedCandidatesByRecruiterRef, ListSavedCandidatesByRecruiterVariables } from '@dataconnect/admin-generated';

// The `ListSavedCandidatesByRecruiter` query requires an argument of type `ListSavedCandidatesByRecruiterVariables`:
const listSavedCandidatesByRecruiterVars: ListSavedCandidatesByRecruiterVariables = {
  recruiterId: ..., 
};

// Call the `listSavedCandidatesByRecruiterRef()` function to get a reference to the query.
const ref = listSavedCandidatesByRecruiterRef(listSavedCandidatesByRecruiterVars);
// Variables can be defined inline as well.
const ref = listSavedCandidatesByRecruiterRef({ recruiterId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSavedCandidatesByRecruiterRef(dataConnect, listSavedCandidatesByRecruiterVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.savedCandidates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.savedCandidates);
});
```

## CompanyEmployeeStats
You can execute the `CompanyEmployeeStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
companyEmployeeStats(vars: CompanyEmployeeStatsVariables, options?: ExecuteQueryOptions): QueryPromise<CompanyEmployeeStatsData, CompanyEmployeeStatsVariables>;

interface CompanyEmployeeStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompanyEmployeeStatsVariables): QueryRef<CompanyEmployeeStatsData, CompanyEmployeeStatsVariables>;
}
export const companyEmployeeStatsRef: CompanyEmployeeStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
companyEmployeeStats(dc: DataConnect, vars: CompanyEmployeeStatsVariables, options?: ExecuteQueryOptions): QueryPromise<CompanyEmployeeStatsData, CompanyEmployeeStatsVariables>;

interface CompanyEmployeeStatsRef {
  ...
  (dc: DataConnect, vars: CompanyEmployeeStatsVariables): QueryRef<CompanyEmployeeStatsData, CompanyEmployeeStatsVariables>;
}
export const companyEmployeeStatsRef: CompanyEmployeeStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the companyEmployeeStatsRef:
```typescript
const name = companyEmployeeStatsRef.operationName;
console.log(name);
```

### Variables
The `CompanyEmployeeStats` query requires an argument of type `CompanyEmployeeStatsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CompanyEmployeeStatsVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `CompanyEmployeeStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CompanyEmployeeStatsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CompanyEmployeeStatsData {
  employees: ({
    id: UUIDString;
    employmentStatus: string;
    isVerified: boolean;
    department: string;
  } & Employee_Key)[];
}
```
### Using `CompanyEmployeeStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, companyEmployeeStats, CompanyEmployeeStatsVariables } from '@dataconnect/admin-generated';

// The `CompanyEmployeeStats` query requires an argument of type `CompanyEmployeeStatsVariables`:
const companyEmployeeStatsVars: CompanyEmployeeStatsVariables = {
  companyId: ..., 
};

// Call the `companyEmployeeStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await companyEmployeeStats(companyEmployeeStatsVars);
// Variables can be defined inline as well.
const { data } = await companyEmployeeStats({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await companyEmployeeStats(dataConnect, companyEmployeeStatsVars);

console.log(data.employees);

// Or, you can use the `Promise` API.
companyEmployeeStats(companyEmployeeStatsVars).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

### Using `CompanyEmployeeStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, companyEmployeeStatsRef, CompanyEmployeeStatsVariables } from '@dataconnect/admin-generated';

// The `CompanyEmployeeStats` query requires an argument of type `CompanyEmployeeStatsVariables`:
const companyEmployeeStatsVars: CompanyEmployeeStatsVariables = {
  companyId: ..., 
};

// Call the `companyEmployeeStatsRef()` function to get a reference to the query.
const ref = companyEmployeeStatsRef(companyEmployeeStatsVars);
// Variables can be defined inline as well.
const ref = companyEmployeeStatsRef({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = companyEmployeeStatsRef(dataConnect, companyEmployeeStatsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employees);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employees);
});
```

## CompanySkillDistribution
You can execute the `CompanySkillDistribution` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
companySkillDistribution(vars: CompanySkillDistributionVariables, options?: ExecuteQueryOptions): QueryPromise<CompanySkillDistributionData, CompanySkillDistributionVariables>;

interface CompanySkillDistributionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompanySkillDistributionVariables): QueryRef<CompanySkillDistributionData, CompanySkillDistributionVariables>;
}
export const companySkillDistributionRef: CompanySkillDistributionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
companySkillDistribution(dc: DataConnect, vars: CompanySkillDistributionVariables, options?: ExecuteQueryOptions): QueryPromise<CompanySkillDistributionData, CompanySkillDistributionVariables>;

interface CompanySkillDistributionRef {
  ...
  (dc: DataConnect, vars: CompanySkillDistributionVariables): QueryRef<CompanySkillDistributionData, CompanySkillDistributionVariables>;
}
export const companySkillDistributionRef: CompanySkillDistributionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the companySkillDistributionRef:
```typescript
const name = companySkillDistributionRef.operationName;
console.log(name);
```

### Variables
The `CompanySkillDistribution` query requires an argument of type `CompanySkillDistributionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CompanySkillDistributionVariables {
  companyId: UUIDString;
}
```
### Return Type
Recall that executing the `CompanySkillDistribution` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CompanySkillDistributionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CompanySkillDistributionData {
  employeeSkills: ({
    id: UUIDString;
    skillId: UUIDString;
  })[];
}
```
### Using `CompanySkillDistribution`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, companySkillDistribution, CompanySkillDistributionVariables } from '@dataconnect/admin-generated';

// The `CompanySkillDistribution` query requires an argument of type `CompanySkillDistributionVariables`:
const companySkillDistributionVars: CompanySkillDistributionVariables = {
  companyId: ..., 
};

// Call the `companySkillDistribution()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await companySkillDistribution(companySkillDistributionVars);
// Variables can be defined inline as well.
const { data } = await companySkillDistribution({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await companySkillDistribution(dataConnect, companySkillDistributionVars);

console.log(data.employeeSkills);

// Or, you can use the `Promise` API.
companySkillDistribution(companySkillDistributionVars).then((response) => {
  const data = response.data;
  console.log(data.employeeSkills);
});
```

### Using `CompanySkillDistribution`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, companySkillDistributionRef, CompanySkillDistributionVariables } from '@dataconnect/admin-generated';

// The `CompanySkillDistribution` query requires an argument of type `CompanySkillDistributionVariables`:
const companySkillDistributionVars: CompanySkillDistributionVariables = {
  companyId: ..., 
};

// Call the `companySkillDistributionRef()` function to get a reference to the query.
const ref = companySkillDistributionRef(companySkillDistributionVars);
// Variables can be defined inline as well.
const ref = companySkillDistributionRef({ companyId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = companySkillDistributionRef(dataConnect, companySkillDistributionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employeeSkills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeSkills);
});
```

## AdminDashboardStats
You can execute the `AdminDashboardStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminDashboardStats(options?: ExecuteQueryOptions): QueryPromise<AdminDashboardStatsData, undefined>;

interface AdminDashboardStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminDashboardStatsData, undefined>;
}
export const adminDashboardStatsRef: AdminDashboardStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminDashboardStats(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AdminDashboardStatsData, undefined>;

interface AdminDashboardStatsRef {
  ...
  (dc: DataConnect): QueryRef<AdminDashboardStatsData, undefined>;
}
export const adminDashboardStatsRef: AdminDashboardStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDashboardStatsRef:
```typescript
const name = adminDashboardStatsRef.operationName;
console.log(name);
```

### Variables
The `AdminDashboardStats` query has no variables.
### Return Type
Recall that executing the `AdminDashboardStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDashboardStatsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDashboardStatsData {
  companies: ({
    id: UUIDString;
    status: string;
    industry?: string | null;
    createdAt: TimestampString;
  } & Company_Key)[];
  employees: ({
    id: UUIDString;
    employmentStatus: string;
  } & Employee_Key)[];
  users: ({
    id: UUIDString;
    role: string;
  } & User_Key)[];
  publicProfiles: ({
    id: UUIDString;
  } & PublicProfile_Key)[];
}
```
### Using `AdminDashboardStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDashboardStats } from '@dataconnect/admin-generated';


// Call the `adminDashboardStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDashboardStats();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDashboardStats(dataConnect);

console.log(data.companies);
console.log(data.employees);
console.log(data.users);
console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
adminDashboardStats().then((response) => {
  const data = response.data;
  console.log(data.companies);
  console.log(data.employees);
  console.log(data.users);
  console.log(data.publicProfiles);
});
```

### Using `AdminDashboardStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminDashboardStatsRef } from '@dataconnect/admin-generated';


// Call the `adminDashboardStatsRef()` function to get a reference to the query.
const ref = adminDashboardStatsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDashboardStatsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.companies);
console.log(data.employees);
console.log(data.users);
console.log(data.publicProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.companies);
  console.log(data.employees);
  console.log(data.users);
  console.log(data.publicProfiles);
});
```

## FindPlatformAdmins
You can execute the `FindPlatformAdmins` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
findPlatformAdmins(options?: ExecuteQueryOptions): QueryPromise<FindPlatformAdminsData, undefined>;

interface FindPlatformAdminsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<FindPlatformAdminsData, undefined>;
}
export const findPlatformAdminsRef: FindPlatformAdminsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
findPlatformAdmins(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<FindPlatformAdminsData, undefined>;

interface FindPlatformAdminsRef {
  ...
  (dc: DataConnect): QueryRef<FindPlatformAdminsData, undefined>;
}
export const findPlatformAdminsRef: FindPlatformAdminsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the findPlatformAdminsRef:
```typescript
const name = findPlatformAdminsRef.operationName;
console.log(name);
```

### Variables
The `FindPlatformAdmins` query has no variables.
### Return Type
Recall that executing the `FindPlatformAdmins` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FindPlatformAdminsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface FindPlatformAdminsData {
  users: ({
    id: UUIDString;
  } & User_Key)[];
}
```
### Using `FindPlatformAdmins`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, findPlatformAdmins } from '@dataconnect/admin-generated';


// Call the `findPlatformAdmins()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await findPlatformAdmins();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await findPlatformAdmins(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
findPlatformAdmins().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `FindPlatformAdmins`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, findPlatformAdminsRef } from '@dataconnect/admin-generated';


// Call the `findPlatformAdminsRef()` function to get a reference to the query.
const ref = findPlatformAdminsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = findPlatformAdminsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## AdminListCompanies
You can execute the `AdminListCompanies` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListCompanies(vars?: AdminListCompaniesVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListCompaniesData, AdminListCompaniesVariables>;

interface AdminListCompaniesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: AdminListCompaniesVariables): QueryRef<AdminListCompaniesData, AdminListCompaniesVariables>;
}
export const adminListCompaniesRef: AdminListCompaniesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListCompanies(dc: DataConnect, vars?: AdminListCompaniesVariables, options?: ExecuteQueryOptions): QueryPromise<AdminListCompaniesData, AdminListCompaniesVariables>;

interface AdminListCompaniesRef {
  ...
  (dc: DataConnect, vars?: AdminListCompaniesVariables): QueryRef<AdminListCompaniesData, AdminListCompaniesVariables>;
}
export const adminListCompaniesRef: AdminListCompaniesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListCompaniesRef:
```typescript
const name = adminListCompaniesRef.operationName;
console.log(name);
```

### Variables
The `AdminListCompanies` query has an optional argument of type `AdminListCompaniesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminListCompaniesVariables {
  status?: string | null;
}
```
### Return Type
Recall that executing the `AdminListCompanies` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListCompaniesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminListCompaniesData {
  companies: ({
    id: UUIDString;
    name: string;
    email: string;
    phone?: string | null;
    website?: string | null;
    industry?: string | null;
    size?: string | null;
    country?: string | null;
    city?: string | null;
    description?: string | null;
    status: string;
    isVerified: boolean;
    createdAt: TimestampString;
    admin?: {
      id: UUIDString;
      fullName: string;
      email: string;
    } & User_Key;
  } & Company_Key)[];
}
```
### Using `AdminListCompanies`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListCompanies, AdminListCompaniesVariables } from '@dataconnect/admin-generated';

// The `AdminListCompanies` query has an optional argument of type `AdminListCompaniesVariables`:
const adminListCompaniesVars: AdminListCompaniesVariables = {
  status: ..., // optional
};

// Call the `adminListCompanies()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListCompanies(adminListCompaniesVars);
// Variables can be defined inline as well.
const { data } = await adminListCompanies({ status: ..., });
// Since all variables are optional for this query, you can omit the `AdminListCompaniesVariables` argument.
const { data } = await adminListCompanies();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListCompanies(dataConnect, adminListCompaniesVars);

console.log(data.companies);

// Or, you can use the `Promise` API.
adminListCompanies(adminListCompaniesVars).then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

### Using `AdminListCompanies`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListCompaniesRef, AdminListCompaniesVariables } from '@dataconnect/admin-generated';

// The `AdminListCompanies` query has an optional argument of type `AdminListCompaniesVariables`:
const adminListCompaniesVars: AdminListCompaniesVariables = {
  status: ..., // optional
};

// Call the `adminListCompaniesRef()` function to get a reference to the query.
const ref = adminListCompaniesRef(adminListCompaniesVars);
// Variables can be defined inline as well.
const ref = adminListCompaniesRef({ status: ..., });
// Since all variables are optional for this query, you can omit the `AdminListCompaniesVariables` argument.
const ref = adminListCompaniesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListCompaniesRef(dataConnect, adminListCompaniesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.companies);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.companies);
});
```

## AllOpportunityStatuses
You can execute the `AllOpportunityStatuses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
allOpportunityStatuses(options?: ExecuteQueryOptions): QueryPromise<AllOpportunityStatusesData, undefined>;

interface AllOpportunityStatusesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AllOpportunityStatusesData, undefined>;
}
export const allOpportunityStatusesRef: AllOpportunityStatusesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
allOpportunityStatuses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AllOpportunityStatusesData, undefined>;

interface AllOpportunityStatusesRef {
  ...
  (dc: DataConnect): QueryRef<AllOpportunityStatusesData, undefined>;
}
export const allOpportunityStatusesRef: AllOpportunityStatusesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the allOpportunityStatusesRef:
```typescript
const name = allOpportunityStatusesRef.operationName;
console.log(name);
```

### Variables
The `AllOpportunityStatuses` query has no variables.
### Return Type
Recall that executing the `AllOpportunityStatuses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AllOpportunityStatusesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AllOpportunityStatusesData {
  jobOpportunities: ({
    id: UUIDString;
    status: string;
  } & JobOpportunity_Key)[];
}
```
### Using `AllOpportunityStatuses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, allOpportunityStatuses } from '@dataconnect/admin-generated';


// Call the `allOpportunityStatuses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await allOpportunityStatuses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await allOpportunityStatuses(dataConnect);

console.log(data.jobOpportunities);

// Or, you can use the `Promise` API.
allOpportunityStatuses().then((response) => {
  const data = response.data;
  console.log(data.jobOpportunities);
});
```

### Using `AllOpportunityStatuses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, allOpportunityStatusesRef } from '@dataconnect/admin-generated';


// Call the `allOpportunityStatusesRef()` function to get a reference to the query.
const ref = allOpportunityStatusesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = allOpportunityStatusesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobOpportunities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunities);
});
```

## TopSkills
You can execute the `TopSkills` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
topSkills(vars: TopSkillsVariables, options?: ExecuteQueryOptions): QueryPromise<TopSkillsData, TopSkillsVariables>;

interface TopSkillsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: TopSkillsVariables): QueryRef<TopSkillsData, TopSkillsVariables>;
}
export const topSkillsRef: TopSkillsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
topSkills(dc: DataConnect, vars: TopSkillsVariables, options?: ExecuteQueryOptions): QueryPromise<TopSkillsData, TopSkillsVariables>;

interface TopSkillsRef {
  ...
  (dc: DataConnect, vars: TopSkillsVariables): QueryRef<TopSkillsData, TopSkillsVariables>;
}
export const topSkillsRef: TopSkillsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the topSkillsRef:
```typescript
const name = topSkillsRef.operationName;
console.log(name);
```

### Variables
The `TopSkills` query requires an argument of type `TopSkillsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface TopSkillsVariables {
  limit: number;
}
```
### Return Type
Recall that executing the `TopSkills` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `TopSkillsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface TopSkillsData {
  employeeSkills: ({
    id: UUIDString;
    skillId: UUIDString;
  })[];
}
```
### Using `TopSkills`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, topSkills, TopSkillsVariables } from '@dataconnect/admin-generated';

// The `TopSkills` query requires an argument of type `TopSkillsVariables`:
const topSkillsVars: TopSkillsVariables = {
  limit: ..., 
};

// Call the `topSkills()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await topSkills(topSkillsVars);
// Variables can be defined inline as well.
const { data } = await topSkills({ limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await topSkills(dataConnect, topSkillsVars);

console.log(data.employeeSkills);

// Or, you can use the `Promise` API.
topSkills(topSkillsVars).then((response) => {
  const data = response.data;
  console.log(data.employeeSkills);
});
```

### Using `TopSkills`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, topSkillsRef, TopSkillsVariables } from '@dataconnect/admin-generated';

// The `TopSkills` query requires an argument of type `TopSkillsVariables`:
const topSkillsVars: TopSkillsVariables = {
  limit: ..., 
};

// Call the `topSkillsRef()` function to get a reference to the query.
const ref = topSkillsRef(topSkillsVars);
// Variables can be defined inline as well.
const ref = topSkillsRef({ limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = topSkillsRef(dataConnect, topSkillsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.employeeSkills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeSkills);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  email: string;
  passwordHash: string;
  fullName: string;
  phone?: string | null;
  role: string;
  companyId?: UUIDString | null;
  employeeRefId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/admin-generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  passwordHash: ..., 
  fullName: ..., 
  phone: ..., // optional
  role: ..., 
  companyId: ..., // optional
  employeeRefId: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ email: ..., passwordHash: ..., fullName: ..., phone: ..., role: ..., companyId: ..., employeeRefId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/admin-generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  passwordHash: ..., 
  fullName: ..., 
  phone: ..., // optional
  role: ..., 
  companyId: ..., // optional
  employeeRefId: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ email: ..., passwordHash: ..., fullName: ..., phone: ..., role: ..., companyId: ..., employeeRefId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUserLastLogin
You can execute the `UpdateUserLastLogin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserLastLogin(vars: UpdateUserLastLoginVariables): MutationPromise<UpdateUserLastLoginData, UpdateUserLastLoginVariables>;

interface UpdateUserLastLoginRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserLastLoginVariables): MutationRef<UpdateUserLastLoginData, UpdateUserLastLoginVariables>;
}
export const updateUserLastLoginRef: UpdateUserLastLoginRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserLastLogin(dc: DataConnect, vars: UpdateUserLastLoginVariables): MutationPromise<UpdateUserLastLoginData, UpdateUserLastLoginVariables>;

interface UpdateUserLastLoginRef {
  ...
  (dc: DataConnect, vars: UpdateUserLastLoginVariables): MutationRef<UpdateUserLastLoginData, UpdateUserLastLoginVariables>;
}
export const updateUserLastLoginRef: UpdateUserLastLoginRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserLastLoginRef:
```typescript
const name = updateUserLastLoginRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserLastLogin` mutation requires an argument of type `UpdateUserLastLoginVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserLastLoginVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateUserLastLogin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserLastLoginData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserLastLoginData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserLastLogin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserLastLogin, UpdateUserLastLoginVariables } from '@dataconnect/admin-generated';

// The `UpdateUserLastLogin` mutation requires an argument of type `UpdateUserLastLoginVariables`:
const updateUserLastLoginVars: UpdateUserLastLoginVariables = {
  id: ..., 
};

// Call the `updateUserLastLogin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserLastLogin(updateUserLastLoginVars);
// Variables can be defined inline as well.
const { data } = await updateUserLastLogin({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserLastLogin(dataConnect, updateUserLastLoginVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserLastLogin(updateUserLastLoginVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserLastLogin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserLastLoginRef, UpdateUserLastLoginVariables } from '@dataconnect/admin-generated';

// The `UpdateUserLastLogin` mutation requires an argument of type `UpdateUserLastLoginVariables`:
const updateUserLastLoginVars: UpdateUserLastLoginVariables = {
  id: ..., 
};

// Call the `updateUserLastLoginRef()` function to get a reference to the mutation.
const ref = updateUserLastLoginRef(updateUserLastLoginVars);
// Variables can be defined inline as well.
const ref = updateUserLastLoginRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserLastLoginRef(dataConnect, updateUserLastLoginVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## SetUserCompanyAndEmployee
You can execute the `SetUserCompanyAndEmployee` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setUserCompanyAndEmployee(vars: SetUserCompanyAndEmployeeVariables): MutationPromise<SetUserCompanyAndEmployeeData, SetUserCompanyAndEmployeeVariables>;

interface SetUserCompanyAndEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetUserCompanyAndEmployeeVariables): MutationRef<SetUserCompanyAndEmployeeData, SetUserCompanyAndEmployeeVariables>;
}
export const setUserCompanyAndEmployeeRef: SetUserCompanyAndEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setUserCompanyAndEmployee(dc: DataConnect, vars: SetUserCompanyAndEmployeeVariables): MutationPromise<SetUserCompanyAndEmployeeData, SetUserCompanyAndEmployeeVariables>;

interface SetUserCompanyAndEmployeeRef {
  ...
  (dc: DataConnect, vars: SetUserCompanyAndEmployeeVariables): MutationRef<SetUserCompanyAndEmployeeData, SetUserCompanyAndEmployeeVariables>;
}
export const setUserCompanyAndEmployeeRef: SetUserCompanyAndEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setUserCompanyAndEmployeeRef:
```typescript
const name = setUserCompanyAndEmployeeRef.operationName;
console.log(name);
```

### Variables
The `SetUserCompanyAndEmployee` mutation requires an argument of type `SetUserCompanyAndEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetUserCompanyAndEmployeeVariables {
  id: UUIDString;
  companyId?: UUIDString | null;
  employeeRefId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `SetUserCompanyAndEmployee` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetUserCompanyAndEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetUserCompanyAndEmployeeData {
  user_update?: User_Key | null;
}
```
### Using `SetUserCompanyAndEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setUserCompanyAndEmployee, SetUserCompanyAndEmployeeVariables } from '@dataconnect/admin-generated';

// The `SetUserCompanyAndEmployee` mutation requires an argument of type `SetUserCompanyAndEmployeeVariables`:
const setUserCompanyAndEmployeeVars: SetUserCompanyAndEmployeeVariables = {
  id: ..., 
  companyId: ..., // optional
  employeeRefId: ..., // optional
};

// Call the `setUserCompanyAndEmployee()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setUserCompanyAndEmployee(setUserCompanyAndEmployeeVars);
// Variables can be defined inline as well.
const { data } = await setUserCompanyAndEmployee({ id: ..., companyId: ..., employeeRefId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setUserCompanyAndEmployee(dataConnect, setUserCompanyAndEmployeeVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
setUserCompanyAndEmployee(setUserCompanyAndEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `SetUserCompanyAndEmployee`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setUserCompanyAndEmployeeRef, SetUserCompanyAndEmployeeVariables } from '@dataconnect/admin-generated';

// The `SetUserCompanyAndEmployee` mutation requires an argument of type `SetUserCompanyAndEmployeeVariables`:
const setUserCompanyAndEmployeeVars: SetUserCompanyAndEmployeeVariables = {
  id: ..., 
  companyId: ..., // optional
  employeeRefId: ..., // optional
};

// Call the `setUserCompanyAndEmployeeRef()` function to get a reference to the mutation.
const ref = setUserCompanyAndEmployeeRef(setUserCompanyAndEmployeeVars);
// Variables can be defined inline as well.
const ref = setUserCompanyAndEmployeeRef({ id: ..., companyId: ..., employeeRefId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setUserCompanyAndEmployeeRef(dataConnect, setUserCompanyAndEmployeeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## CreateCompany
You can execute the `CreateCompany` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCompany(vars: CreateCompanyVariables): MutationPromise<CreateCompanyData, CreateCompanyVariables>;

interface CreateCompanyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCompanyVariables): MutationRef<CreateCompanyData, CreateCompanyVariables>;
}
export const createCompanyRef: CreateCompanyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCompany(dc: DataConnect, vars: CreateCompanyVariables): MutationPromise<CreateCompanyData, CreateCompanyVariables>;

interface CreateCompanyRef {
  ...
  (dc: DataConnect, vars: CreateCompanyVariables): MutationRef<CreateCompanyData, CreateCompanyVariables>;
}
export const createCompanyRef: CreateCompanyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCompanyRef:
```typescript
const name = createCompanyRef.operationName;
console.log(name);
```

### Variables
The `CreateCompany` mutation requires an argument of type `CreateCompanyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCompanyVariables {
  name: string;
  email: string;
  phone?: string | null;
  website?: string | null;
  industry?: string | null;
  size?: string | null;
  country?: string | null;
  city?: string | null;
  description?: string | null;
  adminId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateCompany` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCompanyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCompanyData {
  company_insert: Company_Key;
}
```
### Using `CreateCompany`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCompany, CreateCompanyVariables } from '@dataconnect/admin-generated';

// The `CreateCompany` mutation requires an argument of type `CreateCompanyVariables`:
const createCompanyVars: CreateCompanyVariables = {
  name: ..., 
  email: ..., 
  phone: ..., // optional
  website: ..., // optional
  industry: ..., // optional
  size: ..., // optional
  country: ..., // optional
  city: ..., // optional
  description: ..., // optional
  adminId: ..., // optional
};

// Call the `createCompany()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCompany(createCompanyVars);
// Variables can be defined inline as well.
const { data } = await createCompany({ name: ..., email: ..., phone: ..., website: ..., industry: ..., size: ..., country: ..., city: ..., description: ..., adminId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCompany(dataConnect, createCompanyVars);

console.log(data.company_insert);

// Or, you can use the `Promise` API.
createCompany(createCompanyVars).then((response) => {
  const data = response.data;
  console.log(data.company_insert);
});
```

### Using `CreateCompany`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCompanyRef, CreateCompanyVariables } from '@dataconnect/admin-generated';

// The `CreateCompany` mutation requires an argument of type `CreateCompanyVariables`:
const createCompanyVars: CreateCompanyVariables = {
  name: ..., 
  email: ..., 
  phone: ..., // optional
  website: ..., // optional
  industry: ..., // optional
  size: ..., // optional
  country: ..., // optional
  city: ..., // optional
  description: ..., // optional
  adminId: ..., // optional
};

// Call the `createCompanyRef()` function to get a reference to the mutation.
const ref = createCompanyRef(createCompanyVars);
// Variables can be defined inline as well.
const ref = createCompanyRef({ name: ..., email: ..., phone: ..., website: ..., industry: ..., size: ..., country: ..., city: ..., description: ..., adminId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCompanyRef(dataConnect, createCompanyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_insert);
});
```

## SetCompanyAdmin
You can execute the `SetCompanyAdmin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setCompanyAdmin(vars: SetCompanyAdminVariables): MutationPromise<SetCompanyAdminData, SetCompanyAdminVariables>;

interface SetCompanyAdminRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetCompanyAdminVariables): MutationRef<SetCompanyAdminData, SetCompanyAdminVariables>;
}
export const setCompanyAdminRef: SetCompanyAdminRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setCompanyAdmin(dc: DataConnect, vars: SetCompanyAdminVariables): MutationPromise<SetCompanyAdminData, SetCompanyAdminVariables>;

interface SetCompanyAdminRef {
  ...
  (dc: DataConnect, vars: SetCompanyAdminVariables): MutationRef<SetCompanyAdminData, SetCompanyAdminVariables>;
}
export const setCompanyAdminRef: SetCompanyAdminRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setCompanyAdminRef:
```typescript
const name = setCompanyAdminRef.operationName;
console.log(name);
```

### Variables
The `SetCompanyAdmin` mutation requires an argument of type `SetCompanyAdminVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetCompanyAdminVariables {
  id: UUIDString;
  adminId: UUIDString;
}
```
### Return Type
Recall that executing the `SetCompanyAdmin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetCompanyAdminData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetCompanyAdminData {
  company_update?: Company_Key | null;
}
```
### Using `SetCompanyAdmin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setCompanyAdmin, SetCompanyAdminVariables } from '@dataconnect/admin-generated';

// The `SetCompanyAdmin` mutation requires an argument of type `SetCompanyAdminVariables`:
const setCompanyAdminVars: SetCompanyAdminVariables = {
  id: ..., 
  adminId: ..., 
};

// Call the `setCompanyAdmin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setCompanyAdmin(setCompanyAdminVars);
// Variables can be defined inline as well.
const { data } = await setCompanyAdmin({ id: ..., adminId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setCompanyAdmin(dataConnect, setCompanyAdminVars);

console.log(data.company_update);

// Or, you can use the `Promise` API.
setCompanyAdmin(setCompanyAdminVars).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

### Using `SetCompanyAdmin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setCompanyAdminRef, SetCompanyAdminVariables } from '@dataconnect/admin-generated';

// The `SetCompanyAdmin` mutation requires an argument of type `SetCompanyAdminVariables`:
const setCompanyAdminVars: SetCompanyAdminVariables = {
  id: ..., 
  adminId: ..., 
};

// Call the `setCompanyAdminRef()` function to get a reference to the mutation.
const ref = setCompanyAdminRef(setCompanyAdminVars);
// Variables can be defined inline as well.
const ref = setCompanyAdminRef({ id: ..., adminId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setCompanyAdminRef(dataConnect, setCompanyAdminVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

## UpdateCompanyStatus
You can execute the `UpdateCompanyStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCompanyStatus(vars: UpdateCompanyStatusVariables): MutationPromise<UpdateCompanyStatusData, UpdateCompanyStatusVariables>;

interface UpdateCompanyStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCompanyStatusVariables): MutationRef<UpdateCompanyStatusData, UpdateCompanyStatusVariables>;
}
export const updateCompanyStatusRef: UpdateCompanyStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCompanyStatus(dc: DataConnect, vars: UpdateCompanyStatusVariables): MutationPromise<UpdateCompanyStatusData, UpdateCompanyStatusVariables>;

interface UpdateCompanyStatusRef {
  ...
  (dc: DataConnect, vars: UpdateCompanyStatusVariables): MutationRef<UpdateCompanyStatusData, UpdateCompanyStatusVariables>;
}
export const updateCompanyStatusRef: UpdateCompanyStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCompanyStatusRef:
```typescript
const name = updateCompanyStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateCompanyStatus` mutation requires an argument of type `UpdateCompanyStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCompanyStatusVariables {
  id: UUIDString;
  status: string;
  isVerified: boolean;
}
```
### Return Type
Recall that executing the `UpdateCompanyStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCompanyStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCompanyStatusData {
  company_update?: Company_Key | null;
}
```
### Using `UpdateCompanyStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCompanyStatus, UpdateCompanyStatusVariables } from '@dataconnect/admin-generated';

// The `UpdateCompanyStatus` mutation requires an argument of type `UpdateCompanyStatusVariables`:
const updateCompanyStatusVars: UpdateCompanyStatusVariables = {
  id: ..., 
  status: ..., 
  isVerified: ..., 
};

// Call the `updateCompanyStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCompanyStatus(updateCompanyStatusVars);
// Variables can be defined inline as well.
const { data } = await updateCompanyStatus({ id: ..., status: ..., isVerified: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCompanyStatus(dataConnect, updateCompanyStatusVars);

console.log(data.company_update);

// Or, you can use the `Promise` API.
updateCompanyStatus(updateCompanyStatusVars).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

### Using `UpdateCompanyStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCompanyStatusRef, UpdateCompanyStatusVariables } from '@dataconnect/admin-generated';

// The `UpdateCompanyStatus` mutation requires an argument of type `UpdateCompanyStatusVariables`:
const updateCompanyStatusVars: UpdateCompanyStatusVariables = {
  id: ..., 
  status: ..., 
  isVerified: ..., 
};

// Call the `updateCompanyStatusRef()` function to get a reference to the mutation.
const ref = updateCompanyStatusRef(updateCompanyStatusVars);
// Variables can be defined inline as well.
const ref = updateCompanyStatusRef({ id: ..., status: ..., isVerified: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCompanyStatusRef(dataConnect, updateCompanyStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.company_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.company_update);
});
```

## CreateCompanyMembership
You can execute the `CreateCompanyMembership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCompanyMembership(vars: CreateCompanyMembershipVariables): MutationPromise<CreateCompanyMembershipData, CreateCompanyMembershipVariables>;

interface CreateCompanyMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCompanyMembershipVariables): MutationRef<CreateCompanyMembershipData, CreateCompanyMembershipVariables>;
}
export const createCompanyMembershipRef: CreateCompanyMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCompanyMembership(dc: DataConnect, vars: CreateCompanyMembershipVariables): MutationPromise<CreateCompanyMembershipData, CreateCompanyMembershipVariables>;

interface CreateCompanyMembershipRef {
  ...
  (dc: DataConnect, vars: CreateCompanyMembershipVariables): MutationRef<CreateCompanyMembershipData, CreateCompanyMembershipVariables>;
}
export const createCompanyMembershipRef: CreateCompanyMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCompanyMembershipRef:
```typescript
const name = createCompanyMembershipRef.operationName;
console.log(name);
```

### Variables
The `CreateCompanyMembership` mutation requires an argument of type `CreateCompanyMembershipVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCompanyMembershipVariables {
  userId: UUIDString;
  companyId: UUIDString;
  role: string;
  invitedBy?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateCompanyMembership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCompanyMembershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCompanyMembershipData {
  companyMembership_insert: CompanyMembership_Key;
}
```
### Using `CreateCompanyMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCompanyMembership, CreateCompanyMembershipVariables } from '@dataconnect/admin-generated';

// The `CreateCompanyMembership` mutation requires an argument of type `CreateCompanyMembershipVariables`:
const createCompanyMembershipVars: CreateCompanyMembershipVariables = {
  userId: ..., 
  companyId: ..., 
  role: ..., 
  invitedBy: ..., // optional
};

// Call the `createCompanyMembership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCompanyMembership(createCompanyMembershipVars);
// Variables can be defined inline as well.
const { data } = await createCompanyMembership({ userId: ..., companyId: ..., role: ..., invitedBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCompanyMembership(dataConnect, createCompanyMembershipVars);

console.log(data.companyMembership_insert);

// Or, you can use the `Promise` API.
createCompanyMembership(createCompanyMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.companyMembership_insert);
});
```

### Using `CreateCompanyMembership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCompanyMembershipRef, CreateCompanyMembershipVariables } from '@dataconnect/admin-generated';

// The `CreateCompanyMembership` mutation requires an argument of type `CreateCompanyMembershipVariables`:
const createCompanyMembershipVars: CreateCompanyMembershipVariables = {
  userId: ..., 
  companyId: ..., 
  role: ..., 
  invitedBy: ..., // optional
};

// Call the `createCompanyMembershipRef()` function to get a reference to the mutation.
const ref = createCompanyMembershipRef(createCompanyMembershipVars);
// Variables can be defined inline as well.
const ref = createCompanyMembershipRef({ userId: ..., companyId: ..., role: ..., invitedBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCompanyMembershipRef(dataConnect, createCompanyMembershipVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.companyMembership_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.companyMembership_insert);
});
```

## CreateEmployee
You can execute the `CreateEmployee` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEmployee(vars: CreateEmployeeVariables): MutationPromise<CreateEmployeeData, CreateEmployeeVariables>;

interface CreateEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEmployeeVariables): MutationRef<CreateEmployeeData, CreateEmployeeVariables>;
}
export const createEmployeeRef: CreateEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEmployee(dc: DataConnect, vars: CreateEmployeeVariables): MutationPromise<CreateEmployeeData, CreateEmployeeVariables>;

interface CreateEmployeeRef {
  ...
  (dc: DataConnect, vars: CreateEmployeeVariables): MutationRef<CreateEmployeeData, CreateEmployeeVariables>;
}
export const createEmployeeRef: CreateEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEmployeeRef:
```typescript
const name = createEmployeeRef.operationName;
console.log(name);
```

### Variables
The `CreateEmployee` mutation requires an argument of type `CreateEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEmployeeVariables {
  userId?: UUIDString | null;
  companyId: UUIDString;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  jobTitle: string;
  department: string;
  employmentType?: string | null;
  employmentStatus?: string | null;
  startDate: DateString;
  endDate?: DateString | null;
  managerId?: UUIDString | null;
  profilePhoto?: string | null;
  location?: string | null;
}
```
### Return Type
Recall that executing the `CreateEmployee` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEmployeeData {
  employee_insert: Employee_Key;
}
```
### Using `CreateEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEmployee, CreateEmployeeVariables } from '@dataconnect/admin-generated';

// The `CreateEmployee` mutation requires an argument of type `CreateEmployeeVariables`:
const createEmployeeVars: CreateEmployeeVariables = {
  userId: ..., // optional
  companyId: ..., 
  firstName: ..., 
  lastName: ..., 
  email: ..., 
  phone: ..., // optional
  jobTitle: ..., 
  department: ..., 
  employmentType: ..., // optional
  employmentStatus: ..., // optional
  startDate: ..., 
  endDate: ..., // optional
  managerId: ..., // optional
  profilePhoto: ..., // optional
  location: ..., // optional
};

// Call the `createEmployee()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEmployee(createEmployeeVars);
// Variables can be defined inline as well.
const { data } = await createEmployee({ userId: ..., companyId: ..., firstName: ..., lastName: ..., email: ..., phone: ..., jobTitle: ..., department: ..., employmentType: ..., employmentStatus: ..., startDate: ..., endDate: ..., managerId: ..., profilePhoto: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEmployee(dataConnect, createEmployeeVars);

console.log(data.employee_insert);

// Or, you can use the `Promise` API.
createEmployee(createEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.employee_insert);
});
```

### Using `CreateEmployee`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEmployeeRef, CreateEmployeeVariables } from '@dataconnect/admin-generated';

// The `CreateEmployee` mutation requires an argument of type `CreateEmployeeVariables`:
const createEmployeeVars: CreateEmployeeVariables = {
  userId: ..., // optional
  companyId: ..., 
  firstName: ..., 
  lastName: ..., 
  email: ..., 
  phone: ..., // optional
  jobTitle: ..., 
  department: ..., 
  employmentType: ..., // optional
  employmentStatus: ..., // optional
  startDate: ..., 
  endDate: ..., // optional
  managerId: ..., // optional
  profilePhoto: ..., // optional
  location: ..., // optional
};

// Call the `createEmployeeRef()` function to get a reference to the mutation.
const ref = createEmployeeRef(createEmployeeVars);
// Variables can be defined inline as well.
const ref = createEmployeeRef({ userId: ..., companyId: ..., firstName: ..., lastName: ..., email: ..., phone: ..., jobTitle: ..., department: ..., employmentType: ..., employmentStatus: ..., startDate: ..., endDate: ..., managerId: ..., profilePhoto: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEmployeeRef(dataConnect, createEmployeeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_insert);
});
```

## UpdateEmployee
You can execute the `UpdateEmployee` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEmployee(vars: UpdateEmployeeVariables): MutationPromise<UpdateEmployeeData, UpdateEmployeeVariables>;

interface UpdateEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEmployeeVariables): MutationRef<UpdateEmployeeData, UpdateEmployeeVariables>;
}
export const updateEmployeeRef: UpdateEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEmployee(dc: DataConnect, vars: UpdateEmployeeVariables): MutationPromise<UpdateEmployeeData, UpdateEmployeeVariables>;

interface UpdateEmployeeRef {
  ...
  (dc: DataConnect, vars: UpdateEmployeeVariables): MutationRef<UpdateEmployeeData, UpdateEmployeeVariables>;
}
export const updateEmployeeRef: UpdateEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEmployeeRef:
```typescript
const name = updateEmployeeRef.operationName;
console.log(name);
```

### Variables
The `UpdateEmployee` mutation requires an argument of type `UpdateEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEmployeeVariables {
  id: UUIDString;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  department?: string | null;
  employmentType?: string | null;
  employmentStatus?: string | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  managerId?: UUIDString | null;
  profilePhoto?: string | null;
  location?: string | null;
}
```
### Return Type
Recall that executing the `UpdateEmployee` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEmployeeData {
  employee_update?: Employee_Key | null;
}
```
### Using `UpdateEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEmployee, UpdateEmployeeVariables } from '@dataconnect/admin-generated';

// The `UpdateEmployee` mutation requires an argument of type `UpdateEmployeeVariables`:
const updateEmployeeVars: UpdateEmployeeVariables = {
  id: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  phone: ..., // optional
  jobTitle: ..., // optional
  department: ..., // optional
  employmentType: ..., // optional
  employmentStatus: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  managerId: ..., // optional
  profilePhoto: ..., // optional
  location: ..., // optional
};

// Call the `updateEmployee()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEmployee(updateEmployeeVars);
// Variables can be defined inline as well.
const { data } = await updateEmployee({ id: ..., firstName: ..., lastName: ..., phone: ..., jobTitle: ..., department: ..., employmentType: ..., employmentStatus: ..., startDate: ..., endDate: ..., managerId: ..., profilePhoto: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEmployee(dataConnect, updateEmployeeVars);

console.log(data.employee_update);

// Or, you can use the `Promise` API.
updateEmployee(updateEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
});
```

### Using `UpdateEmployee`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEmployeeRef, UpdateEmployeeVariables } from '@dataconnect/admin-generated';

// The `UpdateEmployee` mutation requires an argument of type `UpdateEmployeeVariables`:
const updateEmployeeVars: UpdateEmployeeVariables = {
  id: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  phone: ..., // optional
  jobTitle: ..., // optional
  department: ..., // optional
  employmentType: ..., // optional
  employmentStatus: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  managerId: ..., // optional
  profilePhoto: ..., // optional
  location: ..., // optional
};

// Call the `updateEmployeeRef()` function to get a reference to the mutation.
const ref = updateEmployeeRef(updateEmployeeVars);
// Variables can be defined inline as well.
const ref = updateEmployeeRef({ id: ..., firstName: ..., lastName: ..., phone: ..., jobTitle: ..., department: ..., employmentType: ..., employmentStatus: ..., startDate: ..., endDate: ..., managerId: ..., profilePhoto: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEmployeeRef(dataConnect, updateEmployeeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
});
```

## SoftDeleteEmployee
You can execute the `SoftDeleteEmployee` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
softDeleteEmployee(vars: SoftDeleteEmployeeVariables): MutationPromise<SoftDeleteEmployeeData, SoftDeleteEmployeeVariables>;

interface SoftDeleteEmployeeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SoftDeleteEmployeeVariables): MutationRef<SoftDeleteEmployeeData, SoftDeleteEmployeeVariables>;
}
export const softDeleteEmployeeRef: SoftDeleteEmployeeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
softDeleteEmployee(dc: DataConnect, vars: SoftDeleteEmployeeVariables): MutationPromise<SoftDeleteEmployeeData, SoftDeleteEmployeeVariables>;

interface SoftDeleteEmployeeRef {
  ...
  (dc: DataConnect, vars: SoftDeleteEmployeeVariables): MutationRef<SoftDeleteEmployeeData, SoftDeleteEmployeeVariables>;
}
export const softDeleteEmployeeRef: SoftDeleteEmployeeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the softDeleteEmployeeRef:
```typescript
const name = softDeleteEmployeeRef.operationName;
console.log(name);
```

### Variables
The `SoftDeleteEmployee` mutation requires an argument of type `SoftDeleteEmployeeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SoftDeleteEmployeeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `SoftDeleteEmployee` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SoftDeleteEmployeeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SoftDeleteEmployeeData {
  employee_update?: Employee_Key | null;
}
```
### Using `SoftDeleteEmployee`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, softDeleteEmployee, SoftDeleteEmployeeVariables } from '@dataconnect/admin-generated';

// The `SoftDeleteEmployee` mutation requires an argument of type `SoftDeleteEmployeeVariables`:
const softDeleteEmployeeVars: SoftDeleteEmployeeVariables = {
  id: ..., 
};

// Call the `softDeleteEmployee()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await softDeleteEmployee(softDeleteEmployeeVars);
// Variables can be defined inline as well.
const { data } = await softDeleteEmployee({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await softDeleteEmployee(dataConnect, softDeleteEmployeeVars);

console.log(data.employee_update);

// Or, you can use the `Promise` API.
softDeleteEmployee(softDeleteEmployeeVars).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
});
```

### Using `SoftDeleteEmployee`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, softDeleteEmployeeRef, SoftDeleteEmployeeVariables } from '@dataconnect/admin-generated';

// The `SoftDeleteEmployee` mutation requires an argument of type `SoftDeleteEmployeeVariables`:
const softDeleteEmployeeVars: SoftDeleteEmployeeVariables = {
  id: ..., 
};

// Call the `softDeleteEmployeeRef()` function to get a reference to the mutation.
const ref = softDeleteEmployeeRef(softDeleteEmployeeVars);
// Variables can be defined inline as well.
const ref = softDeleteEmployeeRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = softDeleteEmployeeRef(dataConnect, softDeleteEmployeeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
});
```

## VerifyEmployeeRecord
You can execute the `VerifyEmployeeRecord` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
verifyEmployeeRecord(vars: VerifyEmployeeRecordVariables): MutationPromise<VerifyEmployeeRecordData, VerifyEmployeeRecordVariables>;

interface VerifyEmployeeRecordRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: VerifyEmployeeRecordVariables): MutationRef<VerifyEmployeeRecordData, VerifyEmployeeRecordVariables>;
}
export const verifyEmployeeRecordRef: VerifyEmployeeRecordRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
verifyEmployeeRecord(dc: DataConnect, vars: VerifyEmployeeRecordVariables): MutationPromise<VerifyEmployeeRecordData, VerifyEmployeeRecordVariables>;

interface VerifyEmployeeRecordRef {
  ...
  (dc: DataConnect, vars: VerifyEmployeeRecordVariables): MutationRef<VerifyEmployeeRecordData, VerifyEmployeeRecordVariables>;
}
export const verifyEmployeeRecordRef: VerifyEmployeeRecordRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the verifyEmployeeRecordRef:
```typescript
const name = verifyEmployeeRecordRef.operationName;
console.log(name);
```

### Variables
The `VerifyEmployeeRecord` mutation requires an argument of type `VerifyEmployeeRecordVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface VerifyEmployeeRecordVariables {
  id: UUIDString;
  verifiedBy: UUIDString;
}
```
### Return Type
Recall that executing the `VerifyEmployeeRecord` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `VerifyEmployeeRecordData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface VerifyEmployeeRecordData {
  employee_update?: Employee_Key | null;
}
```
### Using `VerifyEmployeeRecord`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, verifyEmployeeRecord, VerifyEmployeeRecordVariables } from '@dataconnect/admin-generated';

// The `VerifyEmployeeRecord` mutation requires an argument of type `VerifyEmployeeRecordVariables`:
const verifyEmployeeRecordVars: VerifyEmployeeRecordVariables = {
  id: ..., 
  verifiedBy: ..., 
};

// Call the `verifyEmployeeRecord()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await verifyEmployeeRecord(verifyEmployeeRecordVars);
// Variables can be defined inline as well.
const { data } = await verifyEmployeeRecord({ id: ..., verifiedBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await verifyEmployeeRecord(dataConnect, verifyEmployeeRecordVars);

console.log(data.employee_update);

// Or, you can use the `Promise` API.
verifyEmployeeRecord(verifyEmployeeRecordVars).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
});
```

### Using `VerifyEmployeeRecord`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, verifyEmployeeRecordRef, VerifyEmployeeRecordVariables } from '@dataconnect/admin-generated';

// The `VerifyEmployeeRecord` mutation requires an argument of type `VerifyEmployeeRecordVariables`:
const verifyEmployeeRecordVars: VerifyEmployeeRecordVariables = {
  id: ..., 
  verifiedBy: ..., 
};

// Call the `verifyEmployeeRecordRef()` function to get a reference to the mutation.
const ref = verifyEmployeeRecordRef(verifyEmployeeRecordVars);
// Variables can be defined inline as well.
const ref = verifyEmployeeRecordRef({ id: ..., verifiedBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = verifyEmployeeRecordRef(dataConnect, verifyEmployeeRecordVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
});
```

## EndEmployeeEmployment
You can execute the `EndEmployeeEmployment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
endEmployeeEmployment(vars: EndEmployeeEmploymentVariables): MutationPromise<EndEmployeeEmploymentData, EndEmployeeEmploymentVariables>;

interface EndEmployeeEmploymentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EndEmployeeEmploymentVariables): MutationRef<EndEmployeeEmploymentData, EndEmployeeEmploymentVariables>;
}
export const endEmployeeEmploymentRef: EndEmployeeEmploymentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
endEmployeeEmployment(dc: DataConnect, vars: EndEmployeeEmploymentVariables): MutationPromise<EndEmployeeEmploymentData, EndEmployeeEmploymentVariables>;

interface EndEmployeeEmploymentRef {
  ...
  (dc: DataConnect, vars: EndEmployeeEmploymentVariables): MutationRef<EndEmployeeEmploymentData, EndEmployeeEmploymentVariables>;
}
export const endEmployeeEmploymentRef: EndEmployeeEmploymentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the endEmployeeEmploymentRef:
```typescript
const name = endEmployeeEmploymentRef.operationName;
console.log(name);
```

### Variables
The `EndEmployeeEmployment` mutation requires an argument of type `EndEmployeeEmploymentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EndEmployeeEmploymentVariables {
  id: UUIDString;
  endDate: DateString;
}
```
### Return Type
Recall that executing the `EndEmployeeEmployment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EndEmployeeEmploymentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EndEmployeeEmploymentData {
  employee_update?: Employee_Key | null;
}
```
### Using `EndEmployeeEmployment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, endEmployeeEmployment, EndEmployeeEmploymentVariables } from '@dataconnect/admin-generated';

// The `EndEmployeeEmployment` mutation requires an argument of type `EndEmployeeEmploymentVariables`:
const endEmployeeEmploymentVars: EndEmployeeEmploymentVariables = {
  id: ..., 
  endDate: ..., 
};

// Call the `endEmployeeEmployment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await endEmployeeEmployment(endEmployeeEmploymentVars);
// Variables can be defined inline as well.
const { data } = await endEmployeeEmployment({ id: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await endEmployeeEmployment(dataConnect, endEmployeeEmploymentVars);

console.log(data.employee_update);

// Or, you can use the `Promise` API.
endEmployeeEmployment(endEmployeeEmploymentVars).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
});
```

### Using `EndEmployeeEmployment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, endEmployeeEmploymentRef, EndEmployeeEmploymentVariables } from '@dataconnect/admin-generated';

// The `EndEmployeeEmployment` mutation requires an argument of type `EndEmployeeEmploymentVariables`:
const endEmployeeEmploymentVars: EndEmployeeEmploymentVariables = {
  id: ..., 
  endDate: ..., 
};

// Call the `endEmployeeEmploymentRef()` function to get a reference to the mutation.
const ref = endEmployeeEmploymentRef(endEmployeeEmploymentVars);
// Variables can be defined inline as well.
const ref = endEmployeeEmploymentRef({ id: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = endEmployeeEmploymentRef(dataConnect, endEmployeeEmploymentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employee_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employee_update);
});
```

## CreateSkill
You can execute the `CreateSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSkill(vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;

interface CreateSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
}
export const createSkillRef: CreateSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSkill(dc: DataConnect, vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;

interface CreateSkillRef {
  ...
  (dc: DataConnect, vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
}
export const createSkillRef: CreateSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSkillRef:
```typescript
const name = createSkillRef.operationName;
console.log(name);
```

### Variables
The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSkillVariables {
  name: string;
  category?: string | null;
}
```
### Return Type
Recall that executing the `CreateSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSkillData {
  skill_insert: Skill_Key;
}
```
### Using `CreateSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSkill, CreateSkillVariables } from '@dataconnect/admin-generated';

// The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`:
const createSkillVars: CreateSkillVariables = {
  name: ..., 
  category: ..., // optional
};

// Call the `createSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSkill(createSkillVars);
// Variables can be defined inline as well.
const { data } = await createSkill({ name: ..., category: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSkill(dataConnect, createSkillVars);

console.log(data.skill_insert);

// Or, you can use the `Promise` API.
createSkill(createSkillVars).then((response) => {
  const data = response.data;
  console.log(data.skill_insert);
});
```

### Using `CreateSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSkillRef, CreateSkillVariables } from '@dataconnect/admin-generated';

// The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`:
const createSkillVars: CreateSkillVariables = {
  name: ..., 
  category: ..., // optional
};

// Call the `createSkillRef()` function to get a reference to the mutation.
const ref = createSkillRef(createSkillVars);
// Variables can be defined inline as well.
const ref = createSkillRef({ name: ..., category: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSkillRef(dataConnect, createSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.skill_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.skill_insert);
});
```

## AddEmployeeSkill
You can execute the `AddEmployeeSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addEmployeeSkill(vars: AddEmployeeSkillVariables): MutationPromise<AddEmployeeSkillData, AddEmployeeSkillVariables>;

interface AddEmployeeSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddEmployeeSkillVariables): MutationRef<AddEmployeeSkillData, AddEmployeeSkillVariables>;
}
export const addEmployeeSkillRef: AddEmployeeSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addEmployeeSkill(dc: DataConnect, vars: AddEmployeeSkillVariables): MutationPromise<AddEmployeeSkillData, AddEmployeeSkillVariables>;

interface AddEmployeeSkillRef {
  ...
  (dc: DataConnect, vars: AddEmployeeSkillVariables): MutationRef<AddEmployeeSkillData, AddEmployeeSkillVariables>;
}
export const addEmployeeSkillRef: AddEmployeeSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addEmployeeSkillRef:
```typescript
const name = addEmployeeSkillRef.operationName;
console.log(name);
```

### Variables
The `AddEmployeeSkill` mutation requires an argument of type `AddEmployeeSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddEmployeeSkillVariables {
  employeeId: UUIDString;
  skillId: UUIDString;
  proficiencyLevel: string;
  initialLevel?: string | null;
  yearsExperience?: number | null;
}
```
### Return Type
Recall that executing the `AddEmployeeSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddEmployeeSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddEmployeeSkillData {
  employeeSkill_insert: EmployeeSkill_Key;
}
```
### Using `AddEmployeeSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addEmployeeSkill, AddEmployeeSkillVariables } from '@dataconnect/admin-generated';

// The `AddEmployeeSkill` mutation requires an argument of type `AddEmployeeSkillVariables`:
const addEmployeeSkillVars: AddEmployeeSkillVariables = {
  employeeId: ..., 
  skillId: ..., 
  proficiencyLevel: ..., 
  initialLevel: ..., // optional
  yearsExperience: ..., // optional
};

// Call the `addEmployeeSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addEmployeeSkill(addEmployeeSkillVars);
// Variables can be defined inline as well.
const { data } = await addEmployeeSkill({ employeeId: ..., skillId: ..., proficiencyLevel: ..., initialLevel: ..., yearsExperience: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addEmployeeSkill(dataConnect, addEmployeeSkillVars);

console.log(data.employeeSkill_insert);

// Or, you can use the `Promise` API.
addEmployeeSkill(addEmployeeSkillVars).then((response) => {
  const data = response.data;
  console.log(data.employeeSkill_insert);
});
```

### Using `AddEmployeeSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addEmployeeSkillRef, AddEmployeeSkillVariables } from '@dataconnect/admin-generated';

// The `AddEmployeeSkill` mutation requires an argument of type `AddEmployeeSkillVariables`:
const addEmployeeSkillVars: AddEmployeeSkillVariables = {
  employeeId: ..., 
  skillId: ..., 
  proficiencyLevel: ..., 
  initialLevel: ..., // optional
  yearsExperience: ..., // optional
};

// Call the `addEmployeeSkillRef()` function to get a reference to the mutation.
const ref = addEmployeeSkillRef(addEmployeeSkillVars);
// Variables can be defined inline as well.
const ref = addEmployeeSkillRef({ employeeId: ..., skillId: ..., proficiencyLevel: ..., initialLevel: ..., yearsExperience: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addEmployeeSkillRef(dataConnect, addEmployeeSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employeeSkill_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeSkill_insert);
});
```

## UpdateEmployeeSkill
You can execute the `UpdateEmployeeSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEmployeeSkill(vars: UpdateEmployeeSkillVariables): MutationPromise<UpdateEmployeeSkillData, UpdateEmployeeSkillVariables>;

interface UpdateEmployeeSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEmployeeSkillVariables): MutationRef<UpdateEmployeeSkillData, UpdateEmployeeSkillVariables>;
}
export const updateEmployeeSkillRef: UpdateEmployeeSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEmployeeSkill(dc: DataConnect, vars: UpdateEmployeeSkillVariables): MutationPromise<UpdateEmployeeSkillData, UpdateEmployeeSkillVariables>;

interface UpdateEmployeeSkillRef {
  ...
  (dc: DataConnect, vars: UpdateEmployeeSkillVariables): MutationRef<UpdateEmployeeSkillData, UpdateEmployeeSkillVariables>;
}
export const updateEmployeeSkillRef: UpdateEmployeeSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEmployeeSkillRef:
```typescript
const name = updateEmployeeSkillRef.operationName;
console.log(name);
```

### Variables
The `UpdateEmployeeSkill` mutation requires an argument of type `UpdateEmployeeSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEmployeeSkillVariables {
  employeeId: UUIDString;
  skillId: UUIDString;
  proficiencyLevel?: string | null;
  initialLevel?: string | null;
  yearsExperience?: number | null;
  isVerified?: boolean | null;
  verifiedBy?: UUIDString | null;
  verificationDate?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateEmployeeSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEmployeeSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEmployeeSkillData {
  employeeSkill_update?: EmployeeSkill_Key | null;
}
```
### Using `UpdateEmployeeSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEmployeeSkill, UpdateEmployeeSkillVariables } from '@dataconnect/admin-generated';

// The `UpdateEmployeeSkill` mutation requires an argument of type `UpdateEmployeeSkillVariables`:
const updateEmployeeSkillVars: UpdateEmployeeSkillVariables = {
  employeeId: ..., 
  skillId: ..., 
  proficiencyLevel: ..., // optional
  initialLevel: ..., // optional
  yearsExperience: ..., // optional
  isVerified: ..., // optional
  verifiedBy: ..., // optional
  verificationDate: ..., // optional
};

// Call the `updateEmployeeSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEmployeeSkill(updateEmployeeSkillVars);
// Variables can be defined inline as well.
const { data } = await updateEmployeeSkill({ employeeId: ..., skillId: ..., proficiencyLevel: ..., initialLevel: ..., yearsExperience: ..., isVerified: ..., verifiedBy: ..., verificationDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEmployeeSkill(dataConnect, updateEmployeeSkillVars);

console.log(data.employeeSkill_update);

// Or, you can use the `Promise` API.
updateEmployeeSkill(updateEmployeeSkillVars).then((response) => {
  const data = response.data;
  console.log(data.employeeSkill_update);
});
```

### Using `UpdateEmployeeSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEmployeeSkillRef, UpdateEmployeeSkillVariables } from '@dataconnect/admin-generated';

// The `UpdateEmployeeSkill` mutation requires an argument of type `UpdateEmployeeSkillVariables`:
const updateEmployeeSkillVars: UpdateEmployeeSkillVariables = {
  employeeId: ..., 
  skillId: ..., 
  proficiencyLevel: ..., // optional
  initialLevel: ..., // optional
  yearsExperience: ..., // optional
  isVerified: ..., // optional
  verifiedBy: ..., // optional
  verificationDate: ..., // optional
};

// Call the `updateEmployeeSkillRef()` function to get a reference to the mutation.
const ref = updateEmployeeSkillRef(updateEmployeeSkillVars);
// Variables can be defined inline as well.
const ref = updateEmployeeSkillRef({ employeeId: ..., skillId: ..., proficiencyLevel: ..., initialLevel: ..., yearsExperience: ..., isVerified: ..., verifiedBy: ..., verificationDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEmployeeSkillRef(dataConnect, updateEmployeeSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employeeSkill_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeSkill_update);
});
```

## CreateProject
You can execute the `CreateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectRef:
```typescript
const name = createProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateProject` mutation requires an argument of type `CreateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  name: string;
  description?: string | null;
  role?: string | null;
  technologies?: string | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  status?: string | null;
  contributionSummary?: string | null;
  performanceRating?: number | null;
}
```
### Return Type
Recall that executing the `CreateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProject, CreateProjectVariables } from '@dataconnect/admin-generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  employeeId: ..., 
  companyId: ..., 
  name: ..., 
  description: ..., // optional
  role: ..., // optional
  technologies: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  status: ..., // optional
  contributionSummary: ..., // optional
  performanceRating: ..., // optional
};

// Call the `createProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProject(createProjectVars);
// Variables can be defined inline as well.
const { data } = await createProject({ employeeId: ..., companyId: ..., name: ..., description: ..., role: ..., technologies: ..., startDate: ..., endDate: ..., status: ..., contributionSummary: ..., performanceRating: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProject(dataConnect, createProjectVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createProject(createProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectRef, CreateProjectVariables } from '@dataconnect/admin-generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  employeeId: ..., 
  companyId: ..., 
  name: ..., 
  description: ..., // optional
  role: ..., // optional
  technologies: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  status: ..., // optional
  contributionSummary: ..., // optional
  performanceRating: ..., // optional
};

// Call the `createProjectRef()` function to get a reference to the mutation.
const ref = createProjectRef(createProjectVars);
// Variables can be defined inline as well.
const ref = createProjectRef({ employeeId: ..., companyId: ..., name: ..., description: ..., role: ..., technologies: ..., startDate: ..., endDate: ..., status: ..., contributionSummary: ..., performanceRating: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectRef(dataConnect, createProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## UpdateProject
You can execute the `UpdateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectRef:
```typescript
const name = updateProjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  role?: string | null;
  technologies?: string | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  status?: string | null;
  contributionSummary?: string | null;
  performanceRating?: number | null;
  isVerified?: boolean | null;
  verifiedBy?: UUIDString | null;
  verificationDate?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProject, UpdateProjectVariables } from '@dataconnect/admin-generated';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  role: ..., // optional
  technologies: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  status: ..., // optional
  contributionSummary: ..., // optional
  performanceRating: ..., // optional
  isVerified: ..., // optional
  verifiedBy: ..., // optional
  verificationDate: ..., // optional
};

// Call the `updateProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProject(updateProjectVars);
// Variables can be defined inline as well.
const { data } = await updateProject({ id: ..., name: ..., description: ..., role: ..., technologies: ..., startDate: ..., endDate: ..., status: ..., contributionSummary: ..., performanceRating: ..., isVerified: ..., verifiedBy: ..., verificationDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProject(dataConnect, updateProjectVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProject(updateProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectRef, UpdateProjectVariables } from '@dataconnect/admin-generated';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  role: ..., // optional
  technologies: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  status: ..., // optional
  contributionSummary: ..., // optional
  performanceRating: ..., // optional
  isVerified: ..., // optional
  verifiedBy: ..., // optional
  verificationDate: ..., // optional
};

// Call the `updateProjectRef()` function to get a reference to the mutation.
const ref = updateProjectRef(updateProjectVars);
// Variables can be defined inline as well.
const ref = updateProjectRef({ id: ..., name: ..., description: ..., role: ..., technologies: ..., startDate: ..., endDate: ..., status: ..., contributionSummary: ..., performanceRating: ..., isVerified: ..., verifiedBy: ..., verificationDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectRef(dataConnect, updateProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## CreateBehaviorRating
You can execute the `CreateBehaviorRating` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBehaviorRating(vars: CreateBehaviorRatingVariables): MutationPromise<CreateBehaviorRatingData, CreateBehaviorRatingVariables>;

interface CreateBehaviorRatingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBehaviorRatingVariables): MutationRef<CreateBehaviorRatingData, CreateBehaviorRatingVariables>;
}
export const createBehaviorRatingRef: CreateBehaviorRatingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBehaviorRating(dc: DataConnect, vars: CreateBehaviorRatingVariables): MutationPromise<CreateBehaviorRatingData, CreateBehaviorRatingVariables>;

interface CreateBehaviorRatingRef {
  ...
  (dc: DataConnect, vars: CreateBehaviorRatingVariables): MutationRef<CreateBehaviorRatingData, CreateBehaviorRatingVariables>;
}
export const createBehaviorRatingRef: CreateBehaviorRatingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBehaviorRatingRef:
```typescript
const name = createBehaviorRatingRef.operationName;
console.log(name);
```

### Variables
The `CreateBehaviorRating` mutation requires an argument of type `CreateBehaviorRatingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBehaviorRatingVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  category: string;
  rating: number;
  reviewerId: UUIDString;
  reviewDate: DateString;
  comments?: string | null;
}
```
### Return Type
Recall that executing the `CreateBehaviorRating` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBehaviorRatingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBehaviorRatingData {
  employeeBehaviorRating_insert: EmployeeBehaviorRating_Key;
}
```
### Using `CreateBehaviorRating`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBehaviorRating, CreateBehaviorRatingVariables } from '@dataconnect/admin-generated';

// The `CreateBehaviorRating` mutation requires an argument of type `CreateBehaviorRatingVariables`:
const createBehaviorRatingVars: CreateBehaviorRatingVariables = {
  employeeId: ..., 
  companyId: ..., 
  category: ..., 
  rating: ..., 
  reviewerId: ..., 
  reviewDate: ..., 
  comments: ..., // optional
};

// Call the `createBehaviorRating()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBehaviorRating(createBehaviorRatingVars);
// Variables can be defined inline as well.
const { data } = await createBehaviorRating({ employeeId: ..., companyId: ..., category: ..., rating: ..., reviewerId: ..., reviewDate: ..., comments: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBehaviorRating(dataConnect, createBehaviorRatingVars);

console.log(data.employeeBehaviorRating_insert);

// Or, you can use the `Promise` API.
createBehaviorRating(createBehaviorRatingVars).then((response) => {
  const data = response.data;
  console.log(data.employeeBehaviorRating_insert);
});
```

### Using `CreateBehaviorRating`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBehaviorRatingRef, CreateBehaviorRatingVariables } from '@dataconnect/admin-generated';

// The `CreateBehaviorRating` mutation requires an argument of type `CreateBehaviorRatingVariables`:
const createBehaviorRatingVars: CreateBehaviorRatingVariables = {
  employeeId: ..., 
  companyId: ..., 
  category: ..., 
  rating: ..., 
  reviewerId: ..., 
  reviewDate: ..., 
  comments: ..., // optional
};

// Call the `createBehaviorRatingRef()` function to get a reference to the mutation.
const ref = createBehaviorRatingRef(createBehaviorRatingVars);
// Variables can be defined inline as well.
const ref = createBehaviorRatingRef({ employeeId: ..., companyId: ..., category: ..., rating: ..., reviewerId: ..., reviewDate: ..., comments: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBehaviorRatingRef(dataConnect, createBehaviorRatingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employeeBehaviorRating_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeBehaviorRating_insert);
});
```

## CreateAchievement
You can execute the `CreateAchievement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAchievement(vars: CreateAchievementVariables): MutationPromise<CreateAchievementData, CreateAchievementVariables>;

interface CreateAchievementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAchievementVariables): MutationRef<CreateAchievementData, CreateAchievementVariables>;
}
export const createAchievementRef: CreateAchievementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAchievement(dc: DataConnect, vars: CreateAchievementVariables): MutationPromise<CreateAchievementData, CreateAchievementVariables>;

interface CreateAchievementRef {
  ...
  (dc: DataConnect, vars: CreateAchievementVariables): MutationRef<CreateAchievementData, CreateAchievementVariables>;
}
export const createAchievementRef: CreateAchievementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAchievementRef:
```typescript
const name = createAchievementRef.operationName;
console.log(name);
```

### Variables
The `CreateAchievement` mutation requires an argument of type `CreateAchievementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAchievementVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  title: string;
  description?: string | null;
  date?: DateString | null;
  category?: string | null;
  evidenceUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateAchievement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAchievementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAchievementData {
  achievement_insert: Achievement_Key;
}
```
### Using `CreateAchievement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAchievement, CreateAchievementVariables } from '@dataconnect/admin-generated';

// The `CreateAchievement` mutation requires an argument of type `CreateAchievementVariables`:
const createAchievementVars: CreateAchievementVariables = {
  employeeId: ..., 
  companyId: ..., 
  title: ..., 
  description: ..., // optional
  date: ..., // optional
  category: ..., // optional
  evidenceUrl: ..., // optional
};

// Call the `createAchievement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAchievement(createAchievementVars);
// Variables can be defined inline as well.
const { data } = await createAchievement({ employeeId: ..., companyId: ..., title: ..., description: ..., date: ..., category: ..., evidenceUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAchievement(dataConnect, createAchievementVars);

console.log(data.achievement_insert);

// Or, you can use the `Promise` API.
createAchievement(createAchievementVars).then((response) => {
  const data = response.data;
  console.log(data.achievement_insert);
});
```

### Using `CreateAchievement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAchievementRef, CreateAchievementVariables } from '@dataconnect/admin-generated';

// The `CreateAchievement` mutation requires an argument of type `CreateAchievementVariables`:
const createAchievementVars: CreateAchievementVariables = {
  employeeId: ..., 
  companyId: ..., 
  title: ..., 
  description: ..., // optional
  date: ..., // optional
  category: ..., // optional
  evidenceUrl: ..., // optional
};

// Call the `createAchievementRef()` function to get a reference to the mutation.
const ref = createAchievementRef(createAchievementVars);
// Variables can be defined inline as well.
const ref = createAchievementRef({ employeeId: ..., companyId: ..., title: ..., description: ..., date: ..., category: ..., evidenceUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAchievementRef(dataConnect, createAchievementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.achievement_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.achievement_insert);
});
```

## VerifyAchievement
You can execute the `VerifyAchievement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
verifyAchievement(vars: VerifyAchievementVariables): MutationPromise<VerifyAchievementData, VerifyAchievementVariables>;

interface VerifyAchievementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: VerifyAchievementVariables): MutationRef<VerifyAchievementData, VerifyAchievementVariables>;
}
export const verifyAchievementRef: VerifyAchievementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
verifyAchievement(dc: DataConnect, vars: VerifyAchievementVariables): MutationPromise<VerifyAchievementData, VerifyAchievementVariables>;

interface VerifyAchievementRef {
  ...
  (dc: DataConnect, vars: VerifyAchievementVariables): MutationRef<VerifyAchievementData, VerifyAchievementVariables>;
}
export const verifyAchievementRef: VerifyAchievementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the verifyAchievementRef:
```typescript
const name = verifyAchievementRef.operationName;
console.log(name);
```

### Variables
The `VerifyAchievement` mutation requires an argument of type `VerifyAchievementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface VerifyAchievementVariables {
  id: UUIDString;
  verifiedBy: UUIDString;
}
```
### Return Type
Recall that executing the `VerifyAchievement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `VerifyAchievementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface VerifyAchievementData {
  achievement_update?: Achievement_Key | null;
}
```
### Using `VerifyAchievement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, verifyAchievement, VerifyAchievementVariables } from '@dataconnect/admin-generated';

// The `VerifyAchievement` mutation requires an argument of type `VerifyAchievementVariables`:
const verifyAchievementVars: VerifyAchievementVariables = {
  id: ..., 
  verifiedBy: ..., 
};

// Call the `verifyAchievement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await verifyAchievement(verifyAchievementVars);
// Variables can be defined inline as well.
const { data } = await verifyAchievement({ id: ..., verifiedBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await verifyAchievement(dataConnect, verifyAchievementVars);

console.log(data.achievement_update);

// Or, you can use the `Promise` API.
verifyAchievement(verifyAchievementVars).then((response) => {
  const data = response.data;
  console.log(data.achievement_update);
});
```

### Using `VerifyAchievement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, verifyAchievementRef, VerifyAchievementVariables } from '@dataconnect/admin-generated';

// The `VerifyAchievement` mutation requires an argument of type `VerifyAchievementVariables`:
const verifyAchievementVars: VerifyAchievementVariables = {
  id: ..., 
  verifiedBy: ..., 
};

// Call the `verifyAchievementRef()` function to get a reference to the mutation.
const ref = verifyAchievementRef(verifyAchievementVars);
// Variables can be defined inline as well.
const ref = verifyAchievementRef({ id: ..., verifiedBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = verifyAchievementRef(dataConnect, verifyAchievementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.achievement_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.achievement_update);
});
```

## CreatePerformanceReview
You can execute the `CreatePerformanceReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPerformanceReview(vars: CreatePerformanceReviewVariables): MutationPromise<CreatePerformanceReviewData, CreatePerformanceReviewVariables>;

interface CreatePerformanceReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePerformanceReviewVariables): MutationRef<CreatePerformanceReviewData, CreatePerformanceReviewVariables>;
}
export const createPerformanceReviewRef: CreatePerformanceReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPerformanceReview(dc: DataConnect, vars: CreatePerformanceReviewVariables): MutationPromise<CreatePerformanceReviewData, CreatePerformanceReviewVariables>;

interface CreatePerformanceReviewRef {
  ...
  (dc: DataConnect, vars: CreatePerformanceReviewVariables): MutationRef<CreatePerformanceReviewData, CreatePerformanceReviewVariables>;
}
export const createPerformanceReviewRef: CreatePerformanceReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPerformanceReviewRef:
```typescript
const name = createPerformanceReviewRef.operationName;
console.log(name);
```

### Variables
The `CreatePerformanceReview` mutation requires an argument of type `CreatePerformanceReviewVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePerformanceReviewVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  reviewerId: UUIDString;
  period: string;
  rating: number;
  comments?: string | null;
  strengths?: string | null;
  areasForImprovement?: string | null;
  goalsCompleted?: number | null;
  goalsPending?: number | null;
}
```
### Return Type
Recall that executing the `CreatePerformanceReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePerformanceReviewData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePerformanceReviewData {
  performanceReview_insert: PerformanceReview_Key;
}
```
### Using `CreatePerformanceReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPerformanceReview, CreatePerformanceReviewVariables } from '@dataconnect/admin-generated';

// The `CreatePerformanceReview` mutation requires an argument of type `CreatePerformanceReviewVariables`:
const createPerformanceReviewVars: CreatePerformanceReviewVariables = {
  employeeId: ..., 
  companyId: ..., 
  reviewerId: ..., 
  period: ..., 
  rating: ..., 
  comments: ..., // optional
  strengths: ..., // optional
  areasForImprovement: ..., // optional
  goalsCompleted: ..., // optional
  goalsPending: ..., // optional
};

// Call the `createPerformanceReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPerformanceReview(createPerformanceReviewVars);
// Variables can be defined inline as well.
const { data } = await createPerformanceReview({ employeeId: ..., companyId: ..., reviewerId: ..., period: ..., rating: ..., comments: ..., strengths: ..., areasForImprovement: ..., goalsCompleted: ..., goalsPending: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPerformanceReview(dataConnect, createPerformanceReviewVars);

console.log(data.performanceReview_insert);

// Or, you can use the `Promise` API.
createPerformanceReview(createPerformanceReviewVars).then((response) => {
  const data = response.data;
  console.log(data.performanceReview_insert);
});
```

### Using `CreatePerformanceReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPerformanceReviewRef, CreatePerformanceReviewVariables } from '@dataconnect/admin-generated';

// The `CreatePerformanceReview` mutation requires an argument of type `CreatePerformanceReviewVariables`:
const createPerformanceReviewVars: CreatePerformanceReviewVariables = {
  employeeId: ..., 
  companyId: ..., 
  reviewerId: ..., 
  period: ..., 
  rating: ..., 
  comments: ..., // optional
  strengths: ..., // optional
  areasForImprovement: ..., // optional
  goalsCompleted: ..., // optional
  goalsPending: ..., // optional
};

// Call the `createPerformanceReviewRef()` function to get a reference to the mutation.
const ref = createPerformanceReviewRef(createPerformanceReviewVars);
// Variables can be defined inline as well.
const ref = createPerformanceReviewRef({ employeeId: ..., companyId: ..., reviewerId: ..., period: ..., rating: ..., comments: ..., strengths: ..., areasForImprovement: ..., goalsCompleted: ..., goalsPending: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPerformanceReviewRef(dataConnect, createPerformanceReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.performanceReview_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.performanceReview_insert);
});
```

## CreateMonthlyReport
You can execute the `CreateMonthlyReport` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMonthlyReport(vars: CreateMonthlyReportVariables): MutationPromise<CreateMonthlyReportData, CreateMonthlyReportVariables>;

interface CreateMonthlyReportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMonthlyReportVariables): MutationRef<CreateMonthlyReportData, CreateMonthlyReportVariables>;
}
export const createMonthlyReportRef: CreateMonthlyReportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMonthlyReport(dc: DataConnect, vars: CreateMonthlyReportVariables): MutationPromise<CreateMonthlyReportData, CreateMonthlyReportVariables>;

interface CreateMonthlyReportRef {
  ...
  (dc: DataConnect, vars: CreateMonthlyReportVariables): MutationRef<CreateMonthlyReportData, CreateMonthlyReportVariables>;
}
export const createMonthlyReportRef: CreateMonthlyReportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMonthlyReportRef:
```typescript
const name = createMonthlyReportRef.operationName;
console.log(name);
```

### Variables
The `CreateMonthlyReport` mutation requires an argument of type `CreateMonthlyReportVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMonthlyReportVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  month: string;
  year: number;
  performanceScore?: number | null;
  behaviorScore?: number | null;
  skillsImproved?: string | null;
  skillsNeedingDevelopment?: string | null;
  projectsCompleted?: number | null;
  projectsInProgress?: number | null;
  goalsCompleted?: number | null;
  goalsPending?: number | null;
  growthPercentage?: number | null;
  promotionReadiness?: number | null;
  nextRole?: string | null;
  isAiGenerated?: boolean | null;
  reportData?: string | null;
}
```
### Return Type
Recall that executing the `CreateMonthlyReport` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMonthlyReportData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMonthlyReportData {
  monthlyProgressReport_insert: MonthlyProgressReport_Key;
}
```
### Using `CreateMonthlyReport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMonthlyReport, CreateMonthlyReportVariables } from '@dataconnect/admin-generated';

// The `CreateMonthlyReport` mutation requires an argument of type `CreateMonthlyReportVariables`:
const createMonthlyReportVars: CreateMonthlyReportVariables = {
  employeeId: ..., 
  companyId: ..., 
  month: ..., 
  year: ..., 
  performanceScore: ..., // optional
  behaviorScore: ..., // optional
  skillsImproved: ..., // optional
  skillsNeedingDevelopment: ..., // optional
  projectsCompleted: ..., // optional
  projectsInProgress: ..., // optional
  goalsCompleted: ..., // optional
  goalsPending: ..., // optional
  growthPercentage: ..., // optional
  promotionReadiness: ..., // optional
  nextRole: ..., // optional
  isAiGenerated: ..., // optional
  reportData: ..., // optional
};

// Call the `createMonthlyReport()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMonthlyReport(createMonthlyReportVars);
// Variables can be defined inline as well.
const { data } = await createMonthlyReport({ employeeId: ..., companyId: ..., month: ..., year: ..., performanceScore: ..., behaviorScore: ..., skillsImproved: ..., skillsNeedingDevelopment: ..., projectsCompleted: ..., projectsInProgress: ..., goalsCompleted: ..., goalsPending: ..., growthPercentage: ..., promotionReadiness: ..., nextRole: ..., isAiGenerated: ..., reportData: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMonthlyReport(dataConnect, createMonthlyReportVars);

console.log(data.monthlyProgressReport_insert);

// Or, you can use the `Promise` API.
createMonthlyReport(createMonthlyReportVars).then((response) => {
  const data = response.data;
  console.log(data.monthlyProgressReport_insert);
});
```

### Using `CreateMonthlyReport`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMonthlyReportRef, CreateMonthlyReportVariables } from '@dataconnect/admin-generated';

// The `CreateMonthlyReport` mutation requires an argument of type `CreateMonthlyReportVariables`:
const createMonthlyReportVars: CreateMonthlyReportVariables = {
  employeeId: ..., 
  companyId: ..., 
  month: ..., 
  year: ..., 
  performanceScore: ..., // optional
  behaviorScore: ..., // optional
  skillsImproved: ..., // optional
  skillsNeedingDevelopment: ..., // optional
  projectsCompleted: ..., // optional
  projectsInProgress: ..., // optional
  goalsCompleted: ..., // optional
  goalsPending: ..., // optional
  growthPercentage: ..., // optional
  promotionReadiness: ..., // optional
  nextRole: ..., // optional
  isAiGenerated: ..., // optional
  reportData: ..., // optional
};

// Call the `createMonthlyReportRef()` function to get a reference to the mutation.
const ref = createMonthlyReportRef(createMonthlyReportVars);
// Variables can be defined inline as well.
const ref = createMonthlyReportRef({ employeeId: ..., companyId: ..., month: ..., year: ..., performanceScore: ..., behaviorScore: ..., skillsImproved: ..., skillsNeedingDevelopment: ..., projectsCompleted: ..., projectsInProgress: ..., goalsCompleted: ..., goalsPending: ..., growthPercentage: ..., promotionReadiness: ..., nextRole: ..., isAiGenerated: ..., reportData: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMonthlyReportRef(dataConnect, createMonthlyReportVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.monthlyProgressReport_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.monthlyProgressReport_insert);
});
```

## UpdateMonthlyReport
You can execute the `UpdateMonthlyReport` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMonthlyReport(vars: UpdateMonthlyReportVariables): MutationPromise<UpdateMonthlyReportData, UpdateMonthlyReportVariables>;

interface UpdateMonthlyReportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMonthlyReportVariables): MutationRef<UpdateMonthlyReportData, UpdateMonthlyReportVariables>;
}
export const updateMonthlyReportRef: UpdateMonthlyReportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMonthlyReport(dc: DataConnect, vars: UpdateMonthlyReportVariables): MutationPromise<UpdateMonthlyReportData, UpdateMonthlyReportVariables>;

interface UpdateMonthlyReportRef {
  ...
  (dc: DataConnect, vars: UpdateMonthlyReportVariables): MutationRef<UpdateMonthlyReportData, UpdateMonthlyReportVariables>;
}
export const updateMonthlyReportRef: UpdateMonthlyReportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMonthlyReportRef:
```typescript
const name = updateMonthlyReportRef.operationName;
console.log(name);
```

### Variables
The `UpdateMonthlyReport` mutation requires an argument of type `UpdateMonthlyReportVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMonthlyReportVariables {
  id: UUIDString;
  performanceScore?: number | null;
  behaviorScore?: number | null;
  skillsImproved?: string | null;
  skillsNeedingDevelopment?: string | null;
  projectsCompleted?: number | null;
  projectsInProgress?: number | null;
  goalsCompleted?: number | null;
  goalsPending?: number | null;
  growthPercentage?: number | null;
  promotionReadiness?: number | null;
  nextRole?: string | null;
  isAiGenerated?: boolean | null;
  reportData?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMonthlyReport` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMonthlyReportData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMonthlyReportData {
  monthlyProgressReport_update?: MonthlyProgressReport_Key | null;
}
```
### Using `UpdateMonthlyReport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMonthlyReport, UpdateMonthlyReportVariables } from '@dataconnect/admin-generated';

// The `UpdateMonthlyReport` mutation requires an argument of type `UpdateMonthlyReportVariables`:
const updateMonthlyReportVars: UpdateMonthlyReportVariables = {
  id: ..., 
  performanceScore: ..., // optional
  behaviorScore: ..., // optional
  skillsImproved: ..., // optional
  skillsNeedingDevelopment: ..., // optional
  projectsCompleted: ..., // optional
  projectsInProgress: ..., // optional
  goalsCompleted: ..., // optional
  goalsPending: ..., // optional
  growthPercentage: ..., // optional
  promotionReadiness: ..., // optional
  nextRole: ..., // optional
  isAiGenerated: ..., // optional
  reportData: ..., // optional
};

// Call the `updateMonthlyReport()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMonthlyReport(updateMonthlyReportVars);
// Variables can be defined inline as well.
const { data } = await updateMonthlyReport({ id: ..., performanceScore: ..., behaviorScore: ..., skillsImproved: ..., skillsNeedingDevelopment: ..., projectsCompleted: ..., projectsInProgress: ..., goalsCompleted: ..., goalsPending: ..., growthPercentage: ..., promotionReadiness: ..., nextRole: ..., isAiGenerated: ..., reportData: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMonthlyReport(dataConnect, updateMonthlyReportVars);

console.log(data.monthlyProgressReport_update);

// Or, you can use the `Promise` API.
updateMonthlyReport(updateMonthlyReportVars).then((response) => {
  const data = response.data;
  console.log(data.monthlyProgressReport_update);
});
```

### Using `UpdateMonthlyReport`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMonthlyReportRef, UpdateMonthlyReportVariables } from '@dataconnect/admin-generated';

// The `UpdateMonthlyReport` mutation requires an argument of type `UpdateMonthlyReportVariables`:
const updateMonthlyReportVars: UpdateMonthlyReportVariables = {
  id: ..., 
  performanceScore: ..., // optional
  behaviorScore: ..., // optional
  skillsImproved: ..., // optional
  skillsNeedingDevelopment: ..., // optional
  projectsCompleted: ..., // optional
  projectsInProgress: ..., // optional
  goalsCompleted: ..., // optional
  goalsPending: ..., // optional
  growthPercentage: ..., // optional
  promotionReadiness: ..., // optional
  nextRole: ..., // optional
  isAiGenerated: ..., // optional
  reportData: ..., // optional
};

// Call the `updateMonthlyReportRef()` function to get a reference to the mutation.
const ref = updateMonthlyReportRef(updateMonthlyReportVars);
// Variables can be defined inline as well.
const ref = updateMonthlyReportRef({ id: ..., performanceScore: ..., behaviorScore: ..., skillsImproved: ..., skillsNeedingDevelopment: ..., projectsCompleted: ..., projectsInProgress: ..., goalsCompleted: ..., goalsPending: ..., growthPercentage: ..., promotionReadiness: ..., nextRole: ..., isAiGenerated: ..., reportData: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMonthlyReportRef(dataConnect, updateMonthlyReportVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.monthlyProgressReport_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.monthlyProgressReport_update);
});
```

## CreatePrivacySettings
You can execute the `CreatePrivacySettings` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPrivacySettings(vars: CreatePrivacySettingsVariables): MutationPromise<CreatePrivacySettingsData, CreatePrivacySettingsVariables>;

interface CreatePrivacySettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePrivacySettingsVariables): MutationRef<CreatePrivacySettingsData, CreatePrivacySettingsVariables>;
}
export const createPrivacySettingsRef: CreatePrivacySettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPrivacySettings(dc: DataConnect, vars: CreatePrivacySettingsVariables): MutationPromise<CreatePrivacySettingsData, CreatePrivacySettingsVariables>;

interface CreatePrivacySettingsRef {
  ...
  (dc: DataConnect, vars: CreatePrivacySettingsVariables): MutationRef<CreatePrivacySettingsData, CreatePrivacySettingsVariables>;
}
export const createPrivacySettingsRef: CreatePrivacySettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPrivacySettingsRef:
```typescript
const name = createPrivacySettingsRef.operationName;
console.log(name);
```

### Variables
The `CreatePrivacySettings` mutation requires an argument of type `CreatePrivacySettingsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePrivacySettingsVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  profileVisibility?: string | null;
}
```
### Return Type
Recall that executing the `CreatePrivacySettings` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePrivacySettingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePrivacySettingsData {
  privacySettings_insert: PrivacySettings_Key;
}
```
### Using `CreatePrivacySettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPrivacySettings, CreatePrivacySettingsVariables } from '@dataconnect/admin-generated';

// The `CreatePrivacySettings` mutation requires an argument of type `CreatePrivacySettingsVariables`:
const createPrivacySettingsVars: CreatePrivacySettingsVariables = {
  employeeId: ..., 
  companyId: ..., 
  profileVisibility: ..., // optional
};

// Call the `createPrivacySettings()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPrivacySettings(createPrivacySettingsVars);
// Variables can be defined inline as well.
const { data } = await createPrivacySettings({ employeeId: ..., companyId: ..., profileVisibility: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPrivacySettings(dataConnect, createPrivacySettingsVars);

console.log(data.privacySettings_insert);

// Or, you can use the `Promise` API.
createPrivacySettings(createPrivacySettingsVars).then((response) => {
  const data = response.data;
  console.log(data.privacySettings_insert);
});
```

### Using `CreatePrivacySettings`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPrivacySettingsRef, CreatePrivacySettingsVariables } from '@dataconnect/admin-generated';

// The `CreatePrivacySettings` mutation requires an argument of type `CreatePrivacySettingsVariables`:
const createPrivacySettingsVars: CreatePrivacySettingsVariables = {
  employeeId: ..., 
  companyId: ..., 
  profileVisibility: ..., // optional
};

// Call the `createPrivacySettingsRef()` function to get a reference to the mutation.
const ref = createPrivacySettingsRef(createPrivacySettingsVars);
// Variables can be defined inline as well.
const ref = createPrivacySettingsRef({ employeeId: ..., companyId: ..., profileVisibility: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPrivacySettingsRef(dataConnect, createPrivacySettingsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.privacySettings_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.privacySettings_insert);
});
```

## UpdatePrivacySettings
You can execute the `UpdatePrivacySettings` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePrivacySettings(vars: UpdatePrivacySettingsVariables): MutationPromise<UpdatePrivacySettingsData, UpdatePrivacySettingsVariables>;

interface UpdatePrivacySettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePrivacySettingsVariables): MutationRef<UpdatePrivacySettingsData, UpdatePrivacySettingsVariables>;
}
export const updatePrivacySettingsRef: UpdatePrivacySettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePrivacySettings(dc: DataConnect, vars: UpdatePrivacySettingsVariables): MutationPromise<UpdatePrivacySettingsData, UpdatePrivacySettingsVariables>;

interface UpdatePrivacySettingsRef {
  ...
  (dc: DataConnect, vars: UpdatePrivacySettingsVariables): MutationRef<UpdatePrivacySettingsData, UpdatePrivacySettingsVariables>;
}
export const updatePrivacySettingsRef: UpdatePrivacySettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePrivacySettingsRef:
```typescript
const name = updatePrivacySettingsRef.operationName;
console.log(name);
```

### Variables
The `UpdatePrivacySettings` mutation requires an argument of type `UpdatePrivacySettingsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePrivacySettingsVariables {
  privacyId: UUIDString;
  profileVisibility?: string | null;
  namePublic?: boolean | null;
  photoPublic?: boolean | null;
  rolePublic?: boolean | null;
  skillsPublic?: boolean | null;
  skillLevelsPublic?: boolean | null;
  skillGrowthPublic?: boolean | null;
  projectsPublic?: boolean | null;
  projectDescriptionsPublic?: boolean | null;
  achievementsPublic?: boolean | null;
  experiencePublic?: boolean | null;
  performanceSummaryPublic?: boolean | null;
  monthlyProgressPublic?: boolean | null;
  behaviorSummaryPublic?: boolean | null;
  isEmployeeControlled?: boolean | null;
  ownershipTransferredAt?: TimestampString | null;
  publishedAt?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdatePrivacySettings` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePrivacySettingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePrivacySettingsData {
  privacySettings_update?: PrivacySettings_Key | null;
}
```
### Using `UpdatePrivacySettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePrivacySettings, UpdatePrivacySettingsVariables } from '@dataconnect/admin-generated';

// The `UpdatePrivacySettings` mutation requires an argument of type `UpdatePrivacySettingsVariables`:
const updatePrivacySettingsVars: UpdatePrivacySettingsVariables = {
  privacyId: ..., 
  profileVisibility: ..., // optional
  namePublic: ..., // optional
  photoPublic: ..., // optional
  rolePublic: ..., // optional
  skillsPublic: ..., // optional
  skillLevelsPublic: ..., // optional
  skillGrowthPublic: ..., // optional
  projectsPublic: ..., // optional
  projectDescriptionsPublic: ..., // optional
  achievementsPublic: ..., // optional
  experiencePublic: ..., // optional
  performanceSummaryPublic: ..., // optional
  monthlyProgressPublic: ..., // optional
  behaviorSummaryPublic: ..., // optional
  isEmployeeControlled: ..., // optional
  ownershipTransferredAt: ..., // optional
  publishedAt: ..., // optional
};

// Call the `updatePrivacySettings()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePrivacySettings(updatePrivacySettingsVars);
// Variables can be defined inline as well.
const { data } = await updatePrivacySettings({ privacyId: ..., profileVisibility: ..., namePublic: ..., photoPublic: ..., rolePublic: ..., skillsPublic: ..., skillLevelsPublic: ..., skillGrowthPublic: ..., projectsPublic: ..., projectDescriptionsPublic: ..., achievementsPublic: ..., experiencePublic: ..., performanceSummaryPublic: ..., monthlyProgressPublic: ..., behaviorSummaryPublic: ..., isEmployeeControlled: ..., ownershipTransferredAt: ..., publishedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePrivacySettings(dataConnect, updatePrivacySettingsVars);

console.log(data.privacySettings_update);

// Or, you can use the `Promise` API.
updatePrivacySettings(updatePrivacySettingsVars).then((response) => {
  const data = response.data;
  console.log(data.privacySettings_update);
});
```

### Using `UpdatePrivacySettings`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePrivacySettingsRef, UpdatePrivacySettingsVariables } from '@dataconnect/admin-generated';

// The `UpdatePrivacySettings` mutation requires an argument of type `UpdatePrivacySettingsVariables`:
const updatePrivacySettingsVars: UpdatePrivacySettingsVariables = {
  privacyId: ..., 
  profileVisibility: ..., // optional
  namePublic: ..., // optional
  photoPublic: ..., // optional
  rolePublic: ..., // optional
  skillsPublic: ..., // optional
  skillLevelsPublic: ..., // optional
  skillGrowthPublic: ..., // optional
  projectsPublic: ..., // optional
  projectDescriptionsPublic: ..., // optional
  achievementsPublic: ..., // optional
  experiencePublic: ..., // optional
  performanceSummaryPublic: ..., // optional
  monthlyProgressPublic: ..., // optional
  behaviorSummaryPublic: ..., // optional
  isEmployeeControlled: ..., // optional
  ownershipTransferredAt: ..., // optional
  publishedAt: ..., // optional
};

// Call the `updatePrivacySettingsRef()` function to get a reference to the mutation.
const ref = updatePrivacySettingsRef(updatePrivacySettingsVars);
// Variables can be defined inline as well.
const ref = updatePrivacySettingsRef({ privacyId: ..., profileVisibility: ..., namePublic: ..., photoPublic: ..., rolePublic: ..., skillsPublic: ..., skillLevelsPublic: ..., skillGrowthPublic: ..., projectsPublic: ..., projectDescriptionsPublic: ..., achievementsPublic: ..., experiencePublic: ..., performanceSummaryPublic: ..., monthlyProgressPublic: ..., behaviorSummaryPublic: ..., isEmployeeControlled: ..., ownershipTransferredAt: ..., publishedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePrivacySettingsRef(dataConnect, updatePrivacySettingsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.privacySettings_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.privacySettings_update);
});
```

## TransferPrivacyOwnership
You can execute the `TransferPrivacyOwnership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
transferPrivacyOwnership(vars: TransferPrivacyOwnershipVariables): MutationPromise<TransferPrivacyOwnershipData, TransferPrivacyOwnershipVariables>;

interface TransferPrivacyOwnershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: TransferPrivacyOwnershipVariables): MutationRef<TransferPrivacyOwnershipData, TransferPrivacyOwnershipVariables>;
}
export const transferPrivacyOwnershipRef: TransferPrivacyOwnershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
transferPrivacyOwnership(dc: DataConnect, vars: TransferPrivacyOwnershipVariables): MutationPromise<TransferPrivacyOwnershipData, TransferPrivacyOwnershipVariables>;

interface TransferPrivacyOwnershipRef {
  ...
  (dc: DataConnect, vars: TransferPrivacyOwnershipVariables): MutationRef<TransferPrivacyOwnershipData, TransferPrivacyOwnershipVariables>;
}
export const transferPrivacyOwnershipRef: TransferPrivacyOwnershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the transferPrivacyOwnershipRef:
```typescript
const name = transferPrivacyOwnershipRef.operationName;
console.log(name);
```

### Variables
The `TransferPrivacyOwnership` mutation requires an argument of type `TransferPrivacyOwnershipVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface TransferPrivacyOwnershipVariables {
  privacyId: UUIDString;
}
```
### Return Type
Recall that executing the `TransferPrivacyOwnership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `TransferPrivacyOwnershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface TransferPrivacyOwnershipData {
  privacySettings_update?: PrivacySettings_Key | null;
}
```
### Using `TransferPrivacyOwnership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, transferPrivacyOwnership, TransferPrivacyOwnershipVariables } from '@dataconnect/admin-generated';

// The `TransferPrivacyOwnership` mutation requires an argument of type `TransferPrivacyOwnershipVariables`:
const transferPrivacyOwnershipVars: TransferPrivacyOwnershipVariables = {
  privacyId: ..., 
};

// Call the `transferPrivacyOwnership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await transferPrivacyOwnership(transferPrivacyOwnershipVars);
// Variables can be defined inline as well.
const { data } = await transferPrivacyOwnership({ privacyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await transferPrivacyOwnership(dataConnect, transferPrivacyOwnershipVars);

console.log(data.privacySettings_update);

// Or, you can use the `Promise` API.
transferPrivacyOwnership(transferPrivacyOwnershipVars).then((response) => {
  const data = response.data;
  console.log(data.privacySettings_update);
});
```

### Using `TransferPrivacyOwnership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, transferPrivacyOwnershipRef, TransferPrivacyOwnershipVariables } from '@dataconnect/admin-generated';

// The `TransferPrivacyOwnership` mutation requires an argument of type `TransferPrivacyOwnershipVariables`:
const transferPrivacyOwnershipVars: TransferPrivacyOwnershipVariables = {
  privacyId: ..., 
};

// Call the `transferPrivacyOwnershipRef()` function to get a reference to the mutation.
const ref = transferPrivacyOwnershipRef(transferPrivacyOwnershipVars);
// Variables can be defined inline as well.
const ref = transferPrivacyOwnershipRef({ privacyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = transferPrivacyOwnershipRef(dataConnect, transferPrivacyOwnershipVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.privacySettings_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.privacySettings_update);
});
```

## MarkPrivacyPublished
You can execute the `MarkPrivacyPublished` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
markPrivacyPublished(vars: MarkPrivacyPublishedVariables): MutationPromise<MarkPrivacyPublishedData, MarkPrivacyPublishedVariables>;

interface MarkPrivacyPublishedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkPrivacyPublishedVariables): MutationRef<MarkPrivacyPublishedData, MarkPrivacyPublishedVariables>;
}
export const markPrivacyPublishedRef: MarkPrivacyPublishedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markPrivacyPublished(dc: DataConnect, vars: MarkPrivacyPublishedVariables): MutationPromise<MarkPrivacyPublishedData, MarkPrivacyPublishedVariables>;

interface MarkPrivacyPublishedRef {
  ...
  (dc: DataConnect, vars: MarkPrivacyPublishedVariables): MutationRef<MarkPrivacyPublishedData, MarkPrivacyPublishedVariables>;
}
export const markPrivacyPublishedRef: MarkPrivacyPublishedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markPrivacyPublishedRef:
```typescript
const name = markPrivacyPublishedRef.operationName;
console.log(name);
```

### Variables
The `MarkPrivacyPublished` mutation requires an argument of type `MarkPrivacyPublishedVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkPrivacyPublishedVariables {
  privacyId: UUIDString;
}
```
### Return Type
Recall that executing the `MarkPrivacyPublished` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkPrivacyPublishedData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkPrivacyPublishedData {
  privacySettings_update?: PrivacySettings_Key | null;
}
```
### Using `MarkPrivacyPublished`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markPrivacyPublished, MarkPrivacyPublishedVariables } from '@dataconnect/admin-generated';

// The `MarkPrivacyPublished` mutation requires an argument of type `MarkPrivacyPublishedVariables`:
const markPrivacyPublishedVars: MarkPrivacyPublishedVariables = {
  privacyId: ..., 
};

// Call the `markPrivacyPublished()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markPrivacyPublished(markPrivacyPublishedVars);
// Variables can be defined inline as well.
const { data } = await markPrivacyPublished({ privacyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markPrivacyPublished(dataConnect, markPrivacyPublishedVars);

console.log(data.privacySettings_update);

// Or, you can use the `Promise` API.
markPrivacyPublished(markPrivacyPublishedVars).then((response) => {
  const data = response.data;
  console.log(data.privacySettings_update);
});
```

### Using `MarkPrivacyPublished`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markPrivacyPublishedRef, MarkPrivacyPublishedVariables } from '@dataconnect/admin-generated';

// The `MarkPrivacyPublished` mutation requires an argument of type `MarkPrivacyPublishedVariables`:
const markPrivacyPublishedVars: MarkPrivacyPublishedVariables = {
  privacyId: ..., 
};

// Call the `markPrivacyPublishedRef()` function to get a reference to the mutation.
const ref = markPrivacyPublishedRef(markPrivacyPublishedVars);
// Variables can be defined inline as well.
const ref = markPrivacyPublishedRef({ privacyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markPrivacyPublishedRef(dataConnect, markPrivacyPublishedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.privacySettings_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.privacySettings_update);
});
```

## CreatePublicProfile
You can execute the `CreatePublicProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPublicProfile(vars: CreatePublicProfileVariables): MutationPromise<CreatePublicProfileData, CreatePublicProfileVariables>;

interface CreatePublicProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePublicProfileVariables): MutationRef<CreatePublicProfileData, CreatePublicProfileVariables>;
}
export const createPublicProfileRef: CreatePublicProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPublicProfile(dc: DataConnect, vars: CreatePublicProfileVariables): MutationPromise<CreatePublicProfileData, CreatePublicProfileVariables>;

interface CreatePublicProfileRef {
  ...
  (dc: DataConnect, vars: CreatePublicProfileVariables): MutationRef<CreatePublicProfileData, CreatePublicProfileVariables>;
}
export const createPublicProfileRef: CreatePublicProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPublicProfileRef:
```typescript
const name = createPublicProfileRef.operationName;
console.log(name);
```

### Variables
The `CreatePublicProfile` mutation requires an argument of type `CreatePublicProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePublicProfileVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  slug: string;
}
```
### Return Type
Recall that executing the `CreatePublicProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePublicProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePublicProfileData {
  publicProfile_insert: PublicProfile_Key;
}
```
### Using `CreatePublicProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPublicProfile, CreatePublicProfileVariables } from '@dataconnect/admin-generated';

// The `CreatePublicProfile` mutation requires an argument of type `CreatePublicProfileVariables`:
const createPublicProfileVars: CreatePublicProfileVariables = {
  employeeId: ..., 
  companyId: ..., 
  slug: ..., 
};

// Call the `createPublicProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPublicProfile(createPublicProfileVars);
// Variables can be defined inline as well.
const { data } = await createPublicProfile({ employeeId: ..., companyId: ..., slug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPublicProfile(dataConnect, createPublicProfileVars);

console.log(data.publicProfile_insert);

// Or, you can use the `Promise` API.
createPublicProfile(createPublicProfileVars).then((response) => {
  const data = response.data;
  console.log(data.publicProfile_insert);
});
```

### Using `CreatePublicProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPublicProfileRef, CreatePublicProfileVariables } from '@dataconnect/admin-generated';

// The `CreatePublicProfile` mutation requires an argument of type `CreatePublicProfileVariables`:
const createPublicProfileVars: CreatePublicProfileVariables = {
  employeeId: ..., 
  companyId: ..., 
  slug: ..., 
};

// Call the `createPublicProfileRef()` function to get a reference to the mutation.
const ref = createPublicProfileRef(createPublicProfileVars);
// Variables can be defined inline as well.
const ref = createPublicProfileRef({ employeeId: ..., companyId: ..., slug: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPublicProfileRef(dataConnect, createPublicProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.publicProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.publicProfile_insert);
});
```

## UpdatePublicProfileVisibility
You can execute the `UpdatePublicProfileVisibility` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePublicProfileVisibility(vars: UpdatePublicProfileVisibilityVariables): MutationPromise<UpdatePublicProfileVisibilityData, UpdatePublicProfileVisibilityVariables>;

interface UpdatePublicProfileVisibilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePublicProfileVisibilityVariables): MutationRef<UpdatePublicProfileVisibilityData, UpdatePublicProfileVisibilityVariables>;
}
export const updatePublicProfileVisibilityRef: UpdatePublicProfileVisibilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePublicProfileVisibility(dc: DataConnect, vars: UpdatePublicProfileVisibilityVariables): MutationPromise<UpdatePublicProfileVisibilityData, UpdatePublicProfileVisibilityVariables>;

interface UpdatePublicProfileVisibilityRef {
  ...
  (dc: DataConnect, vars: UpdatePublicProfileVisibilityVariables): MutationRef<UpdatePublicProfileVisibilityData, UpdatePublicProfileVisibilityVariables>;
}
export const updatePublicProfileVisibilityRef: UpdatePublicProfileVisibilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePublicProfileVisibilityRef:
```typescript
const name = updatePublicProfileVisibilityRef.operationName;
console.log(name);
```

### Variables
The `UpdatePublicProfileVisibility` mutation requires an argument of type `UpdatePublicProfileVisibilityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePublicProfileVisibilityVariables {
  profileId: UUIDString;
  isPublic: boolean;
}
```
### Return Type
Recall that executing the `UpdatePublicProfileVisibility` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePublicProfileVisibilityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePublicProfileVisibilityData {
  publicProfile_update?: PublicProfile_Key | null;
}
```
### Using `UpdatePublicProfileVisibility`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePublicProfileVisibility, UpdatePublicProfileVisibilityVariables } from '@dataconnect/admin-generated';

// The `UpdatePublicProfileVisibility` mutation requires an argument of type `UpdatePublicProfileVisibilityVariables`:
const updatePublicProfileVisibilityVars: UpdatePublicProfileVisibilityVariables = {
  profileId: ..., 
  isPublic: ..., 
};

// Call the `updatePublicProfileVisibility()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePublicProfileVisibility(updatePublicProfileVisibilityVars);
// Variables can be defined inline as well.
const { data } = await updatePublicProfileVisibility({ profileId: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePublicProfileVisibility(dataConnect, updatePublicProfileVisibilityVars);

console.log(data.publicProfile_update);

// Or, you can use the `Promise` API.
updatePublicProfileVisibility(updatePublicProfileVisibilityVars).then((response) => {
  const data = response.data;
  console.log(data.publicProfile_update);
});
```

### Using `UpdatePublicProfileVisibility`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePublicProfileVisibilityRef, UpdatePublicProfileVisibilityVariables } from '@dataconnect/admin-generated';

// The `UpdatePublicProfileVisibility` mutation requires an argument of type `UpdatePublicProfileVisibilityVariables`:
const updatePublicProfileVisibilityVars: UpdatePublicProfileVisibilityVariables = {
  profileId: ..., 
  isPublic: ..., 
};

// Call the `updatePublicProfileVisibilityRef()` function to get a reference to the mutation.
const ref = updatePublicProfileVisibilityRef(updatePublicProfileVisibilityVars);
// Variables can be defined inline as well.
const ref = updatePublicProfileVisibilityRef({ profileId: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePublicProfileVisibilityRef(dataConnect, updatePublicProfileVisibilityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.publicProfile_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.publicProfile_update);
});
```

## IncrementPublicProfileViews
You can execute the `IncrementPublicProfileViews` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
incrementPublicProfileViews(vars: IncrementPublicProfileViewsVariables): MutationPromise<IncrementPublicProfileViewsData, IncrementPublicProfileViewsVariables>;

interface IncrementPublicProfileViewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: IncrementPublicProfileViewsVariables): MutationRef<IncrementPublicProfileViewsData, IncrementPublicProfileViewsVariables>;
}
export const incrementPublicProfileViewsRef: IncrementPublicProfileViewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
incrementPublicProfileViews(dc: DataConnect, vars: IncrementPublicProfileViewsVariables): MutationPromise<IncrementPublicProfileViewsData, IncrementPublicProfileViewsVariables>;

interface IncrementPublicProfileViewsRef {
  ...
  (dc: DataConnect, vars: IncrementPublicProfileViewsVariables): MutationRef<IncrementPublicProfileViewsData, IncrementPublicProfileViewsVariables>;
}
export const incrementPublicProfileViewsRef: IncrementPublicProfileViewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the incrementPublicProfileViewsRef:
```typescript
const name = incrementPublicProfileViewsRef.operationName;
console.log(name);
```

### Variables
The `IncrementPublicProfileViews` mutation requires an argument of type `IncrementPublicProfileViewsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface IncrementPublicProfileViewsVariables {
  profileId: UUIDString;
  viewCount: number;
}
```
### Return Type
Recall that executing the `IncrementPublicProfileViews` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `IncrementPublicProfileViewsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface IncrementPublicProfileViewsData {
  publicProfile_update?: PublicProfile_Key | null;
}
```
### Using `IncrementPublicProfileViews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, incrementPublicProfileViews, IncrementPublicProfileViewsVariables } from '@dataconnect/admin-generated';

// The `IncrementPublicProfileViews` mutation requires an argument of type `IncrementPublicProfileViewsVariables`:
const incrementPublicProfileViewsVars: IncrementPublicProfileViewsVariables = {
  profileId: ..., 
  viewCount: ..., 
};

// Call the `incrementPublicProfileViews()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await incrementPublicProfileViews(incrementPublicProfileViewsVars);
// Variables can be defined inline as well.
const { data } = await incrementPublicProfileViews({ profileId: ..., viewCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await incrementPublicProfileViews(dataConnect, incrementPublicProfileViewsVars);

console.log(data.publicProfile_update);

// Or, you can use the `Promise` API.
incrementPublicProfileViews(incrementPublicProfileViewsVars).then((response) => {
  const data = response.data;
  console.log(data.publicProfile_update);
});
```

### Using `IncrementPublicProfileViews`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, incrementPublicProfileViewsRef, IncrementPublicProfileViewsVariables } from '@dataconnect/admin-generated';

// The `IncrementPublicProfileViews` mutation requires an argument of type `IncrementPublicProfileViewsVariables`:
const incrementPublicProfileViewsVars: IncrementPublicProfileViewsVariables = {
  profileId: ..., 
  viewCount: ..., 
};

// Call the `incrementPublicProfileViewsRef()` function to get a reference to the mutation.
const ref = incrementPublicProfileViewsRef(incrementPublicProfileViewsVars);
// Variables can be defined inline as well.
const ref = incrementPublicProfileViewsRef({ profileId: ..., viewCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = incrementPublicProfileViewsRef(dataConnect, incrementPublicProfileViewsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.publicProfile_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.publicProfile_update);
});
```

## CreateVerificationCorrection
You can execute the `CreateVerificationCorrection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createVerificationCorrection(vars: CreateVerificationCorrectionVariables): MutationPromise<CreateVerificationCorrectionData, CreateVerificationCorrectionVariables>;

interface CreateVerificationCorrectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateVerificationCorrectionVariables): MutationRef<CreateVerificationCorrectionData, CreateVerificationCorrectionVariables>;
}
export const createVerificationCorrectionRef: CreateVerificationCorrectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createVerificationCorrection(dc: DataConnect, vars: CreateVerificationCorrectionVariables): MutationPromise<CreateVerificationCorrectionData, CreateVerificationCorrectionVariables>;

interface CreateVerificationCorrectionRef {
  ...
  (dc: DataConnect, vars: CreateVerificationCorrectionVariables): MutationRef<CreateVerificationCorrectionData, CreateVerificationCorrectionVariables>;
}
export const createVerificationCorrectionRef: CreateVerificationCorrectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createVerificationCorrectionRef:
```typescript
const name = createVerificationCorrectionRef.operationName;
console.log(name);
```

### Variables
The `CreateVerificationCorrection` mutation requires an argument of type `CreateVerificationCorrectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateVerificationCorrectionVariables {
  employeeId: UUIDString;
  companyId: UUIDString;
  fieldName: string;
  oldValue?: string | null;
  newValue?: string | null;
  reason?: string | null;
  requestedBy?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateVerificationCorrection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateVerificationCorrectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateVerificationCorrectionData {
  verificationCorrection_insert: VerificationCorrection_Key;
}
```
### Using `CreateVerificationCorrection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createVerificationCorrection, CreateVerificationCorrectionVariables } from '@dataconnect/admin-generated';

// The `CreateVerificationCorrection` mutation requires an argument of type `CreateVerificationCorrectionVariables`:
const createVerificationCorrectionVars: CreateVerificationCorrectionVariables = {
  employeeId: ..., 
  companyId: ..., 
  fieldName: ..., 
  oldValue: ..., // optional
  newValue: ..., // optional
  reason: ..., // optional
  requestedBy: ..., // optional
};

// Call the `createVerificationCorrection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createVerificationCorrection(createVerificationCorrectionVars);
// Variables can be defined inline as well.
const { data } = await createVerificationCorrection({ employeeId: ..., companyId: ..., fieldName: ..., oldValue: ..., newValue: ..., reason: ..., requestedBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createVerificationCorrection(dataConnect, createVerificationCorrectionVars);

console.log(data.verificationCorrection_insert);

// Or, you can use the `Promise` API.
createVerificationCorrection(createVerificationCorrectionVars).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrection_insert);
});
```

### Using `CreateVerificationCorrection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createVerificationCorrectionRef, CreateVerificationCorrectionVariables } from '@dataconnect/admin-generated';

// The `CreateVerificationCorrection` mutation requires an argument of type `CreateVerificationCorrectionVariables`:
const createVerificationCorrectionVars: CreateVerificationCorrectionVariables = {
  employeeId: ..., 
  companyId: ..., 
  fieldName: ..., 
  oldValue: ..., // optional
  newValue: ..., // optional
  reason: ..., // optional
  requestedBy: ..., // optional
};

// Call the `createVerificationCorrectionRef()` function to get a reference to the mutation.
const ref = createVerificationCorrectionRef(createVerificationCorrectionVars);
// Variables can be defined inline as well.
const ref = createVerificationCorrectionRef({ employeeId: ..., companyId: ..., fieldName: ..., oldValue: ..., newValue: ..., reason: ..., requestedBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createVerificationCorrectionRef(dataConnect, createVerificationCorrectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.verificationCorrection_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrection_insert);
});
```

## UpdateVerificationCorrectionStatus
You can execute the `UpdateVerificationCorrectionStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVerificationCorrectionStatus(vars: UpdateVerificationCorrectionStatusVariables): MutationPromise<UpdateVerificationCorrectionStatusData, UpdateVerificationCorrectionStatusVariables>;

interface UpdateVerificationCorrectionStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVerificationCorrectionStatusVariables): MutationRef<UpdateVerificationCorrectionStatusData, UpdateVerificationCorrectionStatusVariables>;
}
export const updateVerificationCorrectionStatusRef: UpdateVerificationCorrectionStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVerificationCorrectionStatus(dc: DataConnect, vars: UpdateVerificationCorrectionStatusVariables): MutationPromise<UpdateVerificationCorrectionStatusData, UpdateVerificationCorrectionStatusVariables>;

interface UpdateVerificationCorrectionStatusRef {
  ...
  (dc: DataConnect, vars: UpdateVerificationCorrectionStatusVariables): MutationRef<UpdateVerificationCorrectionStatusData, UpdateVerificationCorrectionStatusVariables>;
}
export const updateVerificationCorrectionStatusRef: UpdateVerificationCorrectionStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVerificationCorrectionStatusRef:
```typescript
const name = updateVerificationCorrectionStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateVerificationCorrectionStatus` mutation requires an argument of type `UpdateVerificationCorrectionStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateVerificationCorrectionStatusVariables {
  id: UUIDString;
  status: string;
  reviewedBy: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateVerificationCorrectionStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVerificationCorrectionStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVerificationCorrectionStatusData {
  verificationCorrection_update?: VerificationCorrection_Key | null;
}
```
### Using `UpdateVerificationCorrectionStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVerificationCorrectionStatus, UpdateVerificationCorrectionStatusVariables } from '@dataconnect/admin-generated';

// The `UpdateVerificationCorrectionStatus` mutation requires an argument of type `UpdateVerificationCorrectionStatusVariables`:
const updateVerificationCorrectionStatusVars: UpdateVerificationCorrectionStatusVariables = {
  id: ..., 
  status: ..., 
  reviewedBy: ..., 
};

// Call the `updateVerificationCorrectionStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVerificationCorrectionStatus(updateVerificationCorrectionStatusVars);
// Variables can be defined inline as well.
const { data } = await updateVerificationCorrectionStatus({ id: ..., status: ..., reviewedBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVerificationCorrectionStatus(dataConnect, updateVerificationCorrectionStatusVars);

console.log(data.verificationCorrection_update);

// Or, you can use the `Promise` API.
updateVerificationCorrectionStatus(updateVerificationCorrectionStatusVars).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrection_update);
});
```

### Using `UpdateVerificationCorrectionStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVerificationCorrectionStatusRef, UpdateVerificationCorrectionStatusVariables } from '@dataconnect/admin-generated';

// The `UpdateVerificationCorrectionStatus` mutation requires an argument of type `UpdateVerificationCorrectionStatusVariables`:
const updateVerificationCorrectionStatusVars: UpdateVerificationCorrectionStatusVariables = {
  id: ..., 
  status: ..., 
  reviewedBy: ..., 
};

// Call the `updateVerificationCorrectionStatusRef()` function to get a reference to the mutation.
const ref = updateVerificationCorrectionStatusRef(updateVerificationCorrectionStatusVars);
// Variables can be defined inline as well.
const ref = updateVerificationCorrectionStatusRef({ id: ..., status: ..., reviewedBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVerificationCorrectionStatusRef(dataConnect, updateVerificationCorrectionStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.verificationCorrection_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.verificationCorrection_update);
});
```

## CreateJobOpportunity
You can execute the `CreateJobOpportunity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createJobOpportunity(vars: CreateJobOpportunityVariables): MutationPromise<CreateJobOpportunityData, CreateJobOpportunityVariables>;

interface CreateJobOpportunityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJobOpportunityVariables): MutationRef<CreateJobOpportunityData, CreateJobOpportunityVariables>;
}
export const createJobOpportunityRef: CreateJobOpportunityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createJobOpportunity(dc: DataConnect, vars: CreateJobOpportunityVariables): MutationPromise<CreateJobOpportunityData, CreateJobOpportunityVariables>;

interface CreateJobOpportunityRef {
  ...
  (dc: DataConnect, vars: CreateJobOpportunityVariables): MutationRef<CreateJobOpportunityData, CreateJobOpportunityVariables>;
}
export const createJobOpportunityRef: CreateJobOpportunityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createJobOpportunityRef:
```typescript
const name = createJobOpportunityRef.operationName;
console.log(name);
```

### Variables
The `CreateJobOpportunity` mutation requires an argument of type `CreateJobOpportunityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateJobOpportunityVariables {
  recruiterId: UUIDString;
  employeeId: UUIDString;
  title: string;
  companyName: string;
  description?: string | null;
  message?: string | null;
  salaryRange?: string | null;
  location?: string | null;
}
```
### Return Type
Recall that executing the `CreateJobOpportunity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateJobOpportunityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateJobOpportunityData {
  jobOpportunity_insert: JobOpportunity_Key;
}
```
### Using `CreateJobOpportunity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createJobOpportunity, CreateJobOpportunityVariables } from '@dataconnect/admin-generated';

// The `CreateJobOpportunity` mutation requires an argument of type `CreateJobOpportunityVariables`:
const createJobOpportunityVars: CreateJobOpportunityVariables = {
  recruiterId: ..., 
  employeeId: ..., 
  title: ..., 
  companyName: ..., 
  description: ..., // optional
  message: ..., // optional
  salaryRange: ..., // optional
  location: ..., // optional
};

// Call the `createJobOpportunity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createJobOpportunity(createJobOpportunityVars);
// Variables can be defined inline as well.
const { data } = await createJobOpportunity({ recruiterId: ..., employeeId: ..., title: ..., companyName: ..., description: ..., message: ..., salaryRange: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createJobOpportunity(dataConnect, createJobOpportunityVars);

console.log(data.jobOpportunity_insert);

// Or, you can use the `Promise` API.
createJobOpportunity(createJobOpportunityVars).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunity_insert);
});
```

### Using `CreateJobOpportunity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createJobOpportunityRef, CreateJobOpportunityVariables } from '@dataconnect/admin-generated';

// The `CreateJobOpportunity` mutation requires an argument of type `CreateJobOpportunityVariables`:
const createJobOpportunityVars: CreateJobOpportunityVariables = {
  recruiterId: ..., 
  employeeId: ..., 
  title: ..., 
  companyName: ..., 
  description: ..., // optional
  message: ..., // optional
  salaryRange: ..., // optional
  location: ..., // optional
};

// Call the `createJobOpportunityRef()` function to get a reference to the mutation.
const ref = createJobOpportunityRef(createJobOpportunityVars);
// Variables can be defined inline as well.
const ref = createJobOpportunityRef({ recruiterId: ..., employeeId: ..., title: ..., companyName: ..., description: ..., message: ..., salaryRange: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createJobOpportunityRef(dataConnect, createJobOpportunityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jobOpportunity_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunity_insert);
});
```

## UpdateJobOpportunityStatus
You can execute the `UpdateJobOpportunityStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateJobOpportunityStatus(vars: UpdateJobOpportunityStatusVariables): MutationPromise<UpdateJobOpportunityStatusData, UpdateJobOpportunityStatusVariables>;

interface UpdateJobOpportunityStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateJobOpportunityStatusVariables): MutationRef<UpdateJobOpportunityStatusData, UpdateJobOpportunityStatusVariables>;
}
export const updateJobOpportunityStatusRef: UpdateJobOpportunityStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateJobOpportunityStatus(dc: DataConnect, vars: UpdateJobOpportunityStatusVariables): MutationPromise<UpdateJobOpportunityStatusData, UpdateJobOpportunityStatusVariables>;

interface UpdateJobOpportunityStatusRef {
  ...
  (dc: DataConnect, vars: UpdateJobOpportunityStatusVariables): MutationRef<UpdateJobOpportunityStatusData, UpdateJobOpportunityStatusVariables>;
}
export const updateJobOpportunityStatusRef: UpdateJobOpportunityStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateJobOpportunityStatusRef:
```typescript
const name = updateJobOpportunityStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateJobOpportunityStatus` mutation requires an argument of type `UpdateJobOpportunityStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateJobOpportunityStatusVariables {
  id: UUIDString;
  status: string;
  viewedAt?: TimestampString | null;
  respondedAt?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateJobOpportunityStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateJobOpportunityStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateJobOpportunityStatusData {
  jobOpportunity_update?: JobOpportunity_Key | null;
}
```
### Using `UpdateJobOpportunityStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateJobOpportunityStatus, UpdateJobOpportunityStatusVariables } from '@dataconnect/admin-generated';

// The `UpdateJobOpportunityStatus` mutation requires an argument of type `UpdateJobOpportunityStatusVariables`:
const updateJobOpportunityStatusVars: UpdateJobOpportunityStatusVariables = {
  id: ..., 
  status: ..., 
  viewedAt: ..., // optional
  respondedAt: ..., // optional
};

// Call the `updateJobOpportunityStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateJobOpportunityStatus(updateJobOpportunityStatusVars);
// Variables can be defined inline as well.
const { data } = await updateJobOpportunityStatus({ id: ..., status: ..., viewedAt: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateJobOpportunityStatus(dataConnect, updateJobOpportunityStatusVars);

console.log(data.jobOpportunity_update);

// Or, you can use the `Promise` API.
updateJobOpportunityStatus(updateJobOpportunityStatusVars).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunity_update);
});
```

### Using `UpdateJobOpportunityStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateJobOpportunityStatusRef, UpdateJobOpportunityStatusVariables } from '@dataconnect/admin-generated';

// The `UpdateJobOpportunityStatus` mutation requires an argument of type `UpdateJobOpportunityStatusVariables`:
const updateJobOpportunityStatusVars: UpdateJobOpportunityStatusVariables = {
  id: ..., 
  status: ..., 
  viewedAt: ..., // optional
  respondedAt: ..., // optional
};

// Call the `updateJobOpportunityStatusRef()` function to get a reference to the mutation.
const ref = updateJobOpportunityStatusRef(updateJobOpportunityStatusVars);
// Variables can be defined inline as well.
const ref = updateJobOpportunityStatusRef({ id: ..., status: ..., viewedAt: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateJobOpportunityStatusRef(dataConnect, updateJobOpportunityStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jobOpportunity_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpportunity_update);
});
```

## CreateEmploymentLink
You can execute the `CreateEmploymentLink` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEmploymentLink(vars: CreateEmploymentLinkVariables): MutationPromise<CreateEmploymentLinkData, CreateEmploymentLinkVariables>;

interface CreateEmploymentLinkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEmploymentLinkVariables): MutationRef<CreateEmploymentLinkData, CreateEmploymentLinkVariables>;
}
export const createEmploymentLinkRef: CreateEmploymentLinkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEmploymentLink(dc: DataConnect, vars: CreateEmploymentLinkVariables): MutationPromise<CreateEmploymentLinkData, CreateEmploymentLinkVariables>;

interface CreateEmploymentLinkRef {
  ...
  (dc: DataConnect, vars: CreateEmploymentLinkVariables): MutationRef<CreateEmploymentLinkData, CreateEmploymentLinkVariables>;
}
export const createEmploymentLinkRef: CreateEmploymentLinkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEmploymentLinkRef:
```typescript
const name = createEmploymentLinkRef.operationName;
console.log(name);
```

### Variables
The `CreateEmploymentLink` mutation requires an argument of type `CreateEmploymentLinkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEmploymentLinkVariables {
  personEmail: string;
  userId?: UUIDString | null;
  employeeId: UUIDString;
  companyId: UUIDString;
  jobTitle?: string | null;
  department?: string | null;
  startedAt?: DateString | null;
  source?: string | null;
}
```
### Return Type
Recall that executing the `CreateEmploymentLink` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEmploymentLinkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEmploymentLinkData {
  employmentLink_insert: EmploymentLink_Key;
}
```
### Using `CreateEmploymentLink`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEmploymentLink, CreateEmploymentLinkVariables } from '@dataconnect/admin-generated';

// The `CreateEmploymentLink` mutation requires an argument of type `CreateEmploymentLinkVariables`:
const createEmploymentLinkVars: CreateEmploymentLinkVariables = {
  personEmail: ..., 
  userId: ..., // optional
  employeeId: ..., 
  companyId: ..., 
  jobTitle: ..., // optional
  department: ..., // optional
  startedAt: ..., // optional
  source: ..., // optional
};

// Call the `createEmploymentLink()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEmploymentLink(createEmploymentLinkVars);
// Variables can be defined inline as well.
const { data } = await createEmploymentLink({ personEmail: ..., userId: ..., employeeId: ..., companyId: ..., jobTitle: ..., department: ..., startedAt: ..., source: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEmploymentLink(dataConnect, createEmploymentLinkVars);

console.log(data.employmentLink_insert);

// Or, you can use the `Promise` API.
createEmploymentLink(createEmploymentLinkVars).then((response) => {
  const data = response.data;
  console.log(data.employmentLink_insert);
});
```

### Using `CreateEmploymentLink`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEmploymentLinkRef, CreateEmploymentLinkVariables } from '@dataconnect/admin-generated';

// The `CreateEmploymentLink` mutation requires an argument of type `CreateEmploymentLinkVariables`:
const createEmploymentLinkVars: CreateEmploymentLinkVariables = {
  personEmail: ..., 
  userId: ..., // optional
  employeeId: ..., 
  companyId: ..., 
  jobTitle: ..., // optional
  department: ..., // optional
  startedAt: ..., // optional
  source: ..., // optional
};

// Call the `createEmploymentLinkRef()` function to get a reference to the mutation.
const ref = createEmploymentLinkRef(createEmploymentLinkVars);
// Variables can be defined inline as well.
const ref = createEmploymentLinkRef({ personEmail: ..., userId: ..., employeeId: ..., companyId: ..., jobTitle: ..., department: ..., startedAt: ..., source: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEmploymentLinkRef(dataConnect, createEmploymentLinkVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employmentLink_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employmentLink_insert);
});
```

## MarkEmploymentLinkLeft
You can execute the `MarkEmploymentLinkLeft` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
markEmploymentLinkLeft(vars: MarkEmploymentLinkLeftVariables): MutationPromise<MarkEmploymentLinkLeftData, MarkEmploymentLinkLeftVariables>;

interface MarkEmploymentLinkLeftRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkEmploymentLinkLeftVariables): MutationRef<MarkEmploymentLinkLeftData, MarkEmploymentLinkLeftVariables>;
}
export const markEmploymentLinkLeftRef: MarkEmploymentLinkLeftRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markEmploymentLinkLeft(dc: DataConnect, vars: MarkEmploymentLinkLeftVariables): MutationPromise<MarkEmploymentLinkLeftData, MarkEmploymentLinkLeftVariables>;

interface MarkEmploymentLinkLeftRef {
  ...
  (dc: DataConnect, vars: MarkEmploymentLinkLeftVariables): MutationRef<MarkEmploymentLinkLeftData, MarkEmploymentLinkLeftVariables>;
}
export const markEmploymentLinkLeftRef: MarkEmploymentLinkLeftRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markEmploymentLinkLeftRef:
```typescript
const name = markEmploymentLinkLeftRef.operationName;
console.log(name);
```

### Variables
The `MarkEmploymentLinkLeft` mutation requires an argument of type `MarkEmploymentLinkLeftVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkEmploymentLinkLeftVariables {
  linkId: UUIDString;
  leftAt: DateString;
}
```
### Return Type
Recall that executing the `MarkEmploymentLinkLeft` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkEmploymentLinkLeftData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkEmploymentLinkLeftData {
  employmentLink_update?: EmploymentLink_Key | null;
}
```
### Using `MarkEmploymentLinkLeft`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markEmploymentLinkLeft, MarkEmploymentLinkLeftVariables } from '@dataconnect/admin-generated';

// The `MarkEmploymentLinkLeft` mutation requires an argument of type `MarkEmploymentLinkLeftVariables`:
const markEmploymentLinkLeftVars: MarkEmploymentLinkLeftVariables = {
  linkId: ..., 
  leftAt: ..., 
};

// Call the `markEmploymentLinkLeft()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markEmploymentLinkLeft(markEmploymentLinkLeftVars);
// Variables can be defined inline as well.
const { data } = await markEmploymentLinkLeft({ linkId: ..., leftAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markEmploymentLinkLeft(dataConnect, markEmploymentLinkLeftVars);

console.log(data.employmentLink_update);

// Or, you can use the `Promise` API.
markEmploymentLinkLeft(markEmploymentLinkLeftVars).then((response) => {
  const data = response.data;
  console.log(data.employmentLink_update);
});
```

### Using `MarkEmploymentLinkLeft`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markEmploymentLinkLeftRef, MarkEmploymentLinkLeftVariables } from '@dataconnect/admin-generated';

// The `MarkEmploymentLinkLeft` mutation requires an argument of type `MarkEmploymentLinkLeftVariables`:
const markEmploymentLinkLeftVars: MarkEmploymentLinkLeftVariables = {
  linkId: ..., 
  leftAt: ..., 
};

// Call the `markEmploymentLinkLeftRef()` function to get a reference to the mutation.
const ref = markEmploymentLinkLeftRef(markEmploymentLinkLeftVars);
// Variables can be defined inline as well.
const ref = markEmploymentLinkLeftRef({ linkId: ..., leftAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markEmploymentLinkLeftRef(dataConnect, markEmploymentLinkLeftVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employmentLink_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employmentLink_update);
});
```

## AttachUserToEmploymentLinks
You can execute the `AttachUserToEmploymentLinks` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
attachUserToEmploymentLinks(vars: AttachUserToEmploymentLinksVariables): MutationPromise<AttachUserToEmploymentLinksData, AttachUserToEmploymentLinksVariables>;

interface AttachUserToEmploymentLinksRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AttachUserToEmploymentLinksVariables): MutationRef<AttachUserToEmploymentLinksData, AttachUserToEmploymentLinksVariables>;
}
export const attachUserToEmploymentLinksRef: AttachUserToEmploymentLinksRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
attachUserToEmploymentLinks(dc: DataConnect, vars: AttachUserToEmploymentLinksVariables): MutationPromise<AttachUserToEmploymentLinksData, AttachUserToEmploymentLinksVariables>;

interface AttachUserToEmploymentLinksRef {
  ...
  (dc: DataConnect, vars: AttachUserToEmploymentLinksVariables): MutationRef<AttachUserToEmploymentLinksData, AttachUserToEmploymentLinksVariables>;
}
export const attachUserToEmploymentLinksRef: AttachUserToEmploymentLinksRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the attachUserToEmploymentLinksRef:
```typescript
const name = attachUserToEmploymentLinksRef.operationName;
console.log(name);
```

### Variables
The `AttachUserToEmploymentLinks` mutation requires an argument of type `AttachUserToEmploymentLinksVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AttachUserToEmploymentLinksVariables {
  personEmail: string;
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `AttachUserToEmploymentLinks` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AttachUserToEmploymentLinksData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AttachUserToEmploymentLinksData {
  employmentLink_updateMany: number;
}
```
### Using `AttachUserToEmploymentLinks`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, attachUserToEmploymentLinks, AttachUserToEmploymentLinksVariables } from '@dataconnect/admin-generated';

// The `AttachUserToEmploymentLinks` mutation requires an argument of type `AttachUserToEmploymentLinksVariables`:
const attachUserToEmploymentLinksVars: AttachUserToEmploymentLinksVariables = {
  personEmail: ..., 
  userId: ..., 
};

// Call the `attachUserToEmploymentLinks()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await attachUserToEmploymentLinks(attachUserToEmploymentLinksVars);
// Variables can be defined inline as well.
const { data } = await attachUserToEmploymentLinks({ personEmail: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await attachUserToEmploymentLinks(dataConnect, attachUserToEmploymentLinksVars);

console.log(data.employmentLink_updateMany);

// Or, you can use the `Promise` API.
attachUserToEmploymentLinks(attachUserToEmploymentLinksVars).then((response) => {
  const data = response.data;
  console.log(data.employmentLink_updateMany);
});
```

### Using `AttachUserToEmploymentLinks`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, attachUserToEmploymentLinksRef, AttachUserToEmploymentLinksVariables } from '@dataconnect/admin-generated';

// The `AttachUserToEmploymentLinks` mutation requires an argument of type `AttachUserToEmploymentLinksVariables`:
const attachUserToEmploymentLinksVars: AttachUserToEmploymentLinksVariables = {
  personEmail: ..., 
  userId: ..., 
};

// Call the `attachUserToEmploymentLinksRef()` function to get a reference to the mutation.
const ref = attachUserToEmploymentLinksRef(attachUserToEmploymentLinksVars);
// Variables can be defined inline as well.
const ref = attachUserToEmploymentLinksRef({ personEmail: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = attachUserToEmploymentLinksRef(dataConnect, attachUserToEmploymentLinksVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employmentLink_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employmentLink_updateMany);
});
```

## CreateNotification
You can execute the `CreateNotification` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNotification(vars: CreateNotificationVariables): MutationPromise<CreateNotificationData, CreateNotificationVariables>;

interface CreateNotificationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNotificationVariables): MutationRef<CreateNotificationData, CreateNotificationVariables>;
}
export const createNotificationRef: CreateNotificationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNotification(dc: DataConnect, vars: CreateNotificationVariables): MutationPromise<CreateNotificationData, CreateNotificationVariables>;

interface CreateNotificationRef {
  ...
  (dc: DataConnect, vars: CreateNotificationVariables): MutationRef<CreateNotificationData, CreateNotificationVariables>;
}
export const createNotificationRef: CreateNotificationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNotificationRef:
```typescript
const name = createNotificationRef.operationName;
console.log(name);
```

### Variables
The `CreateNotification` mutation requires an argument of type `CreateNotificationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNotificationVariables {
  userId: UUIDString;
  type: string;
  title: string;
  message: string;
  link?: string | null;
  metadata?: string | null;
}
```
### Return Type
Recall that executing the `CreateNotification` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNotificationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNotificationData {
  notification_insert: Notification_Key;
}
```
### Using `CreateNotification`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNotification, CreateNotificationVariables } from '@dataconnect/admin-generated';

// The `CreateNotification` mutation requires an argument of type `CreateNotificationVariables`:
const createNotificationVars: CreateNotificationVariables = {
  userId: ..., 
  type: ..., 
  title: ..., 
  message: ..., 
  link: ..., // optional
  metadata: ..., // optional
};

// Call the `createNotification()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNotification(createNotificationVars);
// Variables can be defined inline as well.
const { data } = await createNotification({ userId: ..., type: ..., title: ..., message: ..., link: ..., metadata: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNotification(dataConnect, createNotificationVars);

console.log(data.notification_insert);

// Or, you can use the `Promise` API.
createNotification(createNotificationVars).then((response) => {
  const data = response.data;
  console.log(data.notification_insert);
});
```

### Using `CreateNotification`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNotificationRef, CreateNotificationVariables } from '@dataconnect/admin-generated';

// The `CreateNotification` mutation requires an argument of type `CreateNotificationVariables`:
const createNotificationVars: CreateNotificationVariables = {
  userId: ..., 
  type: ..., 
  title: ..., 
  message: ..., 
  link: ..., // optional
  metadata: ..., // optional
};

// Call the `createNotificationRef()` function to get a reference to the mutation.
const ref = createNotificationRef(createNotificationVars);
// Variables can be defined inline as well.
const ref = createNotificationRef({ userId: ..., type: ..., title: ..., message: ..., link: ..., metadata: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNotificationRef(dataConnect, createNotificationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_insert);
});
```

## MarkNotificationRead
You can execute the `MarkNotificationRead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
markNotificationRead(vars: MarkNotificationReadVariables): MutationPromise<MarkNotificationReadData, MarkNotificationReadVariables>;

interface MarkNotificationReadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkNotificationReadVariables): MutationRef<MarkNotificationReadData, MarkNotificationReadVariables>;
}
export const markNotificationReadRef: MarkNotificationReadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markNotificationRead(dc: DataConnect, vars: MarkNotificationReadVariables): MutationPromise<MarkNotificationReadData, MarkNotificationReadVariables>;

interface MarkNotificationReadRef {
  ...
  (dc: DataConnect, vars: MarkNotificationReadVariables): MutationRef<MarkNotificationReadData, MarkNotificationReadVariables>;
}
export const markNotificationReadRef: MarkNotificationReadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markNotificationReadRef:
```typescript
const name = markNotificationReadRef.operationName;
console.log(name);
```

### Variables
The `MarkNotificationRead` mutation requires an argument of type `MarkNotificationReadVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkNotificationReadVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `MarkNotificationRead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkNotificationReadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkNotificationReadData {
  notification_update?: Notification_Key | null;
}
```
### Using `MarkNotificationRead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markNotificationRead, MarkNotificationReadVariables } from '@dataconnect/admin-generated';

// The `MarkNotificationRead` mutation requires an argument of type `MarkNotificationReadVariables`:
const markNotificationReadVars: MarkNotificationReadVariables = {
  id: ..., 
};

// Call the `markNotificationRead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markNotificationRead(markNotificationReadVars);
// Variables can be defined inline as well.
const { data } = await markNotificationRead({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markNotificationRead(dataConnect, markNotificationReadVars);

console.log(data.notification_update);

// Or, you can use the `Promise` API.
markNotificationRead(markNotificationReadVars).then((response) => {
  const data = response.data;
  console.log(data.notification_update);
});
```

### Using `MarkNotificationRead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markNotificationReadRef, MarkNotificationReadVariables } from '@dataconnect/admin-generated';

// The `MarkNotificationRead` mutation requires an argument of type `MarkNotificationReadVariables`:
const markNotificationReadVars: MarkNotificationReadVariables = {
  id: ..., 
};

// Call the `markNotificationReadRef()` function to get a reference to the mutation.
const ref = markNotificationReadRef(markNotificationReadVars);
// Variables can be defined inline as well.
const ref = markNotificationReadRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markNotificationReadRef(dataConnect, markNotificationReadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_update);
});
```

## MarkAllNotificationsRead
You can execute the `MarkAllNotificationsRead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
markAllNotificationsRead(vars: MarkAllNotificationsReadVariables): MutationPromise<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;

interface MarkAllNotificationsReadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkAllNotificationsReadVariables): MutationRef<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
}
export const markAllNotificationsReadRef: MarkAllNotificationsReadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markAllNotificationsRead(dc: DataConnect, vars: MarkAllNotificationsReadVariables): MutationPromise<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;

interface MarkAllNotificationsReadRef {
  ...
  (dc: DataConnect, vars: MarkAllNotificationsReadVariables): MutationRef<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
}
export const markAllNotificationsReadRef: MarkAllNotificationsReadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markAllNotificationsReadRef:
```typescript
const name = markAllNotificationsReadRef.operationName;
console.log(name);
```

### Variables
The `MarkAllNotificationsRead` mutation requires an argument of type `MarkAllNotificationsReadVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkAllNotificationsReadVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `MarkAllNotificationsRead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkAllNotificationsReadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkAllNotificationsReadData {
  notification_updateMany: number;
}
```
### Using `MarkAllNotificationsRead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markAllNotificationsRead, MarkAllNotificationsReadVariables } from '@dataconnect/admin-generated';

// The `MarkAllNotificationsRead` mutation requires an argument of type `MarkAllNotificationsReadVariables`:
const markAllNotificationsReadVars: MarkAllNotificationsReadVariables = {
  userId: ..., 
};

// Call the `markAllNotificationsRead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markAllNotificationsRead(markAllNotificationsReadVars);
// Variables can be defined inline as well.
const { data } = await markAllNotificationsRead({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markAllNotificationsRead(dataConnect, markAllNotificationsReadVars);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
markAllNotificationsRead(markAllNotificationsReadVars).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

### Using `MarkAllNotificationsRead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markAllNotificationsReadRef, MarkAllNotificationsReadVariables } from '@dataconnect/admin-generated';

// The `MarkAllNotificationsRead` mutation requires an argument of type `MarkAllNotificationsReadVariables`:
const markAllNotificationsReadVars: MarkAllNotificationsReadVariables = {
  userId: ..., 
};

// Call the `markAllNotificationsReadRef()` function to get a reference to the mutation.
const ref = markAllNotificationsReadRef(markAllNotificationsReadVars);
// Variables can be defined inline as well.
const ref = markAllNotificationsReadRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markAllNotificationsReadRef(dataConnect, markAllNotificationsReadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

## CreateAuditLog
You can execute the `CreateAuditLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAuditLog(vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface CreateAuditLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
}
export const createAuditLogRef: CreateAuditLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAuditLog(dc: DataConnect, vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface CreateAuditLogRef {
  ...
  (dc: DataConnect, vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
}
export const createAuditLogRef: CreateAuditLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAuditLogRef:
```typescript
const name = createAuditLogRef.operationName;
console.log(name);
```

### Variables
The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAuditLogVariables {
  userId: UUIDString;
  role: string;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}
```
### Return Type
Recall that executing the `CreateAuditLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAuditLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}
```
### Using `CreateAuditLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAuditLog, CreateAuditLogVariables } from '@dataconnect/admin-generated';

// The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`:
const createAuditLogVars: CreateAuditLogVariables = {
  userId: ..., 
  role: ..., 
  action: ..., 
  entityType: ..., // optional
  entityId: ..., // optional
  details: ..., // optional
  ipAddress: ..., // optional
  userAgent: ..., // optional
};

// Call the `createAuditLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAuditLog(createAuditLogVars);
// Variables can be defined inline as well.
const { data } = await createAuditLog({ userId: ..., role: ..., action: ..., entityType: ..., entityId: ..., details: ..., ipAddress: ..., userAgent: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAuditLog(dataConnect, createAuditLogVars);

console.log(data.auditLog_insert);

// Or, you can use the `Promise` API.
createAuditLog(createAuditLogVars).then((response) => {
  const data = response.data;
  console.log(data.auditLog_insert);
});
```

### Using `CreateAuditLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAuditLogRef, CreateAuditLogVariables } from '@dataconnect/admin-generated';

// The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`:
const createAuditLogVars: CreateAuditLogVariables = {
  userId: ..., 
  role: ..., 
  action: ..., 
  entityType: ..., // optional
  entityId: ..., // optional
  details: ..., // optional
  ipAddress: ..., // optional
  userAgent: ..., // optional
};

// Call the `createAuditLogRef()` function to get a reference to the mutation.
const ref = createAuditLogRef(createAuditLogVars);
// Variables can be defined inline as well.
const ref = createAuditLogRef({ userId: ..., role: ..., action: ..., entityType: ..., entityId: ..., details: ..., ipAddress: ..., userAgent: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAuditLogRef(dataConnect, createAuditLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLog_insert);
});
```

## CreateInternalProject
You can execute the `CreateInternalProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createInternalProject(vars: CreateInternalProjectVariables): MutationPromise<CreateInternalProjectData, CreateInternalProjectVariables>;

interface CreateInternalProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInternalProjectVariables): MutationRef<CreateInternalProjectData, CreateInternalProjectVariables>;
}
export const createInternalProjectRef: CreateInternalProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInternalProject(dc: DataConnect, vars: CreateInternalProjectVariables): MutationPromise<CreateInternalProjectData, CreateInternalProjectVariables>;

interface CreateInternalProjectRef {
  ...
  (dc: DataConnect, vars: CreateInternalProjectVariables): MutationRef<CreateInternalProjectData, CreateInternalProjectVariables>;
}
export const createInternalProjectRef: CreateInternalProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInternalProjectRef:
```typescript
const name = createInternalProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateInternalProject` mutation requires an argument of type `CreateInternalProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateInternalProjectVariables {
  companyId: UUIDString;
  name: string;
  description?: string | null;
  department?: string | null;
  clientName?: string | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  priority?: string | null;
  status?: string | null;
  projectLead?: string | null;
  requiredRoles?: string | null;
  openPositions?: number | null;
  filledPositions?: number | null;
  tasksCompleted?: number | null;
  tasksRemaining?: number | null;
  progress?: number | null;
  assignedRecruiters?: string | null;
  assignedEmployees?: string | null;
  documents?: string | null;
  createdBy?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateInternalProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInternalProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInternalProjectData {
  internalProject_insert: InternalProject_Key;
}
```
### Using `CreateInternalProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInternalProject, CreateInternalProjectVariables } from '@dataconnect/admin-generated';

// The `CreateInternalProject` mutation requires an argument of type `CreateInternalProjectVariables`:
const createInternalProjectVars: CreateInternalProjectVariables = {
  companyId: ..., 
  name: ..., 
  description: ..., // optional
  department: ..., // optional
  clientName: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  priority: ..., // optional
  status: ..., // optional
  projectLead: ..., // optional
  requiredRoles: ..., // optional
  openPositions: ..., // optional
  filledPositions: ..., // optional
  tasksCompleted: ..., // optional
  tasksRemaining: ..., // optional
  progress: ..., // optional
  assignedRecruiters: ..., // optional
  assignedEmployees: ..., // optional
  documents: ..., // optional
  createdBy: ..., // optional
};

// Call the `createInternalProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInternalProject(createInternalProjectVars);
// Variables can be defined inline as well.
const { data } = await createInternalProject({ companyId: ..., name: ..., description: ..., department: ..., clientName: ..., startDate: ..., endDate: ..., priority: ..., status: ..., projectLead: ..., requiredRoles: ..., openPositions: ..., filledPositions: ..., tasksCompleted: ..., tasksRemaining: ..., progress: ..., assignedRecruiters: ..., assignedEmployees: ..., documents: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInternalProject(dataConnect, createInternalProjectVars);

console.log(data.internalProject_insert);

// Or, you can use the `Promise` API.
createInternalProject(createInternalProjectVars).then((response) => {
  const data = response.data;
  console.log(data.internalProject_insert);
});
```

### Using `CreateInternalProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInternalProjectRef, CreateInternalProjectVariables } from '@dataconnect/admin-generated';

// The `CreateInternalProject` mutation requires an argument of type `CreateInternalProjectVariables`:
const createInternalProjectVars: CreateInternalProjectVariables = {
  companyId: ..., 
  name: ..., 
  description: ..., // optional
  department: ..., // optional
  clientName: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  priority: ..., // optional
  status: ..., // optional
  projectLead: ..., // optional
  requiredRoles: ..., // optional
  openPositions: ..., // optional
  filledPositions: ..., // optional
  tasksCompleted: ..., // optional
  tasksRemaining: ..., // optional
  progress: ..., // optional
  assignedRecruiters: ..., // optional
  assignedEmployees: ..., // optional
  documents: ..., // optional
  createdBy: ..., // optional
};

// Call the `createInternalProjectRef()` function to get a reference to the mutation.
const ref = createInternalProjectRef(createInternalProjectVars);
// Variables can be defined inline as well.
const ref = createInternalProjectRef({ companyId: ..., name: ..., description: ..., department: ..., clientName: ..., startDate: ..., endDate: ..., priority: ..., status: ..., projectLead: ..., requiredRoles: ..., openPositions: ..., filledPositions: ..., tasksCompleted: ..., tasksRemaining: ..., progress: ..., assignedRecruiters: ..., assignedEmployees: ..., documents: ..., createdBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInternalProjectRef(dataConnect, createInternalProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.internalProject_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.internalProject_insert);
});
```

## UpdateInternalProject
You can execute the `UpdateInternalProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateInternalProject(vars: UpdateInternalProjectVariables): MutationPromise<UpdateInternalProjectData, UpdateInternalProjectVariables>;

interface UpdateInternalProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInternalProjectVariables): MutationRef<UpdateInternalProjectData, UpdateInternalProjectVariables>;
}
export const updateInternalProjectRef: UpdateInternalProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInternalProject(dc: DataConnect, vars: UpdateInternalProjectVariables): MutationPromise<UpdateInternalProjectData, UpdateInternalProjectVariables>;

interface UpdateInternalProjectRef {
  ...
  (dc: DataConnect, vars: UpdateInternalProjectVariables): MutationRef<UpdateInternalProjectData, UpdateInternalProjectVariables>;
}
export const updateInternalProjectRef: UpdateInternalProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInternalProjectRef:
```typescript
const name = updateInternalProjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateInternalProject` mutation requires an argument of type `UpdateInternalProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInternalProjectVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  department?: string | null;
  clientName?: string | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  priority?: string | null;
  status?: string | null;
  projectLead?: string | null;
  requiredRoles?: string | null;
  openPositions?: number | null;
  filledPositions?: number | null;
  tasksCompleted?: number | null;
  tasksRemaining?: number | null;
  progress?: number | null;
  assignedRecruiters?: string | null;
  assignedEmployees?: string | null;
  documents?: string | null;
}
```
### Return Type
Recall that executing the `UpdateInternalProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInternalProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInternalProjectData {
  internalProject_update?: InternalProject_Key | null;
}
```
### Using `UpdateInternalProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInternalProject, UpdateInternalProjectVariables } from '@dataconnect/admin-generated';

// The `UpdateInternalProject` mutation requires an argument of type `UpdateInternalProjectVariables`:
const updateInternalProjectVars: UpdateInternalProjectVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  department: ..., // optional
  clientName: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  priority: ..., // optional
  status: ..., // optional
  projectLead: ..., // optional
  requiredRoles: ..., // optional
  openPositions: ..., // optional
  filledPositions: ..., // optional
  tasksCompleted: ..., // optional
  tasksRemaining: ..., // optional
  progress: ..., // optional
  assignedRecruiters: ..., // optional
  assignedEmployees: ..., // optional
  documents: ..., // optional
};

// Call the `updateInternalProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInternalProject(updateInternalProjectVars);
// Variables can be defined inline as well.
const { data } = await updateInternalProject({ id: ..., name: ..., description: ..., department: ..., clientName: ..., startDate: ..., endDate: ..., priority: ..., status: ..., projectLead: ..., requiredRoles: ..., openPositions: ..., filledPositions: ..., tasksCompleted: ..., tasksRemaining: ..., progress: ..., assignedRecruiters: ..., assignedEmployees: ..., documents: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInternalProject(dataConnect, updateInternalProjectVars);

console.log(data.internalProject_update);

// Or, you can use the `Promise` API.
updateInternalProject(updateInternalProjectVars).then((response) => {
  const data = response.data;
  console.log(data.internalProject_update);
});
```

### Using `UpdateInternalProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInternalProjectRef, UpdateInternalProjectVariables } from '@dataconnect/admin-generated';

// The `UpdateInternalProject` mutation requires an argument of type `UpdateInternalProjectVariables`:
const updateInternalProjectVars: UpdateInternalProjectVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  department: ..., // optional
  clientName: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  priority: ..., // optional
  status: ..., // optional
  projectLead: ..., // optional
  requiredRoles: ..., // optional
  openPositions: ..., // optional
  filledPositions: ..., // optional
  tasksCompleted: ..., // optional
  tasksRemaining: ..., // optional
  progress: ..., // optional
  assignedRecruiters: ..., // optional
  assignedEmployees: ..., // optional
  documents: ..., // optional
};

// Call the `updateInternalProjectRef()` function to get a reference to the mutation.
const ref = updateInternalProjectRef(updateInternalProjectVars);
// Variables can be defined inline as well.
const ref = updateInternalProjectRef({ id: ..., name: ..., description: ..., department: ..., clientName: ..., startDate: ..., endDate: ..., priority: ..., status: ..., projectLead: ..., requiredRoles: ..., openPositions: ..., filledPositions: ..., tasksCompleted: ..., tasksRemaining: ..., progress: ..., assignedRecruiters: ..., assignedEmployees: ..., documents: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInternalProjectRef(dataConnect, updateInternalProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.internalProject_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.internalProject_update);
});
```

## SoftDeleteInternalProject
You can execute the `SoftDeleteInternalProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
softDeleteInternalProject(vars: SoftDeleteInternalProjectVariables): MutationPromise<SoftDeleteInternalProjectData, SoftDeleteInternalProjectVariables>;

interface SoftDeleteInternalProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SoftDeleteInternalProjectVariables): MutationRef<SoftDeleteInternalProjectData, SoftDeleteInternalProjectVariables>;
}
export const softDeleteInternalProjectRef: SoftDeleteInternalProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
softDeleteInternalProject(dc: DataConnect, vars: SoftDeleteInternalProjectVariables): MutationPromise<SoftDeleteInternalProjectData, SoftDeleteInternalProjectVariables>;

interface SoftDeleteInternalProjectRef {
  ...
  (dc: DataConnect, vars: SoftDeleteInternalProjectVariables): MutationRef<SoftDeleteInternalProjectData, SoftDeleteInternalProjectVariables>;
}
export const softDeleteInternalProjectRef: SoftDeleteInternalProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the softDeleteInternalProjectRef:
```typescript
const name = softDeleteInternalProjectRef.operationName;
console.log(name);
```

### Variables
The `SoftDeleteInternalProject` mutation requires an argument of type `SoftDeleteInternalProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SoftDeleteInternalProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `SoftDeleteInternalProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SoftDeleteInternalProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SoftDeleteInternalProjectData {
  internalProject_update?: InternalProject_Key | null;
}
```
### Using `SoftDeleteInternalProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, softDeleteInternalProject, SoftDeleteInternalProjectVariables } from '@dataconnect/admin-generated';

// The `SoftDeleteInternalProject` mutation requires an argument of type `SoftDeleteInternalProjectVariables`:
const softDeleteInternalProjectVars: SoftDeleteInternalProjectVariables = {
  id: ..., 
};

// Call the `softDeleteInternalProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await softDeleteInternalProject(softDeleteInternalProjectVars);
// Variables can be defined inline as well.
const { data } = await softDeleteInternalProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await softDeleteInternalProject(dataConnect, softDeleteInternalProjectVars);

console.log(data.internalProject_update);

// Or, you can use the `Promise` API.
softDeleteInternalProject(softDeleteInternalProjectVars).then((response) => {
  const data = response.data;
  console.log(data.internalProject_update);
});
```

### Using `SoftDeleteInternalProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, softDeleteInternalProjectRef, SoftDeleteInternalProjectVariables } from '@dataconnect/admin-generated';

// The `SoftDeleteInternalProject` mutation requires an argument of type `SoftDeleteInternalProjectVariables`:
const softDeleteInternalProjectVars: SoftDeleteInternalProjectVariables = {
  id: ..., 
};

// Call the `softDeleteInternalProjectRef()` function to get a reference to the mutation.
const ref = softDeleteInternalProjectRef(softDeleteInternalProjectVars);
// Variables can be defined inline as well.
const ref = softDeleteInternalProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = softDeleteInternalProjectRef(dataConnect, softDeleteInternalProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.internalProject_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.internalProject_update);
});
```

## CreateInvitation
You can execute the `CreateInvitation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createInvitation(vars: CreateInvitationVariables): MutationPromise<CreateInvitationData, CreateInvitationVariables>;

interface CreateInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvitationVariables): MutationRef<CreateInvitationData, CreateInvitationVariables>;
}
export const createInvitationRef: CreateInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInvitation(dc: DataConnect, vars: CreateInvitationVariables): MutationPromise<CreateInvitationData, CreateInvitationVariables>;

interface CreateInvitationRef {
  ...
  (dc: DataConnect, vars: CreateInvitationVariables): MutationRef<CreateInvitationData, CreateInvitationVariables>;
}
export const createInvitationRef: CreateInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInvitationRef:
```typescript
const name = createInvitationRef.operationName;
console.log(name);
```

### Variables
The `CreateInvitation` mutation requires an argument of type `CreateInvitationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateInvitationVariables {
  companyId: UUIDString;
  email: string;
  tokenHash: string;
  firstName?: string | null;
  lastName?: string | null;
  jobTitle?: string | null;
  department?: string | null;
  invitedBy: UUIDString;
  expiresAt: TimestampString;
}
```
### Return Type
Recall that executing the `CreateInvitation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInvitationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInvitationData {
  employeeInvitation_insert: EmployeeInvitation_Key;
}
```
### Using `CreateInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInvitation, CreateInvitationVariables } from '@dataconnect/admin-generated';

// The `CreateInvitation` mutation requires an argument of type `CreateInvitationVariables`:
const createInvitationVars: CreateInvitationVariables = {
  companyId: ..., 
  email: ..., 
  tokenHash: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  jobTitle: ..., // optional
  department: ..., // optional
  invitedBy: ..., 
  expiresAt: ..., 
};

// Call the `createInvitation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInvitation(createInvitationVars);
// Variables can be defined inline as well.
const { data } = await createInvitation({ companyId: ..., email: ..., tokenHash: ..., firstName: ..., lastName: ..., jobTitle: ..., department: ..., invitedBy: ..., expiresAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInvitation(dataConnect, createInvitationVars);

console.log(data.employeeInvitation_insert);

// Or, you can use the `Promise` API.
createInvitation(createInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.employeeInvitation_insert);
});
```

### Using `CreateInvitation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInvitationRef, CreateInvitationVariables } from '@dataconnect/admin-generated';

// The `CreateInvitation` mutation requires an argument of type `CreateInvitationVariables`:
const createInvitationVars: CreateInvitationVariables = {
  companyId: ..., 
  email: ..., 
  tokenHash: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  jobTitle: ..., // optional
  department: ..., // optional
  invitedBy: ..., 
  expiresAt: ..., 
};

// Call the `createInvitationRef()` function to get a reference to the mutation.
const ref = createInvitationRef(createInvitationVars);
// Variables can be defined inline as well.
const ref = createInvitationRef({ companyId: ..., email: ..., tokenHash: ..., firstName: ..., lastName: ..., jobTitle: ..., department: ..., invitedBy: ..., expiresAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInvitationRef(dataConnect, createInvitationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employeeInvitation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeInvitation_insert);
});
```

## MarkInvitationAccepted
You can execute the `MarkInvitationAccepted` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
markInvitationAccepted(vars: MarkInvitationAcceptedVariables): MutationPromise<MarkInvitationAcceptedData, MarkInvitationAcceptedVariables>;

interface MarkInvitationAcceptedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkInvitationAcceptedVariables): MutationRef<MarkInvitationAcceptedData, MarkInvitationAcceptedVariables>;
}
export const markInvitationAcceptedRef: MarkInvitationAcceptedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markInvitationAccepted(dc: DataConnect, vars: MarkInvitationAcceptedVariables): MutationPromise<MarkInvitationAcceptedData, MarkInvitationAcceptedVariables>;

interface MarkInvitationAcceptedRef {
  ...
  (dc: DataConnect, vars: MarkInvitationAcceptedVariables): MutationRef<MarkInvitationAcceptedData, MarkInvitationAcceptedVariables>;
}
export const markInvitationAcceptedRef: MarkInvitationAcceptedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markInvitationAcceptedRef:
```typescript
const name = markInvitationAcceptedRef.operationName;
console.log(name);
```

### Variables
The `MarkInvitationAccepted` mutation requires an argument of type `MarkInvitationAcceptedVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkInvitationAcceptedVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `MarkInvitationAccepted` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkInvitationAcceptedData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkInvitationAcceptedData {
  employeeInvitation_update?: EmployeeInvitation_Key | null;
}
```
### Using `MarkInvitationAccepted`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markInvitationAccepted, MarkInvitationAcceptedVariables } from '@dataconnect/admin-generated';

// The `MarkInvitationAccepted` mutation requires an argument of type `MarkInvitationAcceptedVariables`:
const markInvitationAcceptedVars: MarkInvitationAcceptedVariables = {
  id: ..., 
};

// Call the `markInvitationAccepted()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markInvitationAccepted(markInvitationAcceptedVars);
// Variables can be defined inline as well.
const { data } = await markInvitationAccepted({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markInvitationAccepted(dataConnect, markInvitationAcceptedVars);

console.log(data.employeeInvitation_update);

// Or, you can use the `Promise` API.
markInvitationAccepted(markInvitationAcceptedVars).then((response) => {
  const data = response.data;
  console.log(data.employeeInvitation_update);
});
```

### Using `MarkInvitationAccepted`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markInvitationAcceptedRef, MarkInvitationAcceptedVariables } from '@dataconnect/admin-generated';

// The `MarkInvitationAccepted` mutation requires an argument of type `MarkInvitationAcceptedVariables`:
const markInvitationAcceptedVars: MarkInvitationAcceptedVariables = {
  id: ..., 
};

// Call the `markInvitationAcceptedRef()` function to get a reference to the mutation.
const ref = markInvitationAcceptedRef(markInvitationAcceptedVars);
// Variables can be defined inline as well.
const ref = markInvitationAcceptedRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markInvitationAcceptedRef(dataConnect, markInvitationAcceptedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employeeInvitation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeInvitation_update);
});
```

## SaveCandidate
You can execute the `SaveCandidate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
saveCandidate(vars: SaveCandidateVariables): MutationPromise<SaveCandidateData, SaveCandidateVariables>;

interface SaveCandidateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SaveCandidateVariables): MutationRef<SaveCandidateData, SaveCandidateVariables>;
}
export const saveCandidateRef: SaveCandidateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
saveCandidate(dc: DataConnect, vars: SaveCandidateVariables): MutationPromise<SaveCandidateData, SaveCandidateVariables>;

interface SaveCandidateRef {
  ...
  (dc: DataConnect, vars: SaveCandidateVariables): MutationRef<SaveCandidateData, SaveCandidateVariables>;
}
export const saveCandidateRef: SaveCandidateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the saveCandidateRef:
```typescript
const name = saveCandidateRef.operationName;
console.log(name);
```

### Variables
The `SaveCandidate` mutation requires an argument of type `SaveCandidateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SaveCandidateVariables {
  recruiterId: UUIDString;
  employeeId: UUIDString;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `SaveCandidate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SaveCandidateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SaveCandidateData {
  savedCandidate_insert: SavedCandidate_Key;
}
```
### Using `SaveCandidate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, saveCandidate, SaveCandidateVariables } from '@dataconnect/admin-generated';

// The `SaveCandidate` mutation requires an argument of type `SaveCandidateVariables`:
const saveCandidateVars: SaveCandidateVariables = {
  recruiterId: ..., 
  employeeId: ..., 
  notes: ..., // optional
};

// Call the `saveCandidate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await saveCandidate(saveCandidateVars);
// Variables can be defined inline as well.
const { data } = await saveCandidate({ recruiterId: ..., employeeId: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await saveCandidate(dataConnect, saveCandidateVars);

console.log(data.savedCandidate_insert);

// Or, you can use the `Promise` API.
saveCandidate(saveCandidateVars).then((response) => {
  const data = response.data;
  console.log(data.savedCandidate_insert);
});
```

### Using `SaveCandidate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, saveCandidateRef, SaveCandidateVariables } from '@dataconnect/admin-generated';

// The `SaveCandidate` mutation requires an argument of type `SaveCandidateVariables`:
const saveCandidateVars: SaveCandidateVariables = {
  recruiterId: ..., 
  employeeId: ..., 
  notes: ..., // optional
};

// Call the `saveCandidateRef()` function to get a reference to the mutation.
const ref = saveCandidateRef(saveCandidateVars);
// Variables can be defined inline as well.
const ref = saveCandidateRef({ recruiterId: ..., employeeId: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = saveCandidateRef(dataConnect, saveCandidateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.savedCandidate_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.savedCandidate_insert);
});
```

## UpdateSavedCandidateNotes
You can execute the `UpdateSavedCandidateNotes` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSavedCandidateNotes(vars: UpdateSavedCandidateNotesVariables): MutationPromise<UpdateSavedCandidateNotesData, UpdateSavedCandidateNotesVariables>;

interface UpdateSavedCandidateNotesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSavedCandidateNotesVariables): MutationRef<UpdateSavedCandidateNotesData, UpdateSavedCandidateNotesVariables>;
}
export const updateSavedCandidateNotesRef: UpdateSavedCandidateNotesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSavedCandidateNotes(dc: DataConnect, vars: UpdateSavedCandidateNotesVariables): MutationPromise<UpdateSavedCandidateNotesData, UpdateSavedCandidateNotesVariables>;

interface UpdateSavedCandidateNotesRef {
  ...
  (dc: DataConnect, vars: UpdateSavedCandidateNotesVariables): MutationRef<UpdateSavedCandidateNotesData, UpdateSavedCandidateNotesVariables>;
}
export const updateSavedCandidateNotesRef: UpdateSavedCandidateNotesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSavedCandidateNotesRef:
```typescript
const name = updateSavedCandidateNotesRef.operationName;
console.log(name);
```

### Variables
The `UpdateSavedCandidateNotes` mutation requires an argument of type `UpdateSavedCandidateNotesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSavedCandidateNotesVariables {
  recruiterId: UUIDString;
  employeeId: UUIDString;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSavedCandidateNotes` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSavedCandidateNotesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSavedCandidateNotesData {
  savedCandidate_update?: SavedCandidate_Key | null;
}
```
### Using `UpdateSavedCandidateNotes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSavedCandidateNotes, UpdateSavedCandidateNotesVariables } from '@dataconnect/admin-generated';

// The `UpdateSavedCandidateNotes` mutation requires an argument of type `UpdateSavedCandidateNotesVariables`:
const updateSavedCandidateNotesVars: UpdateSavedCandidateNotesVariables = {
  recruiterId: ..., 
  employeeId: ..., 
  notes: ..., // optional
};

// Call the `updateSavedCandidateNotes()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSavedCandidateNotes(updateSavedCandidateNotesVars);
// Variables can be defined inline as well.
const { data } = await updateSavedCandidateNotes({ recruiterId: ..., employeeId: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSavedCandidateNotes(dataConnect, updateSavedCandidateNotesVars);

console.log(data.savedCandidate_update);

// Or, you can use the `Promise` API.
updateSavedCandidateNotes(updateSavedCandidateNotesVars).then((response) => {
  const data = response.data;
  console.log(data.savedCandidate_update);
});
```

### Using `UpdateSavedCandidateNotes`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSavedCandidateNotesRef, UpdateSavedCandidateNotesVariables } from '@dataconnect/admin-generated';

// The `UpdateSavedCandidateNotes` mutation requires an argument of type `UpdateSavedCandidateNotesVariables`:
const updateSavedCandidateNotesVars: UpdateSavedCandidateNotesVariables = {
  recruiterId: ..., 
  employeeId: ..., 
  notes: ..., // optional
};

// Call the `updateSavedCandidateNotesRef()` function to get a reference to the mutation.
const ref = updateSavedCandidateNotesRef(updateSavedCandidateNotesVars);
// Variables can be defined inline as well.
const ref = updateSavedCandidateNotesRef({ recruiterId: ..., employeeId: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSavedCandidateNotesRef(dataConnect, updateSavedCandidateNotesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.savedCandidate_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.savedCandidate_update);
});
```

## DeleteSavedCandidate
You can execute the `DeleteSavedCandidate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSavedCandidate(vars: DeleteSavedCandidateVariables): MutationPromise<DeleteSavedCandidateData, DeleteSavedCandidateVariables>;

interface DeleteSavedCandidateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSavedCandidateVariables): MutationRef<DeleteSavedCandidateData, DeleteSavedCandidateVariables>;
}
export const deleteSavedCandidateRef: DeleteSavedCandidateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSavedCandidate(dc: DataConnect, vars: DeleteSavedCandidateVariables): MutationPromise<DeleteSavedCandidateData, DeleteSavedCandidateVariables>;

interface DeleteSavedCandidateRef {
  ...
  (dc: DataConnect, vars: DeleteSavedCandidateVariables): MutationRef<DeleteSavedCandidateData, DeleteSavedCandidateVariables>;
}
export const deleteSavedCandidateRef: DeleteSavedCandidateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSavedCandidateRef:
```typescript
const name = deleteSavedCandidateRef.operationName;
console.log(name);
```

### Variables
The `DeleteSavedCandidate` mutation requires an argument of type `DeleteSavedCandidateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSavedCandidateVariables {
  recruiterId: UUIDString;
  employeeId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSavedCandidate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSavedCandidateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSavedCandidateData {
  savedCandidate_delete?: SavedCandidate_Key | null;
}
```
### Using `DeleteSavedCandidate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSavedCandidate, DeleteSavedCandidateVariables } from '@dataconnect/admin-generated';

// The `DeleteSavedCandidate` mutation requires an argument of type `DeleteSavedCandidateVariables`:
const deleteSavedCandidateVars: DeleteSavedCandidateVariables = {
  recruiterId: ..., 
  employeeId: ..., 
};

// Call the `deleteSavedCandidate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSavedCandidate(deleteSavedCandidateVars);
// Variables can be defined inline as well.
const { data } = await deleteSavedCandidate({ recruiterId: ..., employeeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSavedCandidate(dataConnect, deleteSavedCandidateVars);

console.log(data.savedCandidate_delete);

// Or, you can use the `Promise` API.
deleteSavedCandidate(deleteSavedCandidateVars).then((response) => {
  const data = response.data;
  console.log(data.savedCandidate_delete);
});
```

### Using `DeleteSavedCandidate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSavedCandidateRef, DeleteSavedCandidateVariables } from '@dataconnect/admin-generated';

// The `DeleteSavedCandidate` mutation requires an argument of type `DeleteSavedCandidateVariables`:
const deleteSavedCandidateVars: DeleteSavedCandidateVariables = {
  recruiterId: ..., 
  employeeId: ..., 
};

// Call the `deleteSavedCandidateRef()` function to get a reference to the mutation.
const ref = deleteSavedCandidateRef(deleteSavedCandidateVars);
// Variables can be defined inline as well.
const ref = deleteSavedCandidateRef({ recruiterId: ..., employeeId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSavedCandidateRef(dataConnect, deleteSavedCandidateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.savedCandidate_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.savedCandidate_delete);
});
```


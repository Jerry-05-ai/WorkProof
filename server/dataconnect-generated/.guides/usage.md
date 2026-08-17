# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUserLastLogin, setUserCompanyAndEmployee, createCompany, setCompanyAdmin, updateCompanyStatus, createCompanyMembership, createEmployee, updateEmployee, softDeleteEmployee } from '@dataconnect/admin-generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUserLastLogin:  For variables, look at type UpdateUserLastLoginVars in ../index.d.ts
const { data } = await UpdateUserLastLogin(dataConnect, updateUserLastLoginVars);

// Operation SetUserCompanyAndEmployee:  For variables, look at type SetUserCompanyAndEmployeeVars in ../index.d.ts
const { data } = await SetUserCompanyAndEmployee(dataConnect, setUserCompanyAndEmployeeVars);

// Operation CreateCompany:  For variables, look at type CreateCompanyVars in ../index.d.ts
const { data } = await CreateCompany(dataConnect, createCompanyVars);

// Operation SetCompanyAdmin:  For variables, look at type SetCompanyAdminVars in ../index.d.ts
const { data } = await SetCompanyAdmin(dataConnect, setCompanyAdminVars);

// Operation UpdateCompanyStatus:  For variables, look at type UpdateCompanyStatusVars in ../index.d.ts
const { data } = await UpdateCompanyStatus(dataConnect, updateCompanyStatusVars);

// Operation CreateCompanyMembership:  For variables, look at type CreateCompanyMembershipVars in ../index.d.ts
const { data } = await CreateCompanyMembership(dataConnect, createCompanyMembershipVars);

// Operation CreateEmployee:  For variables, look at type CreateEmployeeVars in ../index.d.ts
const { data } = await CreateEmployee(dataConnect, createEmployeeVars);

// Operation UpdateEmployee:  For variables, look at type UpdateEmployeeVars in ../index.d.ts
const { data } = await UpdateEmployee(dataConnect, updateEmployeeVars);

// Operation SoftDeleteEmployee:  For variables, look at type SoftDeleteEmployeeVars in ../index.d.ts
const { data } = await SoftDeleteEmployee(dataConnect, softDeleteEmployeeVars);


```
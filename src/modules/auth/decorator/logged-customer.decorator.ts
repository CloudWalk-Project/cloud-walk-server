// import {
//   createParamDecorator,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { UserRole } from '@prisma/client';

// export const LoggedCustomer = createParamDecorator(
//   (_, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const userObject = request.user;

//     if (userObject.role === UserRole.Customer) {
//       delete userObject.password;

//       return userObject;
//     } else {
//       throw new UnauthorizedException(
//         'User does not have permission to access this route',
//       );
//     }
//   },
// );

import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const LoggedSalesPerson = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userObject = request.user;

    if (
      userObject.role === UserRole.Owner ||
      UserRole.Manager ||
      UserRole.SalesPerson
    ) {
      delete userObject.passwordHash;

      return userObject;
    } else {
      throw new UnauthorizedException(
        'User does not have permission to access this route',
      );
    }
  },
);
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject = request.user;

  if (userObject) {
    delete userObject.password;

    return userObject;
  } else {
    throw new UnauthorizedException('You don`t have permission to access.');
  }
});

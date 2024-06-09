import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '../../auth/interfaces/auth-payload.interface';

export const getUserIdFromContext = (context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest();
  const user: AuthPayload = request.user as AuthPayload;

  return user?.id;
};

export const CurrentUserId = createParamDecorator(
  (_: unknown, context: ExecutionContext) => getUserIdFromContext(context),
);

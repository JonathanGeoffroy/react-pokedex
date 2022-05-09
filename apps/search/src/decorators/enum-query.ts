import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

interface Param {
  key: string;
  type: Enum<unknown>;
}

export default createParamDecorator(
  ({ key, type }: Param, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.query[key];

    if (value && !type[value]) {
      throw new BadRequestException(`Missing required query param: '${key}'`);
    }

    return value;
  }
);

import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResultDto } from '../dto/paginated-result.dto';

export function ApiPaginatedResponse<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(PaginatedResultDto, model),
    ApiResponse({
      status: 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResultDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
}

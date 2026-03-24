import type { PaginationType } from '@/core/shared/schemas';

export interface PrismaPagination {
  skip: number;
  take: number;
}

export const toPrismaPagination = (
  pagination?: Partial<PaginationType> | null,
  fallbackPage = 1,
  fallbackTake = 20,
): PrismaPagination => {
  const page = pagination?.page ?? fallbackPage;
  const take = pagination?.take ?? fallbackTake;

  return {
    skip: (page - 1) * take,
    take,
  };
};

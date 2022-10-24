import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class DeleteCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: number) {
    if (isNaN(id)) {
      return {
        status: 400,
        data: { message: 'ID MUST be a number' },
      };
    }

    const categoryExists = await this.categoryRepository.findCategoryById(id);

    if (!categoryExists) {
      return {
        status: 404,
        data: { message: 'Category not Found!' },
      };
    }

    await this.categoryRepository.deleteCategory(id);

    return {
      status: 200,
      data: { message: 'Category deleted successfully!' },
    };
  }
}

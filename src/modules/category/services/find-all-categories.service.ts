import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class FindAllCategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute() {
    const categories = await this.categoryRepository.findAllCategories();

    if (categories.length <= 0) {
      return {
        status: 404,
        data: { message: 'Category is empty' },
      };
    }

    return {
      status: 200,
      data: categories,
    };
  }
}
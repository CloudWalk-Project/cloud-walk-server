import { Injectable } from '@nestjs/common';
import { dataTreatment } from 'src/shared/utils/data-treatment.util';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(data: CreateCategoryDto) {
    data.name = dataTreatment(data.name);

    const { name } = data;

    const categoryAlreadyExists =
      await this.categoryRepository.findCategoryByName(name);

    if (categoryAlreadyExists) {
      return {
        status: 400,
        data: { message: 'Category already exists in records' },
      };
    } else {
      const createCategory = await this.categoryRepository.createCategory(data);
      return {
        status: 201,
        data: createCategory,
      };
    }
  }
}

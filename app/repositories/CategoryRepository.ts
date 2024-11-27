import { Category } from "@prisma/client";
import { getPrisma } from "~/lib/getPrisma";
import { CategoryDTO } from "~/types/CategoryDTO";

export class CategoryRepository {
  convertToDTO(
    category: Category,
    myLanguage: string,
    learningLanguage: string
  ): CategoryDTO {
    return {
      id: category.id,
      // @ts-ignore
      translatedtitle: category[`name_${myLanguage}`]!,
      // @ts-ignore
      learningTitle: category[`name_${learningLanguage}`]!,
    };
  }
  async findByParentCategory(
    parentCategoryId: number | null,
    myLanguage: string,
    learningLanguage: string
  ) {
    const prisma = getPrisma();
    const categories = await prisma.category.findMany({
      where: {
        parent_category_id: parentCategoryId,
      },
    });

    return categories.map((c) =>
      this.convertToDTO(c, myLanguage, learningLanguage)
    );
  }

  async findOneById(id: number, myLanguage: string, learningLanguage: string) {
    const prisma = getPrisma();
    const category = await prisma.category.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return this.convertToDTO(category, myLanguage, learningLanguage);
  }
}

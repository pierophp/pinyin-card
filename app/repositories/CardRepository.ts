import { Card } from "@prisma/client";
import { getPrisma } from "~/lib/getPrisma";
import { CardDTO } from "~/types/CardDTO";

export class CardRepository {
  convertToDTO(
    card: Card,
    myLanguage: string,
    learningLanguage: string
  ): CardDTO {
    return {
      id: card.id,
      // @ts-ignore
      translatedtitle: card[`name_${myLanguage}`]!,
      // @ts-ignore
      learningTitle: card[`name_${learningLanguage}`]!,
    };
  }
  async findByCategory(
    categoryId: number,
    myLanguage: string,
    learningLanguage: string
  ) {
    const prisma = getPrisma();
    const cards = await prisma.card.findMany({
      where: {
        category_id: categoryId,
      },
    });

    return cards.map((c) => this.convertToDTO(c, myLanguage, learningLanguage));
  }
}

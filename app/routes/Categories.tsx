import type { Route } from "./+types/Categories";
import { useLoaderData } from "react-router";
import Game from "../components/card/Game";
import Initial from "../components/card/Initial";
import Presentation from "../components/card/Presentation";
import getUser from "../helpers/get.user";
import { Button } from "~/components/ui/button";
import { CategoryDTO } from "~/types/CategoryDTO";
import { CategoryRepository } from "~/repositories/CategoryRepository";
import { CardDTO } from "~/types/CardDTO";
import { CardRepository } from "~/repositories/CardRepository";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const myLanguage = "pt";
  const learningLanguage = "en";

  const categoryId = params.id ? Number(params.id) : null;

  const cardRepository = new CardRepository();
  const categoryRepository = new CategoryRepository();

  const categories = await categoryRepository.findByParentCategory(
    categoryId,
    myLanguage,
    learningLanguage
  );

  let currentCategory: CategoryDTO | null = null;
  let cards: CardDTO[] = [];
  if (categoryId != null) {
    currentCategory = await categoryRepository.findOneById(
      categoryId,
      myLanguage,
      learningLanguage
    );

    cards = await cardRepository.findByCategory(
      categoryId,
      myLanguage,
      learningLanguage
    );
  }

  return {
    user: getUser(),
    categories,
    currentCategory,
    cards,
    type: params.type ?? "initial",
  };
}

export default function Categories() {
  const { categories, user, currentCategory, type, cards } =
    useLoaderData<typeof loader>();

  return (
    <div>
      {type === "initial" && (
        <Initial
          currentCategory={currentCategory}
          user={user}
          cards={cards}
          categories={categories}
        />
      )}
      {/* {type === "presentation" && <Presentation cards={cards} user={user} />} */}
      {type === "game" && <Game cards={cards} />}
    </div>
  );
}

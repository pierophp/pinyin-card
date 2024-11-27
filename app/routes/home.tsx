import type { Route } from "./+types/home";
// import axios from "axios";
import React from "react";
import { useLoaderData, useParams } from "react-router";
import Game from "../components/card/Game";
import Initial from "../components/card/Initial";
import Presentation from "../components/card/Presentation";
import getUser from "../helpers/get.user";
import { Button } from "../components/ui/button";

import { CategoryDTO } from "~/types/CategoryDTO";
import { getPrisma } from "~/lib/getPrisma";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const myLanguage = "pt";
  const learningLanguage = "en";

  const prisma = getPrisma();
  const categories = (
    await prisma.category.findMany({
      where: {
        parent_category_id: null,
      },
    })
  ).map<CategoryDTO>((c) => {
    return {
      id: c.id,
      translatedtitle: c[`name_${myLanguage}`]!,
      learningTitle: c[`name_${learningLanguage}`]!,
    };
  });

  return { user: getUser(), categories };
}

export default function Home() {
  const params = useParams();
  const { categories, user } = useLoaderData<typeof loader>();

  // const [categories, setCategories] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState<any>(null);
  const [cards, setCards] = React.useState<any>([]);

  // const type = params.type || "initial";
  const type = "initial";

  // React.useEffect(() => {
  //   async function init() {
  //     const response = (
  //       await axios.get(
  //         `${config.apiUrl}/category/by-parent-category/${
  //           params.id ? params.id : ""
  //         }`
  //       )
  //     ).data;
  //     setCategories(response);
  //   }

  //   init();
  // }, [params.id]);

  // React.useEffect(() => {
  //   async function init() {
  //     if (!params.id) {
  //       return;
  //     }

  //     const categoryResponse = (
  //       await axios.get(`${config.apiUrl}/category/${params.id}`)
  //     ).data;

  //     setCurrentCategory(categoryResponse);

  //     const cardsResponse = (
  //       await axios.get(`${config.apiUrl}/card/category/${params.id}`)
  //     ).data;
  //     setCards(cardsResponse);
  //   }

  //   init();
  // }, [params.id]);

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
      {/* <VolumeOffIcon /> */}
      {/* <Button variant="contained">Hello world</Button> */}
      {/* {type === "presentation" && <Presentation cards={cards} user={user} />} */}
      {/* {type === "game" && <Game cards={cards} />} */}
    </div>
  );
}

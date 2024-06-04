import Link from "next/link";
import classes from "./page.module.css";
import MealsGird from "@/components/Meals/meals-grid";
import { getMeals } from "../lib/getMeals";
import { Suspense } from "react";
import FetchingMeals from "./loading-text";
async function GetMeals() {
  const meals = await getMeals();
  return <MealsGird meals={meals} />;
}

export default async function Meals() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href={"meals/share"}>Share your favorite recipe!</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<FetchingMeals />}>
          <GetMeals />
        </Suspense>
      </main>
    </>
  );
}

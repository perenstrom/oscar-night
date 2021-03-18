import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  getCategories,
  getCategory,
  getFilms,
  getNominations
} from 'services/nominations';
import { Category, Film, Nomination, NormalizedFilms } from 'types/nominations';
import { ParsedUrlQuery } from 'querystring';
import { NominatedFilm } from 'components/NominatedFilm';

interface Props {
  category: Category;
  nominations: Nomination[];
  films: NormalizedFilms;
}

interface Params extends ParsedUrlQuery {
  category: string;
}

const CategoryPage: NextPage<Props> = ({ category, nominations, films }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{category.name}</title>
      </Head>
      <ul>
        {nominations.map((nomination) => (
          <NominatedFilm
            nomination={nomination}
            film={films[nomination.film]}
          />
        ))}
      </ul>
      <pre>{JSON.stringify(category, null, 2)}</pre>
      <pre>{JSON.stringify(nominations, null, 2)}</pre>
      <pre>{JSON.stringify(films, null, 2)}</pre>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  const category = await getCategory(params.category);
  const nominations = await getNominations(category.nominations);
  const films = await getFilms(nominations.map((n) => n.film));
  const normalizedFilms: NormalizedFilms = {};
  films.forEach((film) => (normalizedFilms[film.id] = film));

  return { props: { category, nominations, films: normalizedFilms } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();

  const paths = categories.map((category) => ({
    params: { category: category.slug }
  }));

  return {
    paths: paths,
    fallback: false
  };
};

export default CategoryPage;

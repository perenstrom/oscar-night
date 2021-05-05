import { atom, selector } from 'recoil';
import {
  Category,
  CategoryId,
  NormalizedBets,
  NormalizedCategories,
  NormalizedNominations,
  NormalizedPlayers,
  Status
} from 'types/nominations';
import {
  calculateCompletedCategories,
  calculatePlayersWinnings
} from 'utils/nominations';

export const betsState = atom<NormalizedBets>({
  key: 'betsState',
  default: null
});

export const nominationsState = atom<NormalizedNominations>({
  key: 'nominationsState',
  default: null
});

export const normalizedCategoriesState = atom<NormalizedCategories>({
  key: 'normalizedCategoriesState',
  default: null
});

export const categoriesState = selector<Category[]>({
  key: 'categoriesState',
  get: ({ get }) => {
    const normalizedCategories = get(normalizedCategoriesState);
    return normalizedCategories
      ? (Object.entries(normalizedCategories) as [CategoryId, Category][]).map(
          (c) => c[1]
        )
      : [];
  }
});

export const statusState = selector<Status>({
  key: 'statusState',
  get: ({ get }) => {
    const categories = get(categoriesState);
    const nominations = get(nominationsState);
    const completedCategories = calculateCompletedCategories(
      categories,
      nominations
    );

    return {
      completedCategories: completedCategories
    };
  }
});

const rawPlayersState = atom<NormalizedPlayers>({
  key: 'rawPlayersState',
  default: null,
  dangerouslyAllowMutability: true
});

export const playerState = selector<NormalizedPlayers>({
  key: 'normalizedPlayersState',
  get: ({ get }) => {
    const players = get(rawPlayersState);
    const categories = get(categoriesState);
    const nominations = get(nominationsState);
    const bets = get(betsState);

    if (players) {
      return calculatePlayersWinnings(categories, nominations, bets, players);
    } else {
      players;
    }
  },
  set: ({ set }, newValue) => {
    set(rawPlayersState, newValue);
  }
});

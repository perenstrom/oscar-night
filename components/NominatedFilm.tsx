import { memo } from 'react';
import {
  Film,
  Nomination,
  NormalizedBets,
  NormalizedPlayers
} from 'types/nominations';
import styled from 'styled-components';

interface WrapperProps {
  readonly winner: boolean;
}
const Wrapper = styled.li<WrapperProps>`
  list-style: none;
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  min-width: 200px;
  max-width: 15%;
  margin: 0 15px 30px 15px;
  padding: 0.5em;
  background-color: ${({ winner }) => winner && 'rgb(187, 162, 103)'};
`;

const Poster = styled.img`
  width: 100%;
`;

const BetList = styled.ul`
  text-align: center;
  overflow: hidden;
  padding: 0;
`;

const BettingPlayer = styled.li`
  list-style: none;
  display: inline-block;
  background-color: #2ecc71;
  padding: 0.3em;
  border-radius: 0.3em;
  margin-right: 0.3em;
  margin-top: 0.3em;
  font-size: 1.3em;
`;

interface Props {
  nomination: Nomination;
  film: Film;
  bets: NormalizedBets;
  players: NormalizedPlayers;
}

export const NominatedFilm: React.FC<Props> = memo(
  ({ nomination, film, bets, players }) => {
    const bettingPlayers = nomination.bets
      ? nomination.bets.map((bet) => (
          <BetList key={bet}>
            <BettingPlayer>{players[bets[bet].player].name}</BettingPlayer>
          </BetList>
        ))
      : null;

    const poster =
      film.poster ??
      `https://via.placeholder.com/342x513.png?text=${film.name}`;

    return (
      <Wrapper winner={nomination.won}>
        <Poster alt={film.name} src={poster} />
        <p>{nomination.nominee}</p>
        {bettingPlayers}
      </Wrapper>
    );
  }
);

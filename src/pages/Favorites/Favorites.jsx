import { useState } from 'react';
import { PageTitle } from 'src/components/pageTitle/PageTitle';
import { ContainerLimiter } from 'src/components/containerLimiter/ContainerLimiter.tsx';
import { ListHeader } from 'src/components/listHeader/ListHeader';
import { Button, EmptyMessage, GoToCatalog } from './Favorites.styled';
import { CardForFavoritesAndCart } from 'src/components/cardForFavoritesAndCart/CardForFavoritesAndCart';
import { toggleLocalStorage } from 'src/utils/toggleLocalStorage';
import sprite from '../../images/sprite.svg';

const Favorites = () => {
  let favoritesIds = [];

  if (localStorage.getItem('favorite')) {
    favoritesIds = JSON.parse(localStorage.getItem('favorite'));
  }

  let goods = [];

  if (localStorage.getItem('goods')) {
    goods = JSON.parse(localStorage.getItem('goods'));
  }

  let favoriteGoodsArray = favoritesIds.map((id) =>
    goods.find((el) => el.id_name === id),
  );

  const [favorites, setFavorites] = useState(favoriteGoodsArray);

  function clearFavorites() {
    localStorage.favorite = [];
    setFavorites([]);
  }

  function delFromFavorite(id) {
    const newArray = favoriteGoodsArray.filter((el) => el.id_name !== id);
    toggleLocalStorage(true, 'favorite', id);
    setFavorites(newArray);
  }

  return (
    <>
      <PageTitle>Список бажань</PageTitle>
      <ContainerLimiter paddingTopMob={'24px'} paddingTopDesc={'56px'}>
        <ListHeader />
        <CardForFavoritesAndCart
          favoriteGoods={favorites}
          onClickDelete={delFromFavorite}
        />
        {favorites.length > 0 ? (
          <Button type="button" onClick={() => clearFavorites()}>
            Очистити список бажань
          </Button>
        ) : (
          <EmptyMessage>
            <svg width={124} height={124}>
              <use href={`${sprite}#favorite`} />
            </svg>
            <h2>Список бажань пустий</h2>
            <GoToCatalog to={'/catalog'}>
              <svg width={14} height={9}>
                <use href={`${sprite}#arrow-right`} />
              </svg>
              повернутись до покупок
            </GoToCatalog>
          </EmptyMessage>
        )}
      </ContainerLimiter>
    </>
  );
};

export default Favorites;
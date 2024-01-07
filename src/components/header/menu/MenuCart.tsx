import { useState, useContext } from 'react';
import { CartContext } from '../../Layout';
import {
  Backdrop,
  MenuContainer,
  CloseButton,
  Card,
  Img,
  Price,
  Total,
} from './MenuCart.styled';
import { toggleCartInLocalStorage } from '../../../utils/toggleCartInLocalStorage';
import sprite from '../../../images/sprite.svg';
import { Link } from 'react-router-dom';

type Good = {
  images: [{ image: string }];
  name: string;
  price: number;
  length: number;
  id_name: string;
  quantity: number;
};

interface MenuCartProps {
  onClickHandle: (arg0: boolean) => void;
}

export const MenuCart = ({ onClickHandle }: MenuCartProps) => {
  const { setAmountInCart } = useContext(CartContext);

  let goodsInCart: { id: string; amount: number }[] = [];

  if (localStorage.getItem('cart')) {
    goodsInCart = JSON.parse(localStorage.getItem('cart') as string);
  }

  let goods: [] = [];

  if (localStorage.getItem('goods')) {
    goods = JSON.parse(localStorage.getItem('goods') as string);
  }

  const goodsInCartArray = goods.filter(
    (el: { id_name: string; quantity: number }) =>
      goodsInCart.some((item) => {
        if (el.id_name === item.id) {
          el.quantity = item.amount;
          return true;
        } else return false;
      }),
  );

  const [inCart, setInCart] = useState<Good[]>(
    goodsInCartArray.filter((el: { length: number }) => el.length !== 0),
  );

  function delFromCart(id: string) {
    const newArray = goodsInCartArray.filter(
      (el: { id_name: string }) => el.id_name !== id,
    );
    toggleCartInLocalStorage(true, id);
    setInCart(newArray);
  }

  function getTotalPrice() {
    return inCart.reduce(
      (total: number, el: { quantity: number; price: number }) =>
        el.price * (el?.quantity ? el.quantity : 1) + total,
      0,
    );
  }

  return (
    <>
      <Backdrop onClick={() => onClickHandle(false)}></Backdrop>
      <MenuContainer>
        <CloseButton onClick={() => onClickHandle(false)}>
          <svg width={24} height={24}>
            <use href={`${sprite}#close`} />
          </svg>
        </CloseButton>
        <ul>
          {inCart?.map((el: Good) => (
            <Card key={el.id_name}>
              <Img
                src={
                  import.meta.env.PROD
                    ? `/${el.images[0].image}`
                    : `http://localhost:8000/${el.images[0].image}`
                }
                width={127}
                height={158}
                alt={el.name}
                loading="lazy"
              />
              <div>
                <h4>Декоративна ваза з натурального дерева{el.name}</h4>
                <Price>Ціна: ₴ {el.price}</Price>
                <p>Кількість: {el.quantity}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setAmountInCart((amountInCart: number) => amountInCart - 1);
                  delFromCart(el.id_name);
                }}
              >
                <svg width={9} height={8}>
                  <use href={`${sprite}#del-x`} />
                </svg>
              </button>
            </Card>
          ))}
        </ul>

        <Total>
          <p>Вартість:</p>
          <p>₴ {getTotalPrice()}</p>
        </Total>

        <Link to={'/cart'} onClick={() => onClickHandle(false)}>
          переглянути кошик
        </Link>
        <Link to={'/payment'} onClick={() => onClickHandle(false)}>
          Купити
        </Link>
      </MenuContainer>
    </>
  );
};
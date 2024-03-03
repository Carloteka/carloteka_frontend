import {
  SearchBox,
  Form,
  Input,
  Backdrop,
  SearchResultDiv,
  GoodListResult,
  Button,
} from './SearchBar.styled';
import sprite from '../../../images/sprite.svg';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchCategories, fetchPopularGoods } from '../../../api/api';
import { Categories, Good } from '../../../../@types/custom';
import { Loader } from '../../Loader/Loader';

export const SearchBar = () => {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [searchedGoods, setSearchedGoods] = useState<Good[]>([]);
  const [searchedCategories, setSearchedCategories] = useState<Categories[]>(
    [],
  );
  const [goods, setGoods] = useState<Good[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const isFirstRender = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAllGoods() {
      try {
        setIsLoading(true);
        const data = await fetchPopularGoods();
        localStorage.setItem('goods', JSON.stringify(data));
        setGoods(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function getCategories() {
      try {
        setIsLoading(true);
        const data = await fetchCategories();
        localStorage.setItem('categories', JSON.stringify(data));
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      getAllGoods();
      getCategories();

      return;
    }

    if (query === '') {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function filtering(array: Good[] | Categories[]): any[] {
      const filteredArray = array.filter((el: Good | Categories) =>
        el.name.toUpperCase().includes(query.toUpperCase()),
      );
      return filteredArray.slice(0, 4);
    }

    setSearchedGoods(filtering(goods));
    setSearchedCategories(filtering(categories));
  }, [goods, categories, query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  const handleChangeInput = (value: string) => {
    setSearchParams({ query: value });
    setShowResult(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <SearchBox>
        <search>
          <Form
            onSubmit={handleSubmit}
            style={{
              boxShadow: query ? '1px 1px 7px 0 #c6b89e' : '',
              background: query ? '#fff' : '#F2F0EC',
            }}
          >
            <Input
              type={'search'}
              name="query"
              value={query}
              placeholder="Пошук товарів"
              onChange={(e) => handleChangeInput(e.target.value)}
            />
            <button
              type="submit"
              onClick={() => {
                return false;
              }}
              title="Search"
            >
              <svg width={16} height={16}>
                <use href={`${sprite}#search`} />
              </svg>
            </button>
          </Form>
        </search>
        {showResult && query && (
          <>
            <Backdrop onClick={() => setShowResult(false)}></Backdrop>
            <SearchResultDiv>
              {!(searchedGoods.length > 0) &&
              !(searchedCategories.length > 0) ? (
                <>
                  <p>нічого не знайдено</p>
                  <div>
                    <Button title="Show catalog" to={'/catalog'}>
                      ПОДИВИТИСЬ КАТАЛОГ
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <ul>
                    {searchedCategories.length > 0 && (
                      <li>
                        <h4>Категорії товарів</h4>
                        <ul>
                          {searchedCategories.map((el) => (
                            <li key={el?.id}>
                              <img
                                src={
                                  import.meta.env.PROD
                                    ? `http://carloteka.com/${el.image_set[0].image}`
                                    : `http://localhost:8000/${el.image_set[0].image}`
                                }
                                width={47}
                                height={56}
                                alt={el.name}
                              />
                              <Link
                                to={`/catalog?category__i=${el.id}`}
                                onClick={() => setShowResult(false)}
                              >
                                {el?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                    {searchedGoods.length > 0 && (
                      <GoodListResult>
                        <h4>Товари</h4>
                        <ul>
                          {searchedGoods.map((el) => (
                            <li key={el?.id}>
                              <img
                                src={
                                  import.meta.env.PROD
                                    ? `http://carloteka.com/${el.mini_image}`
                                    : `http://localhost:8000/${el.mini_image}`
                                }
                                width={40}
                                height={48}
                                alt={el.name}
                              />
                              <Link
                                to={`/${el.category.id}/${el.slug}/description`}
                                onClick={() => setShowResult(false)}
                              >
                                {el?.name}
                              </Link>
                              <span>₴ {el?.price}</span>
                            </li>
                          ))}
                        </ul>
                      </GoodListResult>
                    )}
                  </ul>
                  <div>
                    <Button
                      title="Show all results"
                      to={`/catalog?query=${query}`}
                      onClick={() => setShowResult(false)}
                      className="primaryBtn"
                    >
                      Всі результати
                    </Button>
                  </div>
                </>
              )}
            </SearchResultDiv>
          </>
        )}
      </SearchBox>
    </>
  );
};

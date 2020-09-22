import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o featured - filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }

    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          < MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Desenvolvido com fins de aprendizagem em React.js, por Helena Meyer - 2020 <br />
        Direitos de imagem para Netflix <br />
        Dados de API utilizados do site TMDB
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media1.giphy.com/media/cnzP4cmBsiOrccg20V/giphy.gif?cid=ecf05e47gluxe8lax5jewiyiy2nfu1a9a2vtcsinrhbcbves&rid=giphy.gif" alt="Loading" />
        </div>
      }


    </div>
  );
}
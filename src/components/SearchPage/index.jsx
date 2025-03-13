import React, { useState, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { searchResults } from "../../api/movieAPI";
import { SearchBanner } from "./SearchBanner";
import { Loading } from "../Utils/Loading";
import { useInView } from "react-intersection-observer";
import { searchUser } from "../../api/userAPI";
import { UserCard } from "./UserCard";
export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mediaPage, setMediaPage] = useState(1);
  const [userPage, setUserPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchType, setSearchType] = useState("media");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { ref, inView } = useInView({ threshold: 1 });
  const [page, setPage] = useState(1);

  const { ref: mediaRef, inView: mediaInView } = useInView({ threshold: 1 });
  const { ref: userRef, inView: userInView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      setUserResults([]);
      setPage(1);
      setHasMore(true);
    }
  }, [searchTerm]);

  const fetchResults = async () => {
    if (!searchTerm) return;
    setIsLoading(true);
    setError("");

    try {
      if (searchType === "media") {
        const { success, data, message } = await searchResults(searchTerm, { page });
        if (success) {
          setResults((prev) => (page === 1 ? data : [...prev, ...data]));
          setHasMore(data.length > 0);
        } else {
          setError(message);
        }
      } else {
        if (searchTerm.length < 2) return;
        const term = searchTerm.substring(1);
        const data = await searchUser(term);
        setUserResults(data.content);
        setHasMore(data.content.length > 0);
      }
    } catch {
      setError("Erro ao buscar resultados. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [searchTerm, page, searchType]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isLoading]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setResults([]);
    setUserResults([]);
    setSearchType(searchTerm.startsWith("@") ? "user" : "media");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#181818]">
      {/* Formulário de Busca */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-lg mx-auto w-[80%] md:w-full md:max-w-2xl absolute top-4 left-[15%] md:left-0 right-0 z-10"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            e.target.value.startsWith("@") ? setSearchType("user") : setSearchType("media");

            setSearchTerm(e.target.value);
          }}
          enterKeyHint="search"
          placeholder="Busque por filmes, séries ou digite @ para pesquisar um usuário"
          className="flex-grow border border-gray-600 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary60 bg-neutral10 text-neutral90 font-bold placeholder-neutral90 sm:w-full"
        />

        {searchTerm && (
          <>
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="ml-2 text-gray-500 hover:text-white transition duration-300"
            >
              <FiX size={25} className="text-primary80" />
            </button>
          </>
        )}
      </form>

      {/* Resultados */}
      {searchTerm && searchType === "media" && (
        <h3 className="relative text-3xl sm:text-3xl md:text-5xl text-white font-moonjelly mt-24 mb-4 flex items-center left-[4%] md:left-0 justify-center mx-auto text-center w-full">
          {isLoading ? "Buscando..." : `Resultados para "${searchTerm}"`}
        </h3>
      )}
      {searchTerm && searchType === "user" && (
        <h3 className="relative text-3xl sm:text-3xl md:text-5xl text-white font-moonjelly mt-24 mb-4 flex items-center left-[4%] md:left-0 justify-center mx-auto text-center w-full">
          {isLoading ? "Buscando usuario..." : `Resultados para @${searchTerm.substring(1)}`}
        </h3>
      )}

      {searchType === "user" && (
        <div className="w-[80%] md:w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-6 p-4 relative left-[8%] md:left-8 sm:mx-auto">
          {userResults.length > 0
            ? userResults.map((user) => (
                <div>
                  <UserCard
                    key={user.id}
                    user={user}
                    className={
                      "relative flex flex-col gap-2  w-full h-96 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:scale-125 font-poppins mx-auto ease-linear duration-300"
                    }
                  />
                </div>
              ))
            : !isLoading && (
                <p className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Nenhum usuário encontrado para "{searchTerm}".
                </p>
              )}
        </div>
      )}

      {searchType === "media" && (
        <div className="w-[80%] md:w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 mt-6 p-4 relative left-[8%] md:left-8 sm:mx-auto">
          {results.map(
            (item, index) =>
              item.backdrop_path &&
              !item.adult && (
                <div key={item.id} className="p-2" ref={index === results.length - 1 ? ref : null}>
                  <SearchBanner
                    image={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path}`}
                    title={item.title || item.name}
                    genre={item.genre_ids}
                    type={item.media_type}
                    id={item.id}
                    year={item.realesed_date || item.first_air_date || item.release_date}
                    className="relative w-full h-96 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:scale-125 shadow-stone-600 font-poppins mx-auto ease-linear duration-300"
                  />
                </div>
              )
          )}
        </div>
      )}

      {/* Empty search */}
      {!searchTerm && (
        <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-1/2 sm:w-3/4 w-11/12">
          <p className="mt-4 text-2xl md:text-xl text-neutral20 font-poppins text-center md:px-12 px-6">
            <span className="text-primary50 flex justify-center">Bem-vindo(a)!</span> Digite algo na barra de busca
            acima para encontrar <br /> filmes e séries ou usuários
          </p>
          <img src="/images/search.svg" alt="Search" className="w-[50%] md:w-[60%] mx-auto mb-12 md:max-w-[250px]" />
        </div>
      )}

      {/* Feedback */}
      {isLoading && searchType === "user" && (
        <div className="mt-20 w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-auto mx-auto">
          <Loading />
        </div>
      )}
      {/* Feedback */}
      {isLoading && searchType === "media" && (
        <div className="mt-20 absolute bottom-12 md:w-auto mx-auto">
          <Loading />
        </div>
      )}

      {error && results.length === 0 && <p className="mt-4 text-semanticError absolute top-20">{error}</p>}

      {/* Caso não haja nenhum resultado */}
      {results.length === 0 && !isLoading && searchTerm === "media" && (
        <p className="mt-6 text-white">Nenhum resultado encontrado para "{searchTerm}".</p>
      )}
    </div>
  );
};

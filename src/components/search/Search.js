import React, { useState, useEffect } from 'react';
import lunr from 'lunr';
import {  ContainedList, ContainedListItem, ExpandableSearch, Theme } from '@carbon/react'; // Assuming this is your component
import { useStaticQuery,graphql, Link } from 'gatsby';


const SearchComponent = () => {
    const data = useStaticQuery(graphql`
        query {
          allGames {
            nodes {
              id
              title
              slug
              category
              game_id
              saga
            }
          }
        }
      `);
    const [index, setIndex] = useState(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // Load the Lunr index
    useEffect(() => {
        fetch('/search-index.json')
            .then((response) => response.json())
            .then((data) => {
                setIndex(lunr.Index.load(data));
            });
    }, []);

    useEffect(() => {
        if (index && query !== '') {
            const searchResults = index.search(`*${query}*`).map(({ ref }) => {
                const _game = data.allGames.nodes.find(game => game.game_id === ref);
                return _game;
            });
            
            setResults(searchResults);

        } else {
            setResults([]);
        }
    }, [query, index, data.allGames.nodes]);

    return (
        <div
        //  style={{width:'20rem'}}
         >
            <ExpandableSearch renderIcon={false} placeholder='Search a game' labelText="" size="lg" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={() => { }} />

            <Theme theme="white">
                {results.length > 0 && (
                    <ContainedList size="sm" isInset={true} label="">
                        {results.map((result, index) => (
                            <Link className='gatsby-link' to={`/online/${result.slug}/`} key={index}><ContainedListItem>{result.title}</ContainedListItem></Link>
                        ))}
                    </ContainedList>
                )}
            </Theme>
        </div>
    );
};

export default SearchComponent;
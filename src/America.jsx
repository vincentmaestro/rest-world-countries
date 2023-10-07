import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const America = ({AmericanCountries, searchText}) => {
    const [america, setAmerica] = useState(null);
    const [search, setSearch] = useState(null);
    const [searching, setSearching] = useState(false);

    async function getAmerica() {
        const america = await AmericanCountries;
        setAmerica(america);
    }

    async function searchCountry(searchText) {
        setSearching(true);
        const countries = await AmericanCountries;
        const match = countries.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase().trim()));
        setSearch(match);
    }

    useEffect(() => {
        getAmerica();
    }, []);

    useEffect(() => {
       searchCountry(searchText);
    }, [searchText]);

    return (
        <ul className="country-list america flex flex-wrap gap-[50px] pl-14 pb-14 576:p-0">
            {!searching ?
                america && america.map((country, key) => (
                    <li key={key} className="country w-[210px] rounded-tl-[5px] rounded-tr-[5px] pb-[50px] overflow-hidden">
                        <Link to={`/details/${country.name.common}`}>
                            <div className="flag">
                                <img src={country.flags.svg} alt={country.flags.alt} className="w-[100%] h-[120px]" />
                            </div>
                            <div className="details pl-4">
                                <h2 className="name my-[10px] font-bold">{country.name.common}</h2>
                                <p className="population"><span className="font-semibold">Population: </span>{country.population}</p>
                                <p className="region"><span className="font-semibold">Region: </span> {country.region}</p>
                                <p className="capital"><span className="font-semibold">Capital: </span>{country.capital}</p>
                            </div>
                        </Link>
                    </li>
                )) :
                search && search.map((country, key) => (
                    <li key={key} className="country w-[210px] rounded-tl-[5px] rounded-tr-[5px] pb-[50px] overflow-hidden">
                        <Link to={`/details/${country.name.common}`}>
                            <div className="flag">
                                <img src={country.flags.svg} alt={country.flags.alt} className="w-[100%] h-[120px]" />
                            </div>
                            <div className="details pl-4">
                                <h2 className="name my-[10px] font-bold">{country.name.common}</h2>
                                <p className="population"><span className="font-semibold">Population: </span>{country.population}</p>
                                <p className="region"><span className="font-semibold">Region: </span> {country.region}</p>
                                <p className="capital"><span className="font-semibold">Capital: </span>{country.capital}</p>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}
 
export default America;
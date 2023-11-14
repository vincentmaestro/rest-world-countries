import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({countries}) {
    const [allCountries, setAllCountries] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [region, setregion] = useState('Filter by region');
    const regions = [ 'Filter by region', 'Africa', 'America', 'Asia', 'Europe', 'Oceania' ];
    const [showregions, setShowregions] = useState(false);

    async function getCountries () {
        if(region === 'Filter by region') {
            const data = await countries();
            setAllCountries(data);
        }
        else {
            const request = await fetch(`https://restcountries.com/v3.1/region/${region}`);
            const data = await request.json();
            setAllCountries(data);
        }
    }

    useEffect(() => {
        getCountries();
    }, [region]);

    return (
        <div className="appwrapper">
            <div className="filter-countries flex justify-between px-14 mb-[50px] 576:px-4 430:flex-col 430:gap-[30px]">
                <div className="left">
                    <i className="ri-search-line relative left-8 font-medium 430:top-8 430:left-3"></i>
                    <input type="text" name="search countries" className="py-[5px] pl-[50px] w-[300px] outline-none 430:pl-[40px]" placeholder="Search for a country..." value={searchText} onChange={e => {setSearchText(e.target.value);}} />
                </div>
                <div className="flex w-[180px] select-none border-2 border-gray-300 relative" onClick={() => setShowregions(!showregions)}>
                    <div className="flex items-center justify-between px-2 w-full">
                        <span className="font-semibold">{region}</span>
                        <i class="ri-arrow-drop-down-line text-lg font-semibold"></i>
                    </div>
                    {showregions &&
                        <ul className="absolute top-[40px] bg-slate-500 p-2 w-full">
                            {regions.map((region, key) => (
                                <li className="hover:text-slate-200 cursor-pointer" key={key} onClick={() => setregion(region)}>{region}</li>
                            ))}
                        </ul>
                    }
                </div>
            </div>
            {!allCountries && <p className="fixed top-[50%] left-[50%]" style={{transform:"translate(-50%, -50%)"}}>Loading...</p> }
            <ul className="country-list flex flex-wrap gap-[50px] pl-14 pb-14 576:p-0">
                {allCountries && allCountries.filter(country => {
                    if(!searchText.length) return country
                    if(country.name.common.toLowerCase().includes(searchText.toLowerCase())) return country
                }).map((country, index) => (
                <li key={index} className="country w-[210px] rounded-tl-[5px] rounded-tr-[5px] pb-[50px] overflow-hidden">
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
                ))}
            </ul>
        </div>
    );
}

export default Home

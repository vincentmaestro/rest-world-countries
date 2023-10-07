import { useState, useEffect } from "react";
import AllCountries from "./AllCountries";
import Africa from "./Africa";
import America from "./America";
import Asia from "./Asia";
import Europe from "./Europe";
import Oceania from "./Oceania";

function Home({countries}) {
    const [allCountries, setAllCountries] = useState(null);
    const [africa, setAfrica] = useState(null);
    const [america, setAmerica] = useState(null);
    const [asia, setAsia] = useState(null);
    const [europe, setEurope] = useState(null);
    const [oceania, setOceania] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [region, setRegion] = useState(sessionStorage.getItem('region'));
            
    //const [filterWorld, setFilterWorld] = useState(true);
    const [filterAfrica, setfilterAfrica] = useState(false);
    const [filterAmerica, setfilterAmerica] = useState(false);
    const [filterAsia, setfilterAsia] = useState(false);
    const [filterEurope, setfilterEurope] = useState(false);
    const [filterOceania, setfilterOceania] = useState(false);
    
    async function getCountries() {
        const data = await countries();
        // setAllCountries(data);
        setAfrica(data.filter(region => region.region == 'Africa'));
        setAmerica(data.filter(region => region.region == 'Americas'));
        setAsia(data.filter(region => region.region == 'Asia'));
        setEurope(data.filter(region => region.region == 'Europe'));
        setOceania(data.filter(region => region.region == 'Oceania'));
        
        if (region == null) setAllCountries(data);
        else if (region == 'allCountries') setAllCountries(data);
        else setAllCountries(null);
        region == 'Africa' ? setfilterAfrica(true) : setfilterAfrica(false);
        region == 'America' ? setfilterAmerica(true) : setfilterAmerica(false);
        region == 'Asia' ? setfilterAsia(true) : setfilterAsia(false);
        region == 'Europe' ? setfilterEurope(true) : setfilterEurope(false);
        region == 'Oceania' ? setfilterOceania(true) : setfilterOceania(false);
    }

    useEffect(() => {
        getCountries();
    }, [region]);

    return (
        <div className="appwrapper">
            <div className="filter-countries flex justify-between px-14 mb-[50px] 576:px-4 430:flex-col 430:gap-[30px]">
                <div className="left">
                    <i className="ri-search-line relative left-8 font-medium 430:top-8"></i><input type="text" name="search countries" className="py-[5px] pl-[50px] w-[300px] outline-none" placeholder="Search for a contry..." value={searchText} onChange={e => {setSearchText(e.target.value);}} />
                </div>
                <div className="right">
                    <select className="select-country outline-none p-[7px] rounded-[5px]" value={region} onChange={e => {sessionStorage.setItem('region', e.target.value); setRegion(sessionStorage.getItem('region'));}} >
                        <option value="allCountries">Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania/Australia</option>
                    </select>
                </div>
            </div>
            {allCountries && <AllCountries world = {allCountries} searchText = {searchText} /> }
            {filterAfrica && <Africa AfricanCountries = {africa} searchText = {searchText} /> }
            {filterAmerica && <America AmericanCountries = {america} searchText = {searchText} />}
            {filterAsia && <Asia AsianCountries = {asia} searchText = {searchText} />}
            {filterEurope && <Europe EuropeanCountries = {europe} searchText = {searchText} />}
            {filterOceania && <Oceania OceaniaCountries = {oceania} searchText = {searchText} />}
        </div>
    );
}

export default Home
